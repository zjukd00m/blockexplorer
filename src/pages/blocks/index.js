import { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/Table";
import { getBlocksWithData } from "../../services/ethereum";
import { getTimeDifference } from "../../utils/time";
import { Link } from "react-router-dom";
import { Utils } from "alchemy-sdk";


export default function Blocks() {
    const [blocks, setBlocks] = useState([]);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [lastBlock, setLastBlock] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("number", {
            header: () => <span> Block </span>,
            cell: (info) => <Link to={`/block/${info.getValue()}`} className="text-[#1e40af]"> { info.getValue() } </Link>
        }),
        columnHelper.accessor("age", {
            header: () => <span> Age </span>,
            cell: (info) => <span className="truncate"> { `${info.getValue()} secs ago` } </span>
        }),
        columnHelper.accessor("transactions", {
            header: () => <span> Txn </span>
        }),
        columnHelper.accessor("miner", {
            header: () => <span> Fee Recipient </span>,
            cell: (info) => <Link to={`/address/${info.getValue()}`} className="text-[#1e40af] truncate"> { info.getValue() } </Link>,
        
        }),
        columnHelper.accessor("gasUsed", {
            header: () => <span> Gas Used </span>
        }),
        columnHelper.accessor("gasLimit", {
            header: () => <span> Gas Limit </span>
        }),
        columnHelper.accessor("baseFee", {
            header: () => <span> Base Fee </span>
        }),
        // columnHelper.accessor("reward", {
        //     header: () => <span> Reward </span>
        // }),
        // columnHelper.accessor("burntFees", {
        //     header: () => <span> Burn Fees (ETH) </span>
        // }),
    ];

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", page);

        const newSearch = searchParams.toString();
        const newUrl = window.location.pathname + "?" + newSearch;
        
        window.history.pushState({}, "", newUrl);

    }, [page]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        (async () => {
            let parsedBlocks = [];

            const blocks_ = await getBlocksWithData(rows, lastBlock?.number ? lastBlock?.number - 1 : null);

            if (!blocks_?.length) {
                setError(true);
                setLoading(false);
                return;
            }

            parsedBlocks = blocks_?.map((block_) => {
                const age = getTimeDifference(new Date(block_.timestamp * 1000), new Date());
                const transactions = block_.transactions.length;
                const gasUsed = Utils.formatUnits(block_.gasUsed, "wei");
                const gasLimit = Utils.formatUnits(block_.gasUsed, "wei");
                const baseFee = Number(Utils.formatUnits(block_.baseFeePerGas, "gwei")).toFixed(2);
                
                return {
                    number: block_.number,
                    age,
                    transactions,
                    miner: block_.miner,
                    gasUsed,
                    gasLimit,
                    baseFee,
                }
            });

            setBlocks(parsedBlocks);
            setLastBlock(parsedBlocks[parsedBlocks.length - 1]);

            setLoading(false);
        })();
    }, [page, rows]);

    return (
        <div>
            <p className="font-semibold"> Blocks </p> 
            <div className="mt-5 mb-10">
                <hr className="bg-[#e9ecef] w-full" />
            </div>
            {
                <Table 
                    data={blocks} 
                    columns={columns} 
                    page={page} 
                    totalPages={100} 
                    loading={loading}
                    onPageChange={(nPage) => setPage(nPage)}
                    onRowSelect={(nRows) => setRows(nRows)}
                />
            }
        </div>
    )
}