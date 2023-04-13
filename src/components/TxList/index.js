import { useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react"
import { DocumentTextIcon, CubeIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { getBlocksWithData, getTxWithData } from "../../services/ethereum";
import { getTimeDifferenceInSeconds } from "../../utils/time";

export default function TxList(props) {
    const { txType, title } = props;
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch the latest blocks and update the list every 30 seconds
    useEffect(() => {
        setLoading(true);
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
        setLoading(false);
    }, []);


    return (
        <div className="p-4 rounded-lg border border-[#e9ecef]">
            <p className="text-[15px] px-2 py-4"> { title } </p>
            <hr className="bg-[#e9ecef] w-full" />
            {
                loading ? (
                    <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                ) : (
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
                                                    <p className="text-[#1e40af] cursor-pointer" onClick={() => {
                                                        if (number) {
                                                            navigate(`/block/${number}`);
                                                        } else {
                                                            navigate(`/tx/${hash}`);
                                                        }
                                                    }}> { number || hash.slice(0, 20) } </p> 
                                                    <p className="text-[12.68px]"> { minedAt } </p> 
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-1/3">
                                            {
                                                txType === "BLOCK" ? (
                                                    <>
                                                        <p className="truncate"> Fee Recipient <span className="text-[#1e40af] cursor-pointer"> {miner} </span> </p>
                                                        <p className="text-[#1e40af]"> { transactions?.length } txns <span className="text-black"> in 12 secs </span> </p>
                                                    </>
                                                ) : (
                                                <>
                                                    <p className="truncate"> From <span className="text-[#1e40af] cursor-pointer" onClick={() => navigate(`/address/${from}`)}> {from} </span> </p>
                                                    <p className="truncate"> To <span className="text-[#1e40af] cursor-pointer" onClick={() => navigate(`/address/${to}`)}> {to} </span> </p>
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
                )
            }
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