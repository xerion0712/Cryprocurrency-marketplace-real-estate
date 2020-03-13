let ERC721MintableComplete = artifacts.require('RealtyERC721Token');

contract('TestERC721Mintable', accounts => {

    const contract_owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];
    const account_three = accounts[3];

    describe('Test match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: contract_owner});

            // mint multiple tokens
            this.contract.mint(account_one, 1011, {from: contract_owner});
            this.contract.mint(account_one, 1012, {from: contract_owner});
            this.contract.mint(account_two, 1021, {from: contract_owner});
            this.contract.mint(account_three, 1031, {from: contract_owner});
        })

        it('should return total supply', async function () { 
            let tokenTotalSupply = await this.contract.totalSupply.call();
            //console.log(tokenTotalSupply.toNumber());
            assert.equal(tokenTotalSupply.toNumber(), 4, "Incorrect total token supply count");
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf.call(account_one);
            //console.log(tokenBalance.toNumber());
            assert.equal(tokenBalance.toNumber(), 2, "Incorrect token balance returned");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI.call(1011);
            //console.log(tokenURI);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1011");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 1012, {from: account_one});
            let tokenBalance1 = await this.contract.balanceOf.call(account_one);
            let tokenBalance2 = await this.contract.balanceOf.call(account_two);
            let tokenOwner = await this.contract.ownerOf.call(1012);
            //console.log(tokenOwner);
            assert.equal(tokenBalance1.toNumber(), 1, "Incorrect token balance of sender returned");
            assert.equal(tokenBalance2.toNumber(), 2, "Incorrect token balance of receiver returned");
            assert.equal(tokenOwner, account_two, "Incorrect token owner after transfer");
        })
    });

    describe('Test ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: contract_owner});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let mintFailed = false;
            try {
                await this.contract.mint(account_one, 1011, {from: account_one});
              } catch (error) {
                //console.log(error.reason);
                mintFailed = true;
              }
              assert.equal(mintFailed, true, "Minting did not fail when caller is not contract owner");
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.owner.call()
            assert.equal(contractOwner, contract_owner, "Incorrect contract owner");
        })

    });
})