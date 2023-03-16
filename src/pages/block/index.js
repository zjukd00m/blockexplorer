import { Utils } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlock, getLastSafeBlock } from "../../services/ethereum";
import { getTimeDifference, getTimeUTCFormatted } from "../../utils/time";

export default function Block() {
    const [block, setBlock] = useState();
    const [lastBlock, setLastBlock] = useState();

    const { blockNumber } = useParams();

    const navigate = useNavigate();

    function onClick(direction) {
        setBlock(null);
        if (direction === "PREV") {
            if (block.number >= 0) {
                navigate(`/block/${block.number - 1}`);
            }
            return;
        } else {
            if (block.number < lastBlock) {
                navigate(`/block/${block.number + 1}`);
            }
            return;
        }
    }

    useEffect(() => {
        (async () => {
            const lastBlockNumber = await getLastSafeBlock();
            
            if (!lastBlockNumber) return;

            setLastBlock(lastBlockNumber);
        })();
    }, []);
    
    useEffect(() => {
        if (!blockNumber?.length) return;
        (async () => {
            const block = await getBlock(blockNumber);

            if (!block) return;

            block.baseFeePerGas = `${Utils.formatUnits(block.baseFeePerGas, "ether")} ETH (${Utils.formatUnits(block.baseFeePerGas, "gwei")} Gwei)`;
            
            block.gasLimit = Utils.formatUnits(block.gasLimit, "wei");

            block.gasUsed = Utils.formatUnits(block.gasUsed, "wei");

            block.timestamp = `${getTimeDifference(new Date(block.timestamp), new Date())} (${getTimeUTCFormatted(block.timestamp)})`;

            console.log(block._difficulty)

            block._difficulty = Utils.formatUnits(block._difficulty, "wei");

            console.log(block._difficulty)

            if (block.extraData) {
                block.extraData = Utils.toUtf8String(block.extraData);
            }

            setBlock(block);
        })();
    }, [blockNumber]);

    return (
        <div className="">
            <div className="flex gap-1">
                <p className=""> Block </p>
                <p className="text-gray-500"> #{ block?.number }  </p>
            </div>
            <hr className="bg-[#e9ecef] w-full" />
            <div className="flex flex-col bg-white p-3 border border-slate-200 rounded-md my-10">
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Block Height: </p>
                    </div>
                    <div className="flex gap-1">
                        <p clasName="text-[0.9062rem]"> { block?.number } </p>
                        <div className="rounded-md bg-gray-200 hover:opacity-80" onClick={() => onClick("PREV")}>
                            <i className="fa-solid fa-chevron-left fa-xs p-2"></i>
                        </div>
                        <div className="rounded-md bg-gray-200 hover:opacity-80" onClick={() => onClick("NEXT")}>
                            <i className="fa-solid fa-chevron-right fa-xs p-2"></i>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Status: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> Finalized </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Timestamp: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.timestamp } </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Proposed On: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> Block proposed on slot <span className="text-blue-900"> 6013122, </span> epoch <span className="text-blue-900"> 187910 </span> </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Transactions: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> {block?.transactions?.length || 0 } transactions</p>
                    </div>
                </div>
                <hr className="bg-[#e9ecef] w-full" />
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Fee Recipient: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.miner } </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Block Reward: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> 0.038960103745855092 ETH (0 + 0.466421072756348234 - 0.427460969010493142) </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Total Difficulty: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?._difficulty } </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Size: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> 182,771 bytes </p>
                    </div>
                </div>
                <hr className="bg-[#e9ecef] w-full" />
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Gas Used: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.gasUsed } </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Gas Limit: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.gasLimit } </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Base Fee Per Gas: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.baseFeePerGas } </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Extra Data: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.extraData } </p>
                    </div>
                </div>
                <hr className="bg-[#e9ecef] w-full" />
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Hash: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.hash } </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Parent Hash: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.parentHash } </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> StateRoot: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.hash } </p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <p className="text-[0.9062rem] text-gray-500"> Nonce: </p>
                    </div>
                    <div className="flex">
                        <p className="text-[0.9062rem]"> { block?.nonce } </p>
                    </div>
                </div>
            </div>
        </div>
    )
}