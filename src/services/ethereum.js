import { Utils,  } from "alchemy-sdk";
import axios from "axios";
import alchemy from "../utils/alchemyClient";

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
    const gasPriceWei = await alchemy.core.getGasPrice();
    
    const gasPriceGwei = Utils.formatUnits(gasPriceWei, "gwei");

    if (inUSD) {
        const etherUSDPrice = await getCurrentEtherPrice();

        return etherUSDPrice * gasPriceWei * (1/10**9);
    }

    return gasPriceGwei;
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

    let lastBlock;

    if (!beforeBlockNumber) {
        lastBlock = await getLastSafeBlock();
    } else {
        lastBlock = beforeBlockNumber;
    }

    // Generate the block numbers starting from the last one
    const blockNumbers = Array(amount).fill().map((_, idx) => lastBlock - idx);

    console.log("The block numbers");
    console.log(blockNumbers);

    // Get the data from all the blocks
    // const blocks = await Promise.all(blockNumbers.map((blockN) => alchemy.core.getBlock(blockN)));

    // return blocks;
}

/**
 * Fetch the current price of ether in usd using the coingecko API
 * @returns The price of ETH in USD
 */
export async function getCurrentEtherPrice() {
    try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum");

        if (res.status !== 200) {
            return null;
        }

        if (!res.data?.tickers?.length) {
            return null;
        }

        const { converted_last } = res.data.tickers.find(({ target }) => target === "USD" );

        return converted_last.usd;
    } catch (e) {
        console.error(e);
        return null;
    }
}
