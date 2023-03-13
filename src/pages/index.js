import SearchBar from "../components/SearchBar";
import TxList from "../components/TxList";
import MetricsBar from "../components/MetricsBar";


export default function Index() {
    return (
        <div className="mt-10 bg-[#FBFCFE]">
            <div className="bg-[#1c3351]">
                <div className="w-3/6">
                    <p className="text-[19.68px] text-white font-medium mb-2"> The Ethereum Blockchain Explorer </p>
                    <SearchBar 
                        autocomplete 
                        leftInputItem={true}
                        rightInputItem={true}
                        placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                    />
                </div>
            </div>
            <div>
                <div className=" mt-[5rem]">
                <MetricsBar />
            </div>
            <div className="grid grid-cols-2 mt-4 gap-5">
                <TxList title="Latest Blocks" txType="BLOCK" />
                <TxList title="Latest Transactions" txType="TX" />
            </div>
            </div>
        </div>
    )
}
