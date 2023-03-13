import { useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react"
import { DocumentTextIcon, CubeIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { getBlocksWithData, getTxWithData } from "../../services/ethereum";
import { getTimeDifferenceInSeconds } from "../../utils/time";

export default function TxList(props) {
    const { txType, title } = props;
    const [itemList, setItemList] = useState([]);
    const navigate = useNavigate();

    // Fetch the latest blocks and update the list every 30 seconds
    useEffect(() => {
        if (txType === "BLOCK") {
            (async () => {
                const latestBlocks = await getBlocksWithData(6);

                if (!latestBlocks) return;

                setItemList(latestBlocks);
            })();
        } else {
            (async () => {
                const latestTransactions = await getTxWithData(6);

                if (!latestTransactions?.length) return;

                setItemList(latestTransactions);
            })();
        }
    }, []);

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
            // setItemList([...itemList, item]);;
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
        <div className="p-4 rounded-lg border border-[#e9ecef]">
            <p className="text-[15px] px-2 py-4"> { title } </p>
            <hr className="bg-[#e9ecef] w-full" />
            <div className="flex flex-col gap-2 bg-white text-[14.5px]">
                {
                    itemList?.map((item, index) => {
                        const { hash, number, miner, from, transactions, to, timestamp, value } = item;

                        const timeDiff = getTimeDifferenceInSeconds(new Date(timestamp), new Date());

                        const minedAt = `${timeDiff} seg`;
                        
                        return (
                            <div key={number || hash}>
                                <div className="flex items-center justify-between px-2 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-[0.75rem] bg-[#f8f8f4] rounded-md">
                                        {
                                            txType === "BLOCK" ? (
                                                <CubeIcon height="25" width="25" className="text-gray-500" />
                                            ) : (
                                                <DocumentTextIcon height="25" width="25" className="text-gray-500" />
                                            )
                                        }
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[#1e40af]" onClick={() => {
                                                if (number) {
                                                    navigate(`/blocks/${number}`);
                                                } else {
                                                    navigate(`/tx/${hash}`);
                                                }
                                            }}> { number || hash?.slice(0, 20) } </p> 
                                            <p className="text-[12.68px]"> { minedAt } </p> 
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                    {
                                        txType === "BLOCK" ? (
                                            <>
                                                <p className="truncate"> Fee Recipient <span className="text-[#1e40af]"> {miner} </span> </p>
                                                <p className="text-[#1e40af]"> { transactions?.length } txns <span className="text-black"> in 12 secs </span> </p>
                                            </>
                                        ) : (
                                        <>
                                            <p className=""> From <span className="text-[#1e40af]" onClick={() => navigate(`/address/${from}`)}> {from} </span> </p>
                                            <p className=""> To <span className="text-[#1e40af]" onClick={() => navigate(`/address/${to}`)}> {to} </span> </p>
                                        </> 
                                        )
                                    } 
                                    </div>
                                    <div className="rounded-md p-1 px-2 border border-slate-300">
                                        <p className="text-[10.87px] font-semibold"> { `${value} Eth` } </p>
                                    </div>
                                </div>
                                {
                                    index < itemList.length - 1  ? <hr className="px-4 bg-[#e9ecef] w-full" /> : null
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="bg-[#F8F9FA] h-[50px] flex justify-center" onClick={() => {
                if (txType === "BLOCK") {
                    navigate("/blocks");
                } else {
                    navigate("/txs");
                }
            }}>
                <div className="hover:text-[#1e40af] flex items-center gap-2">
                    <p className="uppercase text-[12px] text-center"> View all { txType === "BLOCK" ? "blocks" : "transactions" } </p>
                    <ArrowRightIcon height="12" width="12" />
                </div>
            </div>
        </div>
    )
}