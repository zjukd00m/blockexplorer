import { useEffect, useState } from "react";
import { searchEthereum } from "../../services/ethereum";

export default function SearchBar(props) {
    const { autocomplete, leftInputItem, rightInputItem, placeholder } = props;
    const [searchQ, setSearchQ] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [searchItem, setSearchItem] = useState(null);

    // Search in the API as the search query changes if autocomplete is on
    useEffect(() => {
        if (!searchQ?.length) return;

        (async () => {
            await onSubmit(searchQ);
        })();
    }, [searchQ]);

    // When an option in the autocomplete list is selected
    async function onSelect(itemHash) {
        console.log("This shit was selected: ", itemHash);
    }

    console.log("The search item")
    console.log(searchItem)

    // When the search term is submited
    async function onSubmit() {
        if (!searchQ?.length) return;

        let res = null;

        // Search by block (number or hash)
        res = await searchEthereum(searchQ, "BLOCK"); 

        if (res) {
            setSearchItem(res);
            return;
        }

        // Search by transaction
        res = await searchEthereum(searchQ, "TX");

        if (res) {
            setSearchItem(res);
            return;
        }

        // Search by token
        res = await searchEthereum(searchQ, "TOKEN");

        if (res) {
            setSearchItem(res);
            return;
        }

        // Search by domanin name
        res = await searchEthereum(searchQ, "DOMAIN_NAME");

        if (res) {
            setSearchItem(res);
            return;
        }

        setSearchItem(null);
    }

    return (
        <div className="w-full">
            <div>
                {
                    leftInputItem ? (
                        { leftInputItem }
                    ) : null
                }
                <input 
                    className="w-full px-2 py-1 box-border" 
                    placeholder={placeholder} 
                    onChange={(e) => setSearchQ(e.target.value)}
                />
                {
                    rightInputItem ? (
                        { rightInputItem }
                    ) : null
                }
            </div>
            <div>
                {
                    suggestions?.map((item) => {
                      return (
                        <div>
                            <p> { item.hash } </p>
                        </div>
                      )  
                    })
                }
            </div>
        </div>
    )
}