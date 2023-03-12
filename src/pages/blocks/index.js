import { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/Table";
import { getBlocksWithData } from "../../services/ethereum";
import BlockMetrics from "../../components/BlockMetrics";

export default function Blocks() {
    const [blocks, setBlocks] = useState([]);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("number"),
        columnHelper.accessor("timestamp", {
            header: () => <span> Age </span>
        }),
        columnHelper.accessor("transactions", {
            header: () => <span> Txn </span>
        }),
        columnHelper.accessor("to", {
            header: () => <span> Fee Recipient </span>
        }),
        columnHelper.accessor("gas", {
            header: () => <span> Gas Used </span>
        }),
        columnHelper.accessor("gas-limi", {
            header: () => <span> Gas Limit </span>
        }),
        columnHelper.accessor("base-fee", {
            header: () => <span> Base Fee </span>
        }),
        columnHelper.accessor("reward", {
            header: () => <span> Reward </span>
        }),
        columnHelper.accessor("burnt-fees", {
            header: () => <span> Burn Fees (ETH) </span>
        }),
    ];

    useEffect(() => {
        (async () => {
            console.log("Fetching the blocks...");
            await getBlocksWithData(10, 10000);
        })();
    }, []);

    return (
        <div>
            <p className="font-semibold"> Blocks </p> 
            <div className="mt-5 mb-10">
                <hr className="bg-[#e9ecef] w-full" />
            </div>
            <BlockMetrics />
            {/* <Table data={blocks} columns={columns} /> */}
        </div>
    )
}