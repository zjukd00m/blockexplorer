import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";


export default function Table({ data, columns }) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table className="">
            <thead className="">
                {
                    table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="">
                            {
                                headerGroup.headers.map((header) => (
                                    <th key={header.id} className="">
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
            <tbody className="">
                {
                    table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="">
                            {
                                row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="">
                                        { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}