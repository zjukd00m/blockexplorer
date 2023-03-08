import { useEffect, useState } from "react";
import { getAvgGasPrice, getCurrentEtherPrice, getTotalTransactions } from "../../services/ethereum";

export default function MetricsBar(props) {
    const [avgGasPriceUSD, setAvgGasPriceUSD] = useState();
    const [avgGasPriceWGEI, setAvgGasPriceGWEI] = useState();
    const [ethPriceUSD, setEthPriceUSD] = useState();


    // Get the average gas price
    useEffect(() => {
        (async () => {
            let avgGasPrice = await getAvgGasPrice();
            setAvgGasPriceGWEI(avgGasPrice);
        })();
    }, []);
    
    // Get ethereum information
    useEffect(() => {
        (async () => {
            let ethPriceUSD = await getCurrentEtherPrice();
            ethPriceUSD = String(ethPriceUSD);

            const formattedPrice = `${ethPriceUSD[0]},${ethPriceUSD.slice(1)}`;
            
            setEthPriceUSD(formattedPrice);
        })();
    }, []);

    return (
        <div className="grid grid-cols-3 rounded-md bg-red-100 w-full p-5">
            <div className="flex flex-col p-3 justify-between box-border bg-white">
                <div className="">
                    <p className="uppercase text-[12px]"> Ether Price </p>
                    <p className=""> { ethPriceUSD } </p>
                </div>
                {/* <hr className="px-4 bg-[#e9ecef] w-full" />  */}
                <div className="">
                    <p className="uppercase text-[12px]"> Market Cap </p>
                    <p className=""> $188,169,271,365.00 </p>
                </div>
            </div>
            <div className="flex flex-col box-border">  
                <div className="flex p-3 box-border justify-between">
                    <div className="">
                        <p className="uppercase text-[12px]"> Transactions </p>
                        <p className="text-[15px]"> 1,895.50 M (13.1 TPS) </p>
                    </div>
                    <div className="">
                        <p className="uppercase text-[12px]"> Med Gas Price </p>
                        <p className="text-[15px]"> { avgGasPriceWGEI } </p>
                    </div>
                </div>
                {/* <hr className="px-4 w-full" />  */}
                <div className="flex p-3 box-border justify-between">
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
            <div className="bg-orange-50 p-3 text-[12px]">  
                <p className="font-sm uppercase"> Transaction history in 14 days </p>
                <p> Chart goes here ... </p>
            </div>
        </div>
    )
}