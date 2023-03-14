import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";


export default function Table({ 
    data, 
    columns, 
    page, 
    totalPages, 
    onPageChange, 
    rows, 
    onRowSelect 
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="border border-gray-200 rounded-md p-4 overflow-x-auto">
            <table className="w-full min-w-full">
                <thead className="border-b">
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => (
                                        <th key={header.id} className="text-[0.7851rem] text-left">
                                            {
                                                header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className=" hover:bg-[#f9f9f9]">
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="py-2.5 text-[0.9062rem] text-left whitespace-wrap">
                                            { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* Paginator */}
            <div className="flex items-center justify-between text-[0.7851rem] mt-6">
                <div className="">
                    <p className="inline mr-2"> Show rows: </p>
                    <select 
                        value={rows} 
                        className="bg-[#f8f9fa] border border-gray-200 rounded-md px-2 py-2 focus:border-none"
                        onChange={(e) => onRowSelect(e.target.value)}
                    >
                        <option> 10 </option>
                        <option> 25 </option>
                        <option> 50 </option>
                        <option> 100 </option>
                    </select>
                </div>
                <div className="flex items-center gap-1">
                    <button 
                        className="bg-[#f8f9fa] p-1 rounded-md border border-gray-200" 
                        onClick={() => onPageChange(1)}
                    >
                        First
                    </button>
                    <button 
                        className="bg-[#f8f9fa] p-1 rounded-md border border-gray-200"
                        onClick={() => {
                            if (page <= 1) return;
                            onPageChange(page - 1);
                        }}
                    >
                        <i className="fa-solid fa-chevron-left fa-xs p-1"></i>
                    </button>
                    <div className="bg-[#f8f9fa] p-1 rounded-md border border-gray-200">
                        <p className=""> Page { page } of { totalPages } </p>
                    </div>
                    <button 
                        className="bg-[#f8f9fa] p-1 rounded-md border border-gray-200"
                        onClick={() => {
                            if (page >= totalPages) return;
                            onPageChange(page + 1);
                        }}
                    >
                        <i className="fa-solid fa-chevron-right fa-xs p-1"></i>
                    </button>
                    <button 
                        className="bg-[#f8f9fa] p-1 rounded-md border border-gray-200"
                        onClick={() => onPageChange(totalPages)}
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    )
}