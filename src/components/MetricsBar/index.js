import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvgGasPrice, getBtcEthPrice, getCurrentEtherPrice, getLastSafeBlock, getMarketCap } from "../../services/ethereum";

export default function MetricsBar(props) {
    const [avgGasPriceUSD, setAvgGasPriceUSD] = useState(0);
    const [avgGasPriceWGEI, setAvgGasPriceGWEI] = useState(0);
    const [ethPriceUSD, setEthPriceUSD] = useState(0);
    const [marketCap, setMarketCap] = useState(0);
    const [priceChangeLast24H, setPriceChangeLast24H] = useState(0);
    const [lastSafeBlock, setLastSafeBlock] = useState(null);

    const navigate = useNavigate();

    // Get the average gas price
    useEffect(() => {
        (async () => {
            let avgGasPrice = await getAvgGasPrice();
            setAvgGasPriceGWEI(Math.floor(avgGasPrice));

            avgGasPrice = await getAvgGasPrice(true);
            setAvgGasPriceUSD(Math.floor(avgGasPrice));
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

            const btcEthPrice = await getBtcEthPrice();

            const formattedPrice = `${ethPriceUSD} @ ${btcEthPrice.toFixed(5)} BTC`;

            setEthPriceUSD(formattedPrice);
            setPriceChangeLast24H(priceChange.toFixed(2));
        })();
    }, []);

    // Get the market capitalization
    useEffect(() => {
        (async () => {
            let marketCap_ = await getMarketCap();

            setMarketCap(marketCap_);
            
            setLastSafeBlock(await getLastSafeBlock());
            
        })();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-4 xl:gap-0 rounded-lg border border-[#e9ecef] bg-white w-full p-5 shadow-md">
            <div className="flex items-center gap-3">
                <i className="fa-brands fa-ethereum fa-xl"></i>
                <div class="flex flex-col">
                    <p className="uppercase text-[12px]"> Ether Price </p>
                    { 
                        ethPriceUSD && priceChangeLast24H ? (
                            <p className="text-[15px]"> 
                                { ethPriceUSD }  
                                <span className={`text-[13.125px] ${priceChangeLast24H > 0 ? "text-[#00A186]" : "text-[#BF616A]"}`}> 
                                    {`${priceChangeLast24H > 0 ? ` (+${priceChangeLast24H})` : ` (-${priceChangeLast24H})`}`} 
                                </span> 
                            </p> 
                        ): null 
                    }
                </div>
            </div>
            <div className="flex items-center gap-3">
                <i className="fa-solid fa-globe fa-xl"></i>
                <div className="flex flex-col">
                    <p className="uppercase text-[12px]"> Market Cap </p>
                    <p className=""> {`$${marketCap}`} </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <i className="fa-solid fa-gas-pump fa-lg"></i>
                <div className="">
                    <p className="uppercase text-[12px]"> Med Gas Price </p>
                    <p className="text-[15px]"> { avgGasPriceWGEI } <span> Gwei </span> </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <i className="fa-solid fa-cube fa-lg"></i> 
                <div>
                    <p className="uppercase text-[12px]"> Last Safe Block </p>
                    <p className="text-[15px] cursor-pointer text-blue-800" onClick={() => {
                        lastSafeBlock && navigate(`/block/${lastSafeBlock}`)
                    }}> { lastSafeBlock } </p>
                </div>
            </div>
        </div>
    )
}