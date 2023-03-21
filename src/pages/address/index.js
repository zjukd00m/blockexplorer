import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAddressData } from "../../services/ethereum";

export default function Address() {
    const [ethBalance, setEthBalance] = useState(0);
    const [ethValue, setEthValue] = useState(0);
    const [firstTxnHash, setFirstTxnHash] = useState("");
    const [lastTxnHash, setLastTxnHash] = useState("");
    const [lastTxnTimestamp, setLastTxnTimestamp] = useState("");
    const [firstTxnTimestamp, setFirstTxnTimestamp] = useState("");
    const [txCount, setTxCount] = useState();
    const { userAddress } = useParams();

    useEffect(() => {
        if (!userAddress) return;

        (async () => {
            const addressData = await getAddressData(userAddress);

            if (!addressData) return;

            const { userBalance, firstTxn, lastTxn, tokenBalances, ethValueUSD, txCount } = addressData;

            console.log("Token balances");
            console.log(tokenBalances);

            setEthBalance(userBalance);
            setEthValue(ethValueUSD);

            setFirstTxnHash(firstTxn);
            setLastTxnHash(lastTxn);

            setFirstTxnTimestamp();
            setLastTxnTimestamp();

            setTxCount(txCount);
        })();
    }, [userAddress]);

    return (
        <div className="">
            <div className="">
                <p className="inline"> Address <span className=""> { userAddress } </span> </p>
                <i class="fa-regular fa-clone fa-xs ml-1 text-slate-400"></i>
            </div>
            <hr className="bg-[#e9ecef] w-full my-5" />
            <div className="grid grid-cols-2">
                <div className="">
                    <p className="font-semibold"> Overview </p>         
                    <div className="">
                        <p className="uppercase text-sm"> Eth balance </p>
                        <div className="">
                            <i class="fa-brands fa-ethereum fa-sm text-slate-400"></i>
                            <p className="inline"> { ethBalance } <span> ETH </span> </p>
                        </div>
                    </div>
                    <div className="">
                        <p className="uppercase text-sm"> Eth value </p>
                        <div className="">
                            <p className="inline"> { ethValue } <span> ( <i class="fa-solid fa-at fa-xs text-black"></i> { ethValue } / ETH ) </span> </p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <p className="font-semibold"> More Info </p>
                    <div className="">
                        <p className="uppercase text-sm"> Total Transaction </p>
                        <p className="inline text-sm"> { txCount } </p>
                    </div>
                    <div className="">
                        <p className="uppercase text-sm"> Last Txn Sent </p>
                        <div className="">
                            <Link to={`/tx/${lastTxnHash}`} className="inline text-sm"> { lastTxnHash } </Link>
                            <p className="inline ml-3 text-sm"> { lastTxnTimestamp } </p>
                        </div>
                    </div>
                    <div className="">
                        <p className="uppercase text-sm"> First Txn Sent </p>
                        <div className="">
                            <Link to={`/tx/${firstTxnHash}`} className="inline text-sm"> { firstTxnHash } </Link>
                            <p className="inline ml-3 text-sm"> { firstTxnTimestamp } </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}