import { useState } from "react";
import { searchEthereum } from "../../services/ethereum";
import { useNavigate } from "react-router-dom";


export default function SearchBar(props) {
    const { rightInputItem, placeholder } = props;
    const [searchQ, setSearchQ] = useState("");
    const [searchItem, setSearchItem] = useState([]);
    
    const navigate = useNavigate();

    // When the search term is submited
    async function onSubmit() {
        if (!searchQ?.length) {
            setSearchItem([]);
            return;
        }

        let res = null;

        // Search by block (number or hash)
        res = await searchEthereum(searchQ, "BLOCK"); 

        if (res) {
            setSearchItem([{...res, type: "Block" }]);
            return;
        }

        // Search by transaction
        res = await searchEthereum(searchQ, "TX");

        if (res) {
            setSearchItem([{...res, type: "Transaction" }]);
            return;
        }

        // Resolve the domain
        res = await searchEthereum(searchQ, "RESOLVE_DOMAIN");

        if (res) {
            setSearchItem([{address: res, type: "Address"}])
            return;
        }

        setSearchItem([]);
    }

    return (
        <div className="w-full bg-white rounded-md p-1 relative">
            <div className="flex items-center gap-2 w-full">
                <input 
                    className={`w-full px-2 py-1 box-border rounded-md outline-slate-300`} 
                    placeholder={placeholder} 
                    onChange={(e) => setSearchQ(e.target.value)}
                />
                {
                    rightInputItem ? (
                        <div className="bg-blue-900 p-1 rounded-md text-white">
                            <i className="fa-solid fa-magnifying-glass p-1 hover:opacity-70" onClick={onSubmit}></i>
                        </div>
                    ) : null
                }
            </div>
            <div className={`absolute bg-white w-full p-2 left-0 border border-gray-400 ${searchItem?.length ? "" : "hidden"}`}>
                {
                    searchItem?.map((item, key) => {
                      return (
                        <div className="flex flex-row items-center justify-between mx-10 relative" key={key} 
                        >
                            <div className="border border-gray-500 bg-red-300 rounded-md absolute -left-10 top-0" onClick={() => setSearchItem([])}>
                               <i className="fa-solid fa-xmark p-1 hover:opacity-80"></i> 
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm"> Type: <span className="text-sm"> { item.type } </span> </p>
                                <p className="text-sm"> Address: <span className="text-sm"> { item.hash || item.address } </span> </p>
                            </div>
                            <button 
                                className="flex items-center gap-2 bg-[#111B36] px-8 py-1.5 uppercase text-white text-xs rounded-md shadow-lg border border-gray-200 hover:shadow-md"
                                onClick={() => {
                                    if (item.type === "Block") {
                                        navigate(`/block/${item.number}`);
                                    } else if (item.type === "Transaction") {
                                        navigate(`/tx/${item.hash}`);
                                    } else if (item.type === "Address") {
                                        navigate(`/address/${item.address}`);
                                    } else {
                                        alert("Not implemented :'(");
                                    }
                                }}
                            >
                                Go
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                      )  
                    })
                }
            </div>
        </div>
    )
}