pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
//import 'openzeppelin-solidity/contracts/math/SafeMath.sol';


// contract call to the zokrates generated solidity contract SquareVerifier
contract SquareVerifier {
    function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns (bool);
}


// SolnSquareVerifier contract that inherits from ERC721Mintable class
contract SolnSquareVerifier is RealtyERC721Token {

    SquareVerifier verificationContract;

    constructor(address verifierContractAddress) public
    {
        verificationContract = SquareVerifier(verifierContractAddress);
    }

    // solutions struct that can hold an index & an address
    struct Solution {
        uint256 solutionIndex;
        address solutionProvider;
    }

    // array of the above solutions struct
    Solution[] private solutions;

    //define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqueSolutions;

    // create an event to emit when a solution is added
    event AddedSolution(uint solutionIndex, address solutionProvider);

    // create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 key) internal {
        uint256 index = solutions.length.add(1);
        Solution memory soln =  Solution(index, msg.sender);
        solutions.push(soln);
        uniqueSolutions[key] = soln;
        emit AddedSolution(index, msg.sender);
    }

    // create a function to mint new NFT only after the solution has been verified
    function proveMint(address to, uint256 tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns (bool) {
        // create hash of solution submitted
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        // check that solution has not already submitted
        require(uniqueSolutions[key].solutionIndex == 0, "Solution already exists");
        // check solution is valid
        require(verificationContract.verifyTx(a, b, c, input)," Solution is invalid");
        // add solution
        addSolution(key);
        // mint token
        bool didMint = mint(to, tokenId);
        return didMint;
    }
}



























