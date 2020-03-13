// migrating the appropriate contracts
//let RealtyERC721Token = artifacts.require("./RealtyERC721Token.sol");
let SquareVerifier = artifacts.require("./SquareVerifier.sol");
let SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  //deployer.deploy(RealtyERC721Token);
  deployer.deploy(SquareVerifier);
  deployer.deploy(SquareVerifier).then(() => {
    return deployer.deploy(SolnSquareVerifier, SquareVerifier.address)
  })
};
