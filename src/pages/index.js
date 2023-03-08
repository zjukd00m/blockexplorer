import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TxList from "../components/TxList";
import MetricsBar from "../components/MetricsBar";

export default function Index() {


    return (
        <div className="mt-10 mx-[120px]">
            <div className="w-3/6">
                <p className="text-[19.68px] font-medium"> The Ethereum Blockchain Explorer </p>
                <SearchBar 
                    autocomplete 
                    leftInputItem={null}
                    rightInputItem={null}
                    placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                />
            </div>
            <div className="bg-[#FCFDFE]">
                <MetricsBar />
            </div>
            <div className="grid grid-cols-2 mt-4 gap-5">
                <TxList title="Latest Blocks" txType="BLOCK" />
                <TxList title="Latest Transactions" txType="TX" />
            </div>
        </div>
    )
}
