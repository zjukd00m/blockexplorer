import { useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react"
import { DocumentTextIcon, CubeIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { getBlocksWithData, getTxWithData } from "../../services/ethereum";
import { getTimeDifferenceInSeconds } from "../../utils/time";

export default function TxList(props) {
    const { txType, title } = props;
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(true);
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
        <div className={"p-4 rounded-lg border border-[#e9ecef] bg-white"}>
            <p className="text-[15px] px-2 py-4"> { title } </p>
            <hr className="bg-[#e9ecef] w-full" />
            {
                loading ? (
                    <div className="w-full">
                        <h4> ...Loading </h4>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 bg-white text-[14.5px]">
                        {
                            itemList?.map((item, index) => {
                                const { hash, number, miner, from, transactions, to, timestamp, value, originalMiner } = item;

                                const timeDiff = getTimeDifferenceInSeconds(new Date(timestamp), new Date());

                                const minedAt = `${timeDiff} secs ago`;
                                
                                return (
                                    <div key={number || hash}>
                                        <div className="flex items-start justify-between px-2 py-4">
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
                                                    }}> { number || hash?.slice(0, 10) } </p> 
                                                    <p className="text-[12.68px]"> { minedAt } </p> 
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-1/3">
                                            {
                                                txType === "BLOCK" ? (
                                                    <>
                                                        <p className="truncate"> Fee Recipient <span className="text-[#1e40af] cursor-pointer" onClick={() => navigate(`/address/${originalMiner}`)}> {miner} </span> </p>
                                                        <p className="text-[#1e40af]"> { transactions?.length } txns </p>
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
                                                {
                                                    txType === "BLOCK" ? (
                                                        null
                                                    ) : (
                                                        <p className="text-[10.87px] font-semibold"> { `${value?.slice(0, 6) || "0.0"} Eth` } </p>
                                                    )
                                                }
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