import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserTokens from "../../components/UserTokens";
import { getAddressData } from "../../services/ethereum";
import { copy2clipboard } from "../../utils/clipboard";

export default function Address() {
    const [ethBalance, setEthBalance] = useState(0);
    const [ethValue, setEthValue] = useState(0);
    const [txCount, setTxCount] = useState();
    const [tokenBalances, setTokenBalances] = useState([]);
    const { userAddress } = useParams();

    useEffect(() => {
        if (!userAddress) return;

        (async () => {
            const addressData = await getAddressData(userAddress);

            if (!addressData) return;

            const { 
                userBalance, 
                tokenBalances: userTokenBalances, 
                ethValueUSD, 
                txCount 
            } = addressData;

            setEthBalance(userBalance);
            setEthValue(ethValueUSD);

            setTxCount(txCount);

            setTokenBalances(userTokenBalances);
        })();
    }, [userAddress]);

    return (
        <div className="">
            <div className="">
                <p className="inline text-md"> Address <span className="text-sm ml-3"> { userAddress } </span> </p>
                <i className="fa-regular fa-clone fa-xs ml-2 text-slate-500" onClick={() => copy2clipboard(userAddress)}></i>
            </div>
            <hr className="bg-[#e9ecef] w-full my-5" />
            <div className="">
                <div className="flex justify-between">
                    <div className="">
                        <p className="uppercase text-[12px] text-gray-500"> Eth balance </p>
                        <div className="">
                            <i class="fa-brands fa-ethereum fa-sm text-slate-400"></i>
                            <p className="inline text-[0.9062rem]"> { ethBalance } <span> ETH </span> </p>
                        </div>
                    </div>
                    <div className="">
                        <p className="uppercase text-[12px] text-gray-500"> Eth value </p>
                        <div className="">
                            <p className="inline text-[0.9062rem]"> { ethValue } <span className="text-[0.875rem]"> ( <i class="fa-solid fa-at fa-xs text-black"></i> { ethValue } / ETH ) </span> </p>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <p className="uppercase text-[12px] text-gray-500"> Total Transactions </p>
                            <p className="inline text-[0.9062rem]"> { txCount } </p>
                        </div>
                    </div>
                </div>
                {
                    tokenBalances?.tokenBalances?.length ? (
                        <div className="mt-10">
                            <p className="uppercase text-xs text-left my-3"> Token Holdings </p>
                            <UserTokens tokens={tokenBalances} />
                        </div>
                    ) : (
                        <div className="mt-10">
                            <p className="uppercase text-sm text-left my-3"> This address has no tokens </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}