import { useState, useEffect } from "react"
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { getTxList } from "../../services/ethereum";
import { getTimeDifferenceInSeconds } from "../../utils/time";
import { Utils } from "alchemy-sdk";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(25);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("hash", {
            header: () => <span> Txn Hash </span>,
            cell: (info) => <Link to={`/tx/${info.getValue()}`} className="text-[#1e40af] text-[0.9062rem] flex"> { info.getValue() } </Link>,
            maxSize: 50,
            size: 50,
            minSize: 50,
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
            cell: (info) => <Link to={`/address/${info.getValue()}`} className="text-[#1e40af] text-[0.9062rem] block"> { info.getValue() } </Link>,
        }),
        columnHelper.accessor("to", {
            header: () => <span> To </span>,
            cell: (info) => <Link to={`/address/${info.getValue()}`} className="text-[#1e40af] text-[0.9062rem] block"> { info.getValue() } </Link>,
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
       (async () => {
            const txs = await getTxList(rows);

            if (!txs?.length) return;

            const parsedTxs = txs.map((tx) => {
                const { timestamp, value } = tx;

                const age = getTimeDifferenceInSeconds(new Date(timestamp), new Date());

                const value_ = Utils.formatUnits(value, "ether");

                return {
                    hash: tx.hash,
                    method: "NOP",
                    block: tx.blockNumber,
                    age,
                    from: tx.from,
                    to: tx.to,
                    value: Number(value_).toFixed(7),
                    txnFee: "0.001",
                }
            });

            console.log("TXs (" + rows + ")");
            console.log(parsedTxs);

            setTransactions(parsedTxs);
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