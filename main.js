
const SHA256 = require('crypto-js/sha256')
const SHA1 = require('crypto-js/sha1')

class Block {
    constructor(index , timestamp , data ,previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index +  this.previousHash + this.timestamp +  JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0 , difficulty) !== Array(difficulty + 1 ).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('block mined  ' + this.hash);
    }
}


class BlockChain {
    constructor(){
        this.chain = [ this.createGenesisBlock()];
        this.difficulty = 3;
    }

    createGenesisBlock() {
        return new Block( 0 , '1/01/2019' , "Genesis Block" , "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1 ; i < this.chain.length ; i++ ) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash())
            {
                return false;
            }

            if(currentBlock.hash != previousBlock.hash)
            {
                return false;
            }
            
        }
        return true;
    }
}

let savjeeCoin = new BlockChain();

console.log('mining block 1' );
savjeeCoin.addBlock(new Block( 1 , '2/2/2019' , {amount:4}));


console.log('mining block 2');
savjeeCoin.addBlock(new Block( 2 , '2/5/2020' , {amount:10}));


//importing the crypto library
var crypto = require('crypto');

//creating hash object 
var hash = crypto.createHash('sha1');

//input string
data = hash.update('Itwasthebestoftimesitwastheworstoftimesitwastheageofwisdomitwastheageoffoolishnessitwastheepochofbeliefitwastheepochofincredulityitwastheseasonoflightitwastheseasonofdarknessitwasthespringofhopeitwasthewinterofdespair', 'utf-8');

//Creating MD in hex
generate_hash= data.digest('hex');

//Printing the output
console.log("hash : " + generate_hash);
