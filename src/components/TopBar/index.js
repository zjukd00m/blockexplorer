import { CodeBracketSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react"
import { getCurrentEtherPrice } from "../../services/ethereum";

export default function TopBar() {
    const [ethPrice, setEthPrice] = useState();
    const [gasPrice, setGasPrice] = useState();

    useEffect(() => {
        (async () => {
            const ethPriceUSD = await getCurrentEtherPrice();
            console.log("The current price of ETH/USD: ", ethPriceUSD);
        })();
    }, []);

    return (
        <div className="flex items-center w-full py-4">
            <div className="flex-grow">
                <div className="flex gap-5">
                    <p className="text-[12.56px]"> ETH Price: <span className="text-blue-400"> { ethPrice || "$1,559.15" } </span> </p>
                    <p className="text-[12.56px]"> Gas: <span className="text-blue-400"> { gasPrice || "32 Gwei" } </span> </p>
                </div>
            </div>
            <div className="flex gap-1">
                <CodeBracketSquareIcon height="22" width="22" />
                <CodeBracketSquareIcon height="22" width="22" />
            </div>
        </div>
    )
}