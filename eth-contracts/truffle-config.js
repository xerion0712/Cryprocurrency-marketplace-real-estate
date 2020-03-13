const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

const infuraKey = fs.readFileSync(".infura").toString().trim();
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  //contracts_directory: "./contracts/SquareVerifier.sol",
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     rinkeby: {
       provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
       network_id: 4,       // Rinkeby's id
       gas: 5500000,
     },
  },

  // Set default mocha options here
  mocha: {
     timeout: 100000
  },

  // Configure compilers
  compilers: {
    solc: {
      //version: "0.5.2",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
}
