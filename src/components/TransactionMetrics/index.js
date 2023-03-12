import { useEffect, useState } from "react"

export default function TransactionMetrics() {
    const [transactionsPast24H, setTransactionsPast24H] = useState([]);
    const [pendingTransacions1H, setPendingTransacions1H] = useState([]);
    const [txFee24H, setTxFee24H] = useState();
    const [avgTxFee24H, setAvgTxFee24H] = useState();

    useEffect(() => {

    }, []);

    return (
        <div className="grid grid-cols-4 items-center justify-between gap-4">
            <div className="flex flex-col bg-red-100 p-4 rounded-lg gap-1">
                <p className="uppercase text-[.75rem]"> Transactions (24H) </p>
                <p className="font-semibold"> { transactionsPast24H | "1,065,950 (2.72%)" } </p>
            </div>
            <div className="flex flex-col bg-red-100 p-4 rounded-lg gap-1">
                <p className="uppercase text-[.75rem]"> Pending Transactions (Last 1H) </p>
                <p className="font-semibold"> { pendingTransacions1H | "168,320 (Average)" } </p>
            </div>
            <div className="flex flex-col bg-red-100 p-4 rounded-lg gap-1">
                <p className="uppercase text-[.75rem]"> Network Transactions Fee (24H) </p>
                <p className="font-semibold"> { txFee24H | "666.52 ETH (37.79%)" } </p>
            </div>
            <div className="flex flex-col bg-red-100 p-4 rounded-lg gap-1">
                <p className="uppercase text-sm text-[.75rem]"> Avg Transaction Fee (24H) </p>
                <p className="font-semibold"> { avgTxFee24H | "5.28 USD (10.59%)" } </p>
            </div>
        </div>
    )
}