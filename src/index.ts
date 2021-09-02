import * as CryptoJS from "crypto-js";

class Block {
    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timestamp:number;

    static calculateBlockHash = (
            index:number, 
            previousHash:string,
            data:string,
            timestamp:number
    ):string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    
    static validateStructure = (item:Block):boolean =>{
        const flag = typeof item.index === "number" 
            && typeof item.hash === "string" 
            && typeof item.previousHash === "string"    
            && typeof item.data === "string" 
            && typeof item.timestamp === "number";

        return flag;
    }
    constructor(
        index:number,
        hash:string,
        previousHash:string,
        data:string,
        timestamp:number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0,"2020202020220", "", "hello!",1231456);

let blockchain:Block[] = [genesisBlock];

const getBlockchain = ():Block[] => blockchain;

const getLatestBlock = ():Block => blockchain[blockchain.length-1];

const getNewTimeStamp = ():number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string):Block => {
    const previousBlock:Block = getLatestBlock();
    const newIndex:number = previousBlock.index + 1;
    const newTimeStamp:number = getNewTimeStamp();
    const newHash:string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimeStamp);

    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
    
}

const getHashForBlock = (item:Block):string => Block.calculateBlockHash(item.index, item.previousHash, item.data, item.timestamp);

const isValidBlock = (candidate:Block, previousBlock: Block) : Boolean => {
    if(!Block.validateStructure(candidate)){
        return false;
    }else if(previousBlock.hash !== candidate.previousHash){
        return false;
    }else if(previousBlock.index +1 !== candidate.index){
        return false;
    }else if(candidate.hash !== getHashForBlock(candidate)){
        return false;
    }else{
        return true;
    }
}

const addBlock = (candidate:Block): void =>{
    if(isValidBlock(candidate, getLatestBlock())){
        blockchain.push(candidate);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain) ;

export {};