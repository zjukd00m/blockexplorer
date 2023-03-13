import { Utils,  } from "alchemy-sdk";
import axios from "axios";
import alchemy from "../utils/alchemyClient";
import { getTimeDifferenceInSeconds } from "../utils/time";

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

// TODO: Find out how to get the block reward
export async function getBlocksWithData(amount, beforeBlockNumber = false) {

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
    const blocksWithMiners = await Promise.all(blocks.map(async (block) => {
        try {
            const minerENS = await alchemy.core.lookupAddress(block.miner);
            return { ...block, miner: minerENS || block.miner, value: 0.99 }
        } catch (e) {
            return block;
        }
    }));

    return blocksWithMiners;
}

// Get the given amount of tx of the latest mined block
export async function getTxWithData(amount) {
    try {
        const block = await getBlocksWithData(1);

        if (amount > block[0].transactions.length) return null;

        const txWithData = block[0].transactions.slice(0, amount)
            .map((tx) => {
                const value = Number(Utils.formatUnits(tx.value, "ether"));
                
                return {
                    ...tx, 
                    timestamp: block[0].timestamp, 
                    value: value < 0 ? 0 : value,
                }
            });

        return txWithData;
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

        console.log(res.data)

        const { converted_last } = res.data.tickers.find(({ target }) => target === "USD" );
        
        const priceChange = res.data.market_data.price_change_percentage_24h;

        return { 
            priceChange,
            ethPriceUSD: converted_last.usd
        };
    } catch (e) {
        console.error(e);
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
        console.error(e);
        return null;
    }
}

export async function getBtcEthPrice() {
    try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum");

        const btcEthPrice = res.data.market_data.current_price.btc;

        return btcEthPrice;
    } catch (e) {
        console.error(e);
        return null;
    }
}