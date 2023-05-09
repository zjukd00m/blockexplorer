import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

const Loader = () => (
  <div className="h-full w-full flex justify-center items-center z-50">
    <svg className="animate-spin h-10 w-10 text-blue-600" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm12-5.291a7.962 7.962 0 01-3.001 5.291l3 2.647A7.962 7.962 0 0120 12h-4zm-5.708 5.708A5.965 5.965 0 0112 18c-1.654 0-3.164-.678-4.243-1.768l-2.83 2.829A9.969 9.969 0 0012 22a9.969 9.969 0 007.071-2.929l-2.829-2.83z" />
    </svg>
  </div>
);


export default function Table({ 
    data, 
    columns, 
    page, 
    totalPages, 
    onPageChange, 
    rows, 
    onRowSelect,
    error,
    loading,
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
                <tbody className="divide-y divide-gray-200 relative">
                    {
                        loading ? (
                            <tr className="w-full">
                                <td colSpan={columns.length} className="">
                                    <div className="bg-white flex justify-center w-full h-[600px]">
                                        <Loader />
                                    </div>
                                </td>
                            </tr>
                        ) : (
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
                        )
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
                        onChange={(e) => onRowSelect(+e.target.value)}
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