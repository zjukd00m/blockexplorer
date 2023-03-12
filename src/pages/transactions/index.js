import { useState, useEffect } from "react"
import { createColumnHelper } from "@tanstack/react-table";
import TransactionMetrics from "../../components/TransactionMetrics";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);

    const columnHelper = createColumnHelper();

    const columns = [

    ];

    // Fetch transactions from the service
    useEffect(() => {
       (async () => {
        
       })();
    }, []);

    return (
        <div className="">
            <p className="font-semibold"> Transactions </p>
            <div className="mt-5 mb-10">
                <hr className="bg-[#e9ecef] w-full" />
            </div>
            <TransactionMetrics />
        </div>
    )
}