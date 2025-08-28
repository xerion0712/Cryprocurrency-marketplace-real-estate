# Real Estate Marketplace on Ethereum Blockchain  

A decentralized platform representing real estate as **ERC721 NFTs** with **ZK-SNARKs** for secure ownership verification. Built with Solidity, ZoKrates, and OpenSea integration.  

### Key Features  
- **NFT-Based Properties**: Each property is minted as a unique ERC721 token.  
- **Zero-Knowledge Proofs**: Owners verify titles without exposing sensitive data using ZoKrates.  
- **OpenSea Marketplace**: Trade NFTs on a live marketplace (testnet: [Rinkeby Opensea](https://rinkeby.opensea.io/assets/realty)).  

### Tech Stack  
- **Smart Contracts**: Solidity (Truffle), OpenZeppelin ERC721.  
- **ZK-SNARKs**: ZoKrates for proof generation/verification.  
- **Tools**: Docker,  Infura, Remix IDE.  

### Quick Start  
1. Clone repo → `npm install`  
2. Deploy: `truffle migrate --network rinkeby`  
3. Mint tokens via Remix/OpenSea.  

**Contract Address**: `0x9271F8912e952a852531541FF7423D6413A2Cd80`  
