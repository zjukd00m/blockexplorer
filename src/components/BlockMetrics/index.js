import { useState } from "react"

export default function BlockMetrics() {
    const [networkUsage, setNetworkUsage] = useState("48.8%");
    const [lastSafeBlock, setLastSafeBlock] = useState(16791016);
    const [avgGasPrice, setAvgGasPrice] = useState("37.320061309 Gwei");
    const [burntFees, setBurntFees] = useState("2,977,050.50 ETH")

    return (
        <div className="grid grid-cols-4 items-center justify-between gap-4">
            <div className="flex flex-col bg-red-100 p-4 rounded-lg gap-1">
                <p className="uppercase text-[.75rem]"> Network Utilization (24H) </p>
                <p className="font-semibold"> { networkUsage } </p>
            </div>
            <div className="flex flex-col bg-red-100 p-4 rounded-lg gap-1">
                <p className="uppercase text-[.75rem]"> Last Safe Block </p>
                <p className="font-semibold"> { lastSafeBlock } </p>
            </div>
            <div className="flex flex-col bg-red-100 p-4 rounded-lg gap-1">
                <p className="uppercase text-[.75rem]"> Average Gas Price (24H) </p>
                <p className="font-semibold"> { avgGasPrice } </p>
            </div>
            <div className="flex flex-col bg-red-100 p-4 rounded-lg gap-1">
                <p className="uppercase text-[.75rem]"> Burn Fees </p>
                <p className="font-semibold"> { burntFees } </p>
            </div>
        </div>
    )
}
