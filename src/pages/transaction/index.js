import { Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCurrentEtherPrice, getTx } from "../../services/ethereum";

export default function Transaction() {
    const [tx, setTx] = useState();
    const { txHash } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        console.log("The transaction hash");
        console.log(txHash);
        (async () => {
            const txData = await getTx(txHash);
            console.log("This is the tx data");
            console.log(txData);
            if (!txData) return;

            const etherPrice = await getCurrentEtherPrice();

            if (!etherPrice) return;

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
                }
            }

            setTx(tx_);
        })();
    }, [txHash]);

    return (
        <div className="border border-slate-200 rounded-lg">
            <div className="flex flex-col p-5">
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem]"> Transaction Hash: </p>
                    <div className="">
                        <p className="inline text-[0.9062rem]"> { tx?.hash } </p>
                        <i class="fa-regular fa-clone fa-xs ml-3"></i>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem]"> Status: </p>
                    <div className="">
                        <p className="inline text-[0.9062rem]"> { tx?.status } </p>
                        <i class="fa-regular fa-clone fa-xs ml-3"></i>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem]"> Block: </p>
                    <div className="flex items-center">
                        <Link to={`/block/${tx?.blockNumber}`} className="inline text-[0.9062rem] text-[#1e40af]"> { tx?.blockNumber } </Link>
                        <div className="bg-gray-100 border border-gray-200 rounded-lg p-1 mx-2">
                            <p className="text-[0.75rem] font-semibold"> { tx?.confirmations } Block Confirmations </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem]"> Timestamp: </p>
                    <div className="">
                        <i class="fa-regular fa-clock fa-xs ml-3"></i>
                        <p className="inline text-[0.9062rem]"> { tx?.timestamp } </p>
                    </div>
                </div>
                <hr className="bg-[#e9ecef] w-full" />
                <div className="flex items-center justify-between p-1 my-2">
                    <p className="text-[0.9062rem]"> From: </p>
                    <div className="">
                        <Link to={`/address/${tx?.from}`} className="inline text-[0.9062rem] text-[#1e40af]"> { tx?.from } </Link>
                        <i class="fa-regular fa-clone fa-xs ml-3"></i>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem]"> To: </p>
                    <div className="">
                        <Link to={`/address/${tx?.to}`} className="inline text-[0.9062rem] text-[#1e40af]"> { tx?.to } </Link>
                        <i class="fa-regular fa-clone fa-xs ml-3"></i>
                    </div>
                </div>
                <hr className="bg-[#e9ecef] w-full my-2" />
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem]"> Value: </p>
                    <div className="">
                        <i class="fa-brands fa-ethereum fa-xs mx-2 text-slate-600"></i>
                        <p className="inline text-[0.75rem]">  { tx?.value?.eth } <span className="bg-gray-100 p-1 border border-gray-200 rounded-lg text-black font-semibold"> $ { tx?.value?.usd } </span> </p>
                    </div>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem]"> Transaction Fee: </p>
                    <p className="inline text-[0.9062rem]"> { tx?.txFee } </p>
                </div>
                <div className="flex items-center justify-between p-1">
                    <p className="text-[0.9062rem]"> Gas Price: </p>
                    <p className="inline text-[0.9062rem]"> { tx?.gasPrice?.gwei } Gwei <span className=""> ({ tx?.gasPrice?.eth } ETH)  </span> </p>
                </div>
            </div>
        </div>
    )
}