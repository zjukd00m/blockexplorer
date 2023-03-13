import { useEffect, useState } from "react";
import { getAvgGasPrice, getBtcEthPrice, getCurrentEtherPrice, getMarketCap, getTotalTransactions } from "../../services/ethereum";

export default function MetricsBar(props) {
    const [avgGasPriceUSD, setAvgGasPriceUSD] = useState(0);
    const [avgGasPriceWGEI, setAvgGasPriceGWEI] = useState(0);
    const [ethPriceUSD, setEthPriceUSD] = useState(0);
    const [marketCap, setMarketCap] = useState(0);
    const [priceChangeLast24H, setPriceChangeLast24H] = useState(0);

    // Get the average gas price
    useEffect(() => {
        (async () => {
            let avgGasPrice = await getAvgGasPrice();
            setAvgGasPriceGWEI(Math.floor(avgGasPrice));

            avgGasPrice = await getAvgGasPrice(true);
            setAvgGasPriceUSD(Math.floor(avgGasPrice));

            console.log("Avg gas price in usd: ", avgGasPrice)
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
            
        })();
    }, []);

    return (
        <div className="grid grid-cols-3 rounded-md bg-slate-200 w-full p-5">
            <div className="flex flex-col p-3 justify-between box-border bg-white">
                <div className="">
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
                <hr className="px-4 w-full" /> 
                <div className="">
                    <p className="uppercase text-[12px]"> Market Cap </p>
                    <p className=""> {`$${marketCap}`} </p>
                </div>
            </div>
            <div className="flex flex-col box-border bg-white">  
                <div className="flex p-3 box-border justify-between">
                    <div className="">
                        <p className="uppercase text-[12px]"> Transactions </p>
                        <p className="text-[15px]"> 1,895.50 M (13.1 TPS) </p>
                    </div>
                    <div className="">
                        <p className="uppercase text-[12px]"> Med Gas Price </p>
                        <p className="text-[15px]"> { avgGasPriceWGEI } <span> Gwei </span> </p>
                    </div>
                </div>
                <hr className="px-4 w-full" /> 
                <div className="flex p-3 box-border justify-between bg-white">
                    <div className="">
                        <p className="uppercase text-[12px]"> Last Finalized Block </p>
                        <p className="text-[15px]"> 1,895.50 M (13.1 TPS) </p>
                    </div>
                    <div className="">
                        <p className="uppercase text-[12px]"> Last Safe Block </p>
                        <p className="text-[15px]"> { avgGasPriceWGEI } </p>
                    </div>
                </div>
            </div>
            <div className="p-3 text-[12px] bg-white">  
                <p className="font-sm uppercase"> Transaction history in 14 days </p>
                <p> Chart goes here ... </p>
            </div>
        </div>
    )
}