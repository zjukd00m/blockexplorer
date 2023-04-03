import { Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useParams, Link } from "react-router-dom";
import { getCurrentEtherPrice, getTx } from "../../services/ethereum";
import { copy2clipboard } from "../../utils/clipboard";
// import * as ethers from "ethers";

export default function Transaction() {
    const [tx, setTx] = useState();
    const { txHash } = useParams();
    const [txDataFormat, setTxDataFormat] = useState("DEFAULT");
    const [txData, setTxData] = useState("");
    const [rawTxData, setRawTxData] = useState("");


    useEffect(() => {
        if (!txDataFormat && !rawTxData) return;

        let txDataFormatted = "";

        if (txDataFormat === "ORIGINAL") {
            txDataFormatted = rawTxData;
        } else if (txDataFormat === "UTF8") {
            const hexData = rawTxData?.slice(2);
            if (!hexData) return;
            txDataFormatted = Buffer.from(hexData, "hex").toString();
        } else { // DEFAULT
           // TODO: How to decode the raw data in such a way to visualize the contract function call (if it's an interaction with a contract) 
        }
        setTxData(txDataFormatted);

        return () => {
            // setTxData(null);
            // setRawTxData(null);
            // setTxDataFormat(null);
        }
    }, [txDataFormat, rawTxData]);


    useEffect(() => {
        (async () => {
            const txData = await getTx(txHash);
            if (!txData) return;

            const etherPrice = await getCurrentEtherPrice();

            if (!etherPrice) return;

            console.log(txData.data)

            console.log(Utils.hexValue(txData.data))

            // const hexData = txData.data.slice(2);

            const etherPriceBase = Utils.formatUnits(txData.value, "ether");
            const etherPriceUSD = etherPrice.ethPriceUSD * etherPriceBase;

            const tx_ = {
                ...txData,
                gasPrice: {
                    gwei: Utils.formatUnits(txData.gasPrice, "gwei"),
                    eth: Utils.formatUnits(txData.gasPrice, "ether"),
                },
                value: {
                    eth: etherPriceBase,
                    usd: etherPriceUSD,
                },
                maxFeePerGas: txData.maxFeePerGas ? Utils.formatUnits(txData.maxFeePerGas, "gwei") : null,
                maxPriorityFeePerGas: txData.maxPriorityFeePerGas ? Utils.formatUnits(txData.maxPriorityFeePerGas, "gwei") : null,
                statusString: txData.receipt.status === 0 ? "Failure" : txData.receipt.status === 1 ? "Success" : "Pending",
            }

            setTx(tx_);
            setRawTxData(tx_.data);
        })();
    }, [txHash]);

    return (
        <div className="border border-slate-200 rounded-lg">
            <div className="flex flex-col p-5">
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Transaction Hash: </p>
                    <div className="">
                        <p className="inline text-[0.9062rem]"> { tx?.hash } </p>
                        <i className="fa-regular fa-clone fa-xs ml-3 text-slate-600" onClick={() => copy2clipboard(tx?.hash)}></i>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Status: </p>
                    <div className={`border rounded-md py-[0.1rem] px-[0.5rem] ${tx?.statusString === "Success" ? "bg-[#E5F5F3] border-green-300" : "bg-[#FBEAEC] border-red-300"}`}>
                        <p className={`inline text-[0.75em] font-semibold ${tx?.statusString === "Success" ? "text-[#25A689]" : "text-[#DC4C86]"}`}> { tx?.statusString } </p>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Block: </p>
                    <div className="flex items-center">
                        <Link to={`/block/${tx?.blockNumber}`} className="inline text-[0.9062rem] text-[#1e40af]"> { tx?.blockNumber } </Link>
                        <div className="bg-gray-100 border border-gray-200 rounded-lg p-1 mx-2">
                            <p className="text-[0.75rem] font-semibold"> { tx?.confirmations } Block Confirmations </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Timestamp: </p>
                    <div className="">
                        <i className="fa-regular fa-clock fa-xs ml-3 text-slate-600"></i>
                        <p className="inline text-[0.9062rem]"> { tx?.timestamp } </p>
                    </div>
                </div>
                <hr className="bg-[#e9ecef] w-full" />
                <div className="flex items-center justify-between p-1 my-2">
                    <p className="text-[0.9062rem] text-[#6d757d]"> From: </p>
                    <div className="">
                        <Link to={`/address/${tx?.from}`} className="inline text-[0.9062rem] text-[#1e40af]"> { tx?.from } </Link>
                        <i className="fa-regular fa-clone fa-xs ml-3 text-slate-600" onClick={() => copy2clipboard(tx?.from)}></i>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> To: </p>
                    <div className="">
                        <Link to={`/address/${tx?.to}`} className="inline text-[0.9062rem] text-[#1e40af]"> { tx?.to } </Link>
                        <i className="fa-regular fa-clone fa-xs ml-3 text-slate-600" onClick={() => copy2clipboard(tx?.to)}></i>
                    </div>
                </div>
                <hr className="bg-[#e9ecef] w-full my-2" />
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Value: </p>
                    <div className="">
                        <i className="fa-brands fa-ethereum fa-xs mx-2 text-slate-600"></i>
                        <p className="inline text-[0.75rem]">  { tx?.value?.eth } ETH <span className="bg-gray-100 p-1 border border-gray-200 rounded-lg text-black font-semibold ml-1"> $ { tx?.value?.usd?.toFixed(2) } </span> </p>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Transaction Fee: </p>
                    <p className="inline text-[0.9062rem]"> { tx?.txFee } </p>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Gas Price: </p>
                    <p className="inline text-[0.9062rem]"> { tx?.gasPrice?.gwei } Gwei <span className=""> ({ tx?.gasPrice?.eth } ETH)  </span> </p>
                </div>
                <hr className="bg-[#e9ecef] w-full my-2" />
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Gas Fees: </p>
                    <div className="flex gap-3 items-center">
                        <p className="text-[0.9062rem] text-[#6d757d]"> Base: <span className="text-black"> { tx?.gasPrice?.gwei } Gwei </span> </p>
                        |
                        <p className="text-[0.9062rem] text-[#6d757d]"> Max: <span className="text-black"> { typeof tx?.maxFeePerGas === "string" ? `${tx.maxFeePerGas} Gwei` : "None" } </span> </p>
                        |
                        <p className="text-[0.9062rem] text-[#6d757d]"> Max Priority: <span className="text-black"> { typeof tx?.maxPriorityFeePerGas === "string" ? `${tx.maxPriorityFeePerGas} Gwei` : "None" } </span> </p>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Other Attributes: </p>
                    <div className="flex gap-3 items-center">
                        <div className="border border-[#E9EBED] rounded-md p-[0.3rem] bg-[#f7f7f8]">
                            <p className="text-xs text-[#6d757d]"> Txn Type: <span className="font-semibold text-black"> { tx?.type === 2 ? `${tx.type} (EIP-1559)` : tx?.type } </span> </p>
                        </div>
                        <div className="border border-[#E9EBED] rounded-md p-[0.3rem] bg-[#f7f7f8]">
                            <p className="text-xs text-[#6d757d]"> Nonce: <span className="font-semibold text-black"> { tx?.nonce } </span> </p>
                        </div>
                        <div className="border border-[#E9EBED] rounded-md p-[0.3rem] bg-[#f7f7f8]">
                            <p className="text-xs text-[#6d757d]"> Position In Block: <span className="font-semibold text-black"> { tx?.transactionIndex } </span> </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem] text-[#6d757d]"> Input Data </p>
                    <div className="flex flex-col w-[75%]">
                        <textarea 
                            disabled={true} 
                            value={txData} 
                            rows={7}
                            className="text-[14.49px] text-sm w-full p-2 border border-slate-200 rounded-lg text-slate-600 resize-none" 
                        >
                        </textarea>
                        <select className="w-fit p-1 my-3 text-sm rounded-md text-slate-600" onChange={(e) => setTxDataFormat(e.target.value)}>
                            <option className="text-sm" value={"DEFAULT"}> Default View </option>
                            <option className="text-sm" value={"UTF8"}> UTF-8 </option>
                            <option className="text-sm" value={"ORIGINAL"}> Original </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}