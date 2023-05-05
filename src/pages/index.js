import SearchBar from "../components/SearchBar";
import TxList from "../components/TxList";
import MetricsBar from "../components/MetricsBar";

export default function Index() {
    return (
    <div className="">
        <div className="mt-10 bg-[#FBFCFE]">
          <div className="bg-blue-800 -mx-[120px]">
              <div className="w-4/6">
                <div className="2xl:mx-[120px]">
                  <p className="text-[19.68px] text-white font-medium mb-2"> The Ethereum Blockchain Explorer </p>
                  <SearchBar 
                      autocomplete 
                      leftInputItem={true}
                      rightInputItem={true}
                      placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                  />
                </div>
              </div>
          </div>
          <div className="relative -mx-[120px] -z-50">
            <div className="bg-blue-800 w-full top-0 left-0 absolute h-[120px]">
            </div>
          </div>
          <div>
              <div className="bg-blue-800 -mx-[120px] h-[5rem]"> </div>
              <MetricsBar />
          </div>
          <div className="md:grid-cols-2 mt-5 grid grid-cols-1 gap-4">
            <div className="shadow-md">
              <TxList title="Latest Blocks" txType="BLOCK" />
            </div>
            <div className="shadow-md">
              <TxList title="Latest Transactions" txType="TX" />
            </div>
          </div>
          </div>
        </div>
    )
}
