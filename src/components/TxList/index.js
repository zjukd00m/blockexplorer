import { useEffect, useState } from "react"
import { AlchemySubscription } from "alchemy-sdk";
import alchemy from "../../utils/alchemyClient";

export default function TxList(props) {
    const { txType, title } = props;
    const [itemList, setItemList] = useState([]);

    if (txType !== "BLOCK" && txType !== "TX") {
        throw new Error("Invalid txType value");
    }

    useEffect(() => {
        // Listen for new blocks to be mined
        if (txType === "BLOCK") {
            alchemy.ws.on("block", async (blockNumber) => {
                // Search for the block
                const block = await alchemy.core.getBlock(blockNumber);

                if (!block) return;

                console.log("A block was mined");
                addListItem(block);
            });
        } 
        // Listen for mined transactions
        else {
            alchemy.ws.on({
                method: AlchemySubscription.MINED_TRANSACTIONS,
                includeRemoved: true,
                hashesOnly: false,
            }, async (tx) => {
                console.log("A transaction was mined");
                console.log(tx);
            });
        }

        
        return () => {
            alchemy.ws.removeAllListeners();
        }
    }, [itemList]);

    function shiftListRight(list) {
        if (list?.length === undefined || list?.length === null) return null;
        if (list.length <= 1) return list;

        let x = null;

        // At least two elements in the list at this point
        for (let i=0; i <= list.length - 2; i++) {
            // The current item will be for the first loop the first list element
            const currentItem = !x ? list[i] : x;  

            // Store the value of the next element before it's replaced by the current one
            x = list[i + 1];

            // The next list element is the current one
            list[i + 1] = currentItem;

            // If it's the first loop, set the first item as 0 (will be replaced)
            if (i === 0) {
                list[i] = 0;
            }

        }

        return list;
    }

    function addListItem(item) {
        if (itemList.length >= 6) {
            removeListItem();
        } else {
            // If the item is less than 6, just push the element at the tail
            console.log("Adding an element... ", itemList.length)
            // setItemList([...itemList, item]);
            setItemList((prev) => [...prev, item]);
            return;
        }

        console.log("Will add an item")

        // Shift the list to the right
        const newList = shiftListRight([...itemList]);

        console.log("Shifted list")
        console.log(newList)

        // Insert the element at the first index
        newList[0] = item;

        console.log("After the item is added at the head")
        console.log(newList)

        setItemList(newList);
    }

    // Remove the first element (since it's the first one to be added)
    function removeListItem() {
        if (itemList.length === 0) return;

        console.log("Will remove an item")

        // Get a new list where the first element is not present
        const newList = [...itemList].slice(1);
        
        setItemList(newList);
    }

    return (
        <div className="">
            <p className="text-lg"> { title } </p>
            <div>
                {
                    itemList?.map((item) => {
                        const { hash, number } = item;
                        
                        return (
                            <div className="" key={ number || hash }>
                                <p className=""> { number || hash } </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}