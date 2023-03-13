import { CodeBracketSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react"
import { getAvgGasPrice, getBtcEthPrice, getCurrentEtherPrice } from "../../services/ethereum";

export default function TopBar() {
    const [ethPrice, setEthPrice] = useState(0);
    const [gasPrice, setGasPrice] = useState(0);
    const [ethPriceUSD, setEthPriceUSD] = useState(0);
    const [priceChangeLast24H, setPriceChangeLast24H] = useState(0);

    useEffect(() => {
        (async () => {
            const avgGasPrice = await getAvgGasPrice();
            setGasPrice(`${Math.floor(avgGasPrice)} Gwei`);
        })();
    }, []);

    // Get ethereum information (USD price and price change over the last 24h)
    useEffect(() => {
        (async () => {
            // Get the current ethereum price in USD and the price change
            let { ethPriceUSD, priceChange } = await getCurrentEtherPrice();
            ethPriceUSD = String(ethPriceUSD)

            // Pad the decimals to have 2 numbers
            const ethPriceUSDDecimals = ethPriceUSD[ethPriceUSD.length - 1].padEnd(2, "0");

            // Format the price
            ethPriceUSD = ethPriceUSD.replace(/\.\d+/g, `.${ethPriceUSDDecimals}`);
            ethPriceUSD = `${ethPriceUSD[0]},${ethPriceUSD.slice(1)}`;

            setEthPriceUSD(` $${ethPriceUSD}`);
            setPriceChangeLast24H(priceChange.toFixed(2));
        })();
    }, []);

    return (
        <div className="flex items-center w-full py-4">
            <div className="flex-grow">
                <div className="flex gap-5">
                    <p className="text-[12.56px]"> ETH Price: 
                        <span className="text-[12.5625px] text-[#1e40af]"> 
                            { ethPriceUSD }  
                            <span className={`text-[13.125px] ${priceChangeLast24H > 0 ? "text-[#00A186]" : "text-[#BF616A]"}`}> 
                                {`${priceChangeLast24H > 0 ? ` (+${priceChangeLast24H})` : ` (-${priceChangeLast24H})`}`} 
                            </span> 
                        </span> 
                    </p>
                    <p className="text-[12.5625px]"> Gas: <span className="text-[12.5625px] text-[#1e40af]"> { gasPrice } </span> </p>
                </div>
            </div>
            <div className="flex gap-1">
                <CodeBracketSquareIcon height="22" width="22" />
                <CodeBracketSquareIcon height="22" width="22" />
            </div>
        </div>
    )
}