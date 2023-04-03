import { useState, useEffect } from "react"
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { getTxList } from "../../services/ethereum";
import { getTimeDifferenceInSeconds } from "../../utils/time";
import { Utils } from "alchemy-sdk";
import { copy2clipboard } from "../../utils/clipboard";

// TODO: Find out how to get the TX 'method'
export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(25);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("hash", {
            header: () => <span> Txn Hash </span>,
            cell: (info) => <Link to={`/tx/${info.getValue()}`} className="text-[#1e40af] text-[0.9062rem] block w-[200px] truncate"> { info.getValue() } </Link>,
        }),
        columnHelper.accessor("method", {
            header: () => <span> Method </span>,
            cell: (info) => <Link to={`/tx/${info.getValue()}`} className="text-[#1e40af] text-[0.9062rem] block"> { info.getValue() } </Link>,
        }),
        columnHelper.accessor("block", {
            header: () => <span> Block </span>,
            cell: (info) => <Link to={`/block/${info.getValue()}`} className="text-[#1e40af] text-[0.9062rem] block"> { info.getValue() } </Link>
        }),
        columnHelper.accessor("age", {
            header: () => <span> Age </span>,
            cell: (info) => <span className="block"> { `${info.getValue()} secs ago` } </span>
        }),
        columnHelper.accessor("from", {
            header: () => <span> From </span>,
            cell: (info) => (
                <div className="flex items-center">
                    <Link to={`/address/${info.getValue()}`} className="text-[#1e40af] text-[0.9062rem] block w-[200px] truncate"> { info.getValue() } </Link>
                    <i className="fa-regular fa-clone fa-xs ml-3 text-slate-600" onClick={() => copy2clipboard(info.getValue())}></i>
                </div>
            )
        }),
        columnHelper.accessor("to", {
            header: () => <span> To </span>,
            cell: (info) => (
                <div className="flex items-center">
                    <Link to={`/address/${info.getValue()}`} className="text-[#1e40af] text-[0.9062rem] block w-[200px] truncate"> { info.getValue() } </Link>
                    <i className="fa-regular fa-clone fa-xs ml-3 text-slate-600" onClick={() => copy2clipboard(info.getValue())}></i>
                </div>
            ) 
        }),
        columnHelper.accessor("value", {
            header: () => <span> Value </span>,
            cell: (info) => <span className="text-[0.9062rem] block"> {`${info.getValue()} ETH`} </span>
        }),
        columnHelper.accessor("txnFee", {
            header: () => <span> Txn Fee </span>,
            cell: (info) => <span className="text-[0.875em] block"> { info.getValue() } </span>
        })
    ];

    // Fetch transactions from the service
    useEffect(() => {
        setLoading(true);
        setError(false);
       (async () => {
            const txs = await getTxList(rows);

            console.log(txs[0])

            if (!txs?.length) {
                setLoading(false);
                setError(true);
                return;
            }

            const parsedTxs = txs.map((tx) => {
                const { value } = tx;

                const value_ = Utils.formatUnits(value, "ether");

                return {
                    hash: tx.hash,
                    method: "NOP",
                    block: tx.blockNumber,
                    from: tx.from,
                    to: tx.to,
                    value: Number(value_).toFixed(7),
                    age: getTimeDifferenceInSeconds(new Date(tx.timestamp), new Date()),
                    ...(tx.maxFeePerGas && { txnFee: Utils.formatUnits(tx.maxFeePerGas, "gwei") }),
                }
            });

            setTransactions(parsedTxs);

            setLoading(false);
       })();
    }, [page, rows]);

    return (
        <div className="">
            <p className="font-semibold"> Transactions </p>
            <div className="mt-5 mb-10">
                <hr className="bg-[#e9ecef] w-full" />
            </div>
            <Table
                data={transactions}
                columns={columns}
                page={page}
                totalPages={100}
                loading={loading}
                error={error}
                onPageChange={(nPage) => {
                    setPage(nPage);
                }}
                onRowSelect={(nRow) => {
                    setRows(nRow);
                }}
            />
        </div>
    )
}