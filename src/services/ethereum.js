import { toHex, Utils } from "alchemy-sdk";
import axios from "axios";
import alchemy from "../utils/alchemyClient";

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;


export async function searchEthereum(searchQ, searchBy) {
    let res = null;

    if (searchBy === "BLOCK") {
        try {
            if (searchQ.match(/^\d+$/g)) {
                res = await alchemy.core.getBlock(parseInt(searchQ));
            } else {
                res = await alchemy.core.getBlock(searchQ);
            }
        } catch (e) {
            return null;
        }
    } else if (searchBy === "TX") {
        try {
            res = await alchemy.core.getTransaction(searchQ);
        } catch (e) {
            return null;
        }
    } else if (searchBy === "TOKEN") {
        try {
            res = await alchemy.core.getTokenMetadata(searchQ);
        } catch (e) {
            return null;
        }
    } else if (searchBy === "DOMAIN_NAME") {
        try {
            res = await alchemy.core.lookupAddress(searchQ);
        } catch (e) {
            return null;
        }
    } else {
        throw new Error("Invalid searchBy value");
    }

    return res;
}

export async function getTotalTransactions() {
    const lastBlockNumber = await alchemy.core.getBlockNumber();
    let lastBlock = await alchemy.core.getBlockWithTransactions(lastBlockNumber);

    let txs = lastBlock.transactions.length;

    while(lastBlock.parentHash !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
        lastBlock = await alchemy.core.getBlockWithTransactions(lastBlock.parentHash);
        txs += lastBlock.transactions.length;
    }

    return txs;
}

export async function getAvgGasPrice(inUSD = false) {
    const feeData = await alchemy.core.getFeeData();
    
    if (!feeData) {
        return null;
    } 
    
    const baseFeeGwei = Utils.formatUnits(feeData.gasPrice, "gwei");
    // const priorityFee = Utils.formatUnits(feeData.maxPriorityFeePerGas, "gwei")

    if (inUSD) {
        let etherUSDPrice = await getCurrentEtherPrice();

        etherUSDPrice = etherUSDPrice * Utils.formatUnits(feeData.gasPrice, "ether");

        return etherUSDPrice;
    }

    return baseFeeGwei;
}

export async function getLastSafeBlock() {
    const latestBlockNumber = await alchemy.core.getBlockNumber();
    
    return latestBlockNumber; 
}

/**
 * Given a block object data, get the transaction cost of each one
 * @param {*} blockData 
 * @returns {*} The total of ethers spent in all the transactions included in the block 
 */
export async function getBlockTransactionsCost(blockData) {
    const txData = await Promise.all(
        blockData
            .transactions
            .map((txHash) => alchemy.core.getTransaction(txHash))
        );

    return txData
        .map(({ value }) => Utils.formatUnits(value, "ether") )
        .reduce((acc, txValue) => acc + txValue, 0);
}

export async function getBlocksWithData(amount, beforeBlockNumber) {
    try {
        let lastBlock;

        if (!beforeBlockNumber) {
            lastBlock = await getLastSafeBlock();
        } else {
            lastBlock = beforeBlockNumber;
        }

        // Generate the block numbers starting from the last one
        const blockNumbers = Array(amount).fill().map((_, idx) => lastBlock - idx);

        // Get the data from all the blocks
        const blocks = await Promise.all(blockNumbers.map((blockN) => alchemy.core.getBlockWithTransactions(blockN)));

        // Get the miner's data
        const blocksWithMiners = await Promise.all(blocks?.map(async (block) => {
            try {
                // TODO: How to remove the error from here ?
                const minerENS = await alchemy.core.lookupAddress(block.miner);
                return { ...block, miner: minerENS || block.miner, originalMiner: block.miner }
            } catch (e) {
                return block;
            }
        }));

        return blocksWithMiners;
    } catch(e) {
        return null;
    }
}

// Get the given amount of tx of the latest mined block
export async function getTxWithData(amount) {
    try {
        const block = await getBlocksWithData(1);

        if (amount > block[0].transactions.length) return null;

        const txWithData = block[0].transactions.slice(0, amount)
            .map((tx) => {
                return {
                    ...tx, 
                    timestamp: block[0].timestamp, 
                    value: Utils.formatEther(tx.value),
                }
            });

        return txWithData;
    } catch (e) {
        return null;
    }
}

// Fetch the given amount of tx. If the amount of tx is higher than
// the ones the first block has, tx are taken from the previous ones
// TODO: How to implement the pagination ?
export async function getTxList(amount, page) {
    try {
       // Get one block with the transacion data
       let block = await getBlocksWithData(1);
       
       if (!block?.length) return null;

       // When no transactions, return null
       if (!block[0].transactions?.length) return null;

       // We are insterested in the block transactions
       let blockTxs = block[0].transactions;

       // Hold all the transactions, from different blocks
       let blockTxsCount = 0;
        let blocksTx = [];
        
        let looped = false;

        // Iterate while the block transactions count is less than the expected amount
        // ? -- Does it work properly ?
        while (blockTxsCount <= amount) {
            looped = true;
            // Transaction blocks are not enough to fill the array
            if (!(blockTxs.length <= amount)) {
                // Copy the blocksTx content and the block's transactions
                blocksTx = [...blocksTx, ...blockTxs]; 

                // Fetch another block
                block = await getBlocksWithData(1, block[0].number);

                blockTxs = block[0].transactions;

                blockTxsCount += blockTxs.length;
            } else {
                // Copy the blocksTx content and the block's transactions
                blocksTx = [...blocksTx, ...blockTxs]; 
                blockTxsCount += blockTxs.length;
            }
       }

       // The block transaction's length is greather than the expected amount
       if (!looped) {
            blocksTx = blockTxs;
       }
        
    //    return blocksTx.slice(lowX, highX);

        // --- ! Parse the transactions
        // Get the sender and receiver tx ENS address
        blocksTx = await Promise.all(blocksTx?.map(async (tx) => {
            let ensFrom = tx.from;
            let ensTo = tx.to;

            try {
                ensFrom = await alchemy.core.lookupAddress(tx.from);
                if (!ensFrom?.length) {
                    ensFrom = tx.from;
                }
            } catch (e) {
                ensFrom = tx.from;
            }

            try {
                ensTo = await alchemy.core.lookupAddress(tx.to);
                if (!ensTo?.length) {
                    ensTo = tx.to;
                }
            } catch (e) {
                ensTo = tx.to;
            }

            let txReceipt = null;

            try {
                txReceipt = await alchemy.core.getTransactionReceipt(tx.hash);
            } catch (e) {}

            return { ...tx, from: ensFrom, to: ensTo, timestamp: block[0].timestamp, receipt: txReceipt };
        }));

       // Get the lower and higher index for the block transaction pages
       let lowX = (page - 1) * amount;
       let highX = lowX + amount - 1;

        // When the block txs are more than the amount of txs
        console.log(blocksTx[0])
        return blocksTx?.sort((txA, txB) => txA.blockNumber - txB.blockNumber).slice(lowX, highX);

    } catch (e) {
        return null;
    }
}

export async function getBlock(blockNumber) {
    try {
        const block = await alchemy.core.getBlock(Number(blockNumber));

        let ens = "";

        try {
            ens = await alchemy.core.lookupAddress(block.miner);

            if (!ens) {
                ens = block.miner;
            }
        } catch (e) {
            ens = block.miner;
        }

        return {...block, miner: ens};
    } catch (e) {
        return null;
    }
}

export async function getTx(txHash) {
    try {
        const tx = await alchemy.core.getTransaction(txHash);

        const txReceipt = await alchemy.core.getTransactionReceipt(tx.hash);

        if (!tx) return null;

        return { ...tx, receipt: txReceipt };
    } catch (e) {
        return null;
    }
}

export async function getTokenMetaData(tokenAddress) {
    try {
        const tokenMetadata = await alchemy.core.getTokenMetadata(tokenAddress);

        return tokenMetadata;
    } catch (e) {
        return null;
    }
}

export async function getAddressData(address) {
    try {
        let userBalance = await alchemy.core.getBalance(address);

        const tokenBalances = await alchemy.core.getTokenBalances(address);
        
        const etherPrice = await getCurrentEtherPrice();

        if (!etherPrice) return;

        const { ethPriceUSD } = etherPrice;
        
        userBalance = Utils.formatUnits(userBalance, "ether");

        const txCount = await alchemy.core.getTransactionCount(address);
        
        return {
            userBalance,
            ethValueUSD: (userBalance * ethPriceUSD).toFixed(2),
            tokenBalances,
            txCount,
        }
    } catch (e) {
        return null;
    }
}


/**
 * Fetch:
 * - The current price of ether in usd using the coingecko API
 * - The price change over the last 24 hours
 * @returns The price of ETH in USD
 */
export async function getCurrentEtherPrice() {
    try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum");
        const { converted_last } = res.data.tickers.find(({ target }) => target === "USD" );
        
        const priceChange = res.data.market_data.price_change_percentage_24h;

        return { 
            priceChange,
            ethPriceUSD: converted_last.usd
        };
    } catch (e) {
        return null;
    }
}

// The market capitalization is the total ether circulating supply times the USD price
export async function getMarketCap() {
    try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum");

        const ethMarketCap = res.data.market_data.market_cap.eth;

        const { converted_last } = res.data.tickers.find(({ target }) => target === "USD" );

        return ethMarketCap * converted_last.usd;
    } catch (e) {
        return null;
    }
}

export async function getBtcEthPrice() {
    try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum");

        const btcEthPrice = res.data.market_data.current_price.btc;

        return btcEthPrice;
    } catch (e) {
        return null;
    }
}

export async function getRawBlockByNumberOrHash(blockNumber, getBy) {
    try {
        if (getBy !== "number" && getBy !== "hash") return;

        let res = null;

        if (getBy === "number") {
            res = await axios.post(
                `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
                JSON.stringify({
                    jsonrpc: "2.0",
                    method: "eth_getBlockByNumber",
                    params: [toHex(blockNumber), false],
                    id: 0
                }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else {
            res = await axios.post(
                `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
                JSON.stringify({
                    jsonrpc: "2.0",
                    method: "eth_getBlockByHash",
                    params: [blockNumber, false],
                    id: 0,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
        }

        const data = res.data;

        if (!data?.result) return null;

        let ens = "";

        try {

            ens = await alchemy.core.lookupAddress(data.result.miner);

            if (!ens) {
                ens = data.result.miner;
            }
        } catch (e) {
            ens = data.result.miner;
        }

        const timestamp = parseInt(data.result.timestamp) * 1000;

        return {...data, result: { ...data.result, miner: ens, timestamp }};
    } catch (e) {
        return null;
    }
}

export async function getRawTx(txHash) {
    try {
        const res = await axios.post(
            `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_getTransactionByHash",
                params: [txHash],
                id: 1,
            }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        return res.data;
    } catch (e) {
        return null;
    }
}
