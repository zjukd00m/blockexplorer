import { Utils } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { getTokenMetaData } from "../../services/ethereum";
import { copy2clipboard } from "../../utils/clipboard";

export default function UserTokens({ tokens }) {
    const [selectedToken, setSelectedToken] = useState();
    const [expanded, setIsExpanded] = useState(false);
    const [userTokens, setUserTokens] = useState([]);

    useEffect(() => {
        if (!tokens?.tokenBalances?.length) return;

        (async () => {
            let tokenMetadata = await Promise.all(
                tokens.tokenBalances.map(async (token) => {
                    const metadata = await getTokenMetaData(token.contractAddress);
                    const tokenBalance = Utils.formatUnits(token.tokenBalance, "ether");

                    return {...token, metadata, tokenBalance}
                })
            );

            tokenMetadata = tokenMetadata?.sort((tokenA, tokenB) => tokenB.metadata.symbol - tokenA.metadata.symbol)

            setUserTokens(tokenMetadata);

            console.log("Token metadata");
            console.log(tokenMetadata);
        })();
    }, [tokens]);

    return (
        <div className="">
            <div className="w-full h-[500px] overflow-y-auto">
                {
                    userTokens?.map((token) => (
                            <div key={token.contractAddress} value={token.metadata.symbol} className="border-b border-b-slate-300 p-2 hover:bg-slate-100">
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex items-center">
                                            {
                                                token.metadata.logo?.length ? <img src={token.metadata.logo} width="20" height="20" alt={token.metadata.symbol} /> : <i className="fa-brands fa-ethereum fa-md"></i>
                                            }
                                            <p className="text-sm ml-3"> { token.metadata.name } <span className=""> ( { token.metadata.symbol } ) </span> </p>
                                        </div>
                                        <div>
                                            <p className="text-xs inline mr-2"> {token.contractAddress} </p>
                                            <i className="fa-regular fa-clone fa-xs text-slate-500" onClick={() => copy2clipboard(token.contractAddress)}></i>
                                        </div>
                                    </div>
                                    <div className="flex justify-start mt-2">
                                        <p className="text-xs"> { token.tokenBalance } <span className="ml-3"> { token.metadata.symbol } </span> </p>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}