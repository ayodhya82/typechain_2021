"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, data, timestamp) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (item) => {
    const flag = typeof item.index === "number"
        && typeof item.hash === "string"
        && typeof item.previousHash === "string"
        && typeof item.data === "string"
        && typeof item.timestamp === "number";
    return flag;
};
const genesisBlock = new Block(0, "2020202020220", "", "hello!", 1231456);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimeStamp);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (item) => Block.calculateBlockHash(item.index, item.previousHash, item.data, item.timestamp);
const isValidBlock = (candidate, previousBlock) => {
    if (!Block.validateStructure(candidate)) {
        return false;
    }
    else if (previousBlock.hash !== candidate.previousHash) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidate.index) {
        return false;
    }
    else if (candidate.hash !== getHashForBlock(candidate)) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidate) => {
    if (isValidBlock(candidate, getLatestBlock())) {
        blockchain.push(candidate);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map