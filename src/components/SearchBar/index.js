import { useEffect, useState } from "react";
import { searchEthereum } from "../../services/ethereum";
import { useNavigate } from "react-router-dom";

function SearchFiltersDropdown({ styles }) {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState("All Filters");

    const searchFilters = [
        "All Filters",
        "Addresses",
        "Tokens",
        "Name Tags",
        "Labels",
        "Websites",
    ];

    return (
        <div className={`${styles} rounded-md block w-[170px] relative`}>
            <div className="flex justify-between border border-gray-600 p-1.5 items-center gap-4 w-full" onClick={() => setIsOpen(!isOpen)}>
                <p className="text-sm"> { filter } </p>
                <i className="fa-solid fa-chevron-down fa-xs"></i>
            </div>
            {
                isOpen ? (
                    <div className="top-[2rem] z-10 border border-gray-600 absolute bg-white w-full">
                        {
                            searchFilters.map((filter_, key) => (
                                <p key={key} className="text-[0.75rem] hover:bg-blue-400 hover:text-white p-1" onClick={() => {
                                    setFilter(filter_);
                                    setIsOpen(false);
                                }}> { filter_ } </p>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default function SearchBar(props) {
    const { leftInputItem, rightInputItem, placeholder } = props;
    const [searchQ, setSearchQ] = useState("");
    const [searchItem, setSearchItem] = useState([]);
    
    const navigate = useNavigate();

    // Search in the API as the search query changes if autocomplete is on
    useEffect(() => {
        (async () => {
            await onSubmit(searchQ);
        })();
    }, [searchQ]);

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

        // Search by token
        res = await searchEthereum(searchQ, "TOKEN");

        if (res) {
            setSearchItem([{...res, type: "Token" }]);
            return;
        }

        // Search by domanin name
        res = await searchEthereum(searchQ, "DOMAIN_NAME");

        if (res) {
            setSearchItem([{...res, type: "Domain Name"}]);
            return;
        }

        setSearchItem([]);
    }

    return (
        <div className="w-full bg-white rounded-md p-1 relative">
            <div className="flex items-center gap-2">
                {
                    leftInputItem ? (
                       <SearchFiltersDropdown styles={"hover:shadow-lg"} /> 
                    ) : null
                }
                <input 
                    className={`w-full px-2 py-1 box-border rounded-md active:shadow-lg`} 
                    placeholder={placeholder} 
                    onChange={(e) => setSearchQ(e.target.value)}
                />
                {
                    rightInputItem ? (
                        <div className="bg-blue-800 p-1 rounded-md text-white">
                            <i className="fa-solid fa-magnifying-glass p-1 hover:opacity-70"></i>
                        </div>
                    ) : null
                }
            </div>
            <div className={`absolute bg-gray-100 w-full p-2 left-0 border border-gray-400 ${searchItem?.length ? "" : "hidden"}`}>
                {
                    searchItem?.map((item, key) => {
                      return (
                        <div className="" key={key} onClick={() => {
                            if (item.type === "Block") {
                                navigate(`/block/${item.number}`);
                            } else if (item.type === "Transaction") {
                                navigate(`/tx/${item.hash}`);
                            } else {
                                alert("Not implemented :'(");
                            }
                        }}>
                            <p className="font-xs"> Type: <span> { item.type } </span> </p>
                            <p className="font-xs"> Address: <span> { item.hash } </span> </p>
                        </div>
                      )  
                    })
                }
            </div>
        </div>
    )
}