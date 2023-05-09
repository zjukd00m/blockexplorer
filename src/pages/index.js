import SearchBar from "../components/SearchBar";
import TxList from "../components/TxList";
import MetricsBar from "../components/MetricsBar";

export default function Index() {
    return (
    <div className="">
        <div className="mt-10">
          <div className="bg-blue-800">
              <div className="w-4/6">
                <p className="text-[19.68px] font-medium mb-2 z-30 text-white"> The Ethereum Blockchain Explorer </p>
                <SearchBar 
                    autocomplete 
                    leftInputItem={true}
                    rightInputItem={true}
                    placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                />
              </div>
          </div>
          <div>
              <div className="bg-blue-800 h-[5rem]"> </div>
              <MetricsBar />
          </div>
          <div className="md:grid-cols-2 mt-5 grid grid-cols-1 gap-4 border-box">
            <div className="shadow-md border-box">
              <TxList title="Latest Blocks" txType="BLOCK" />
            </div>
            <div className="shadow-md border-box">
              <TxList title="Latest Transactions" txType="TX" />
            </div>
          </div>
          </div>
        </div>
    )
}
