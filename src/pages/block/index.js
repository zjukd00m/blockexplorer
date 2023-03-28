import {  Utils } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLastSafeBlock, getRawBlockByNumberOrHash } from "../../services/ethereum";
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

    // Set the last block in order to avoid going forward
    useEffect(() => {
        (async () => {
            const lastBlockNumber = await getLastSafeBlock();
            
            if (!lastBlockNumber) return;

            setLastBlock(lastBlockNumber);
        })();
    }, []);
    
    // Get the block by number or by hash
    useEffect(() => {
        if (!blockNumber?.length) return;

        let getBy = "";

        if (blockNumber.match(/^\d+$/g)) getBy = "number";
        else if (blockNumber.startsWith("0x")) getBy = "hash";

        (async () => {

            const result = await getRawBlockByNumberOrHash(blockNumber, getBy);

            if (!result) return;

            const block_ = result.result;

            block_.baseFeePerGas = `${Utils.formatUnits(block_.baseFeePerGas, "ether")} ETH (${Utils.formatUnits(block_.baseFeePerGas, "gwei")} Gwei)`;
            
            block_.gasLimit = Utils.formatUnits(block_.gasLimit, "wei");

            block_.gasUsed = Utils.formatUnits(block_.gasUsed, "wei");

            block_.timestamp = Number(Utils.formatUnits(block_.timestamp, "wei"));

            const utcStringTimestamp = getTimeUTCFormatted(block_.timestamp);

            block_.timestamp = `${getTimeDifference(new Date(Date(block_.timestamp)), new Date())} (${utcStringTimestamp})`;

            block_._difficulty = Utils.formatUnits(block_.totalDifficulty, "wei");

            block_.size = Utils.formatUnits(block_.size, "wei")

            if (block_.extraData) {
                const decodedExtraData = Utils.toUtf8String(block_.extraData);
                block_.extraData = decodedExtraData + ` (Hex: ${block_.extraData})`;
            }

            setBlock(block_);
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
                        <p className="text-[0.9062rem]"> { block?.number } </p>
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
                        <p className="text-[0.9062rem]"> ... </p>
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
                        <p className="text-[0.9062rem]"> { block?.size } bytes </p>
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
                        <Link to={`/block/${block?.parentHash}`} className="text-[0.9062rem] text-[#1e40af]"> { block?.parentHash } </Link>
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