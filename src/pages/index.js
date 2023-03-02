import SearchBar from "../components/SearchBar"
import TxList from "../components/TxList"

export default function Index() {
    return (
        <div className="">
            <SearchBar 
                autocomplete 
                leftInputItem={null}
                rightInputItem={null}
                placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
            />
            <div className="grid grid-rows-2">
                <TxList title="Latest Blocks" txType="BLOCK" />
            </div>
        </div>
    )
}
