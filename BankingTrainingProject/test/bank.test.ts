
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { Bank, USDollarToken, RupeesToken } from "../typechain-types";
import { getDefaultProvider, Signer } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { pkrtSol, usdtSol } from "../typechain-types/contracts";
import { ethers } from "hardhat";
import { USDollarTokenInterface } from "../typechain-types/contracts/usdt.sol/USDollarToken";


describe ( "Bank" , function() 
{
    let Bank: Bank;
    let rupeesToken: RupeesToken;
    let usdollarToken: USDollarToken;
    let owner: SignerWithAddress;
    
        
    before("Initialization of Contract", async () => {
		
        const _pkrt = await ethers.getContractFactory("RupeesToken");
		rupeesToken = await _pkrt.deploy() as RupeesToken;

        const _usdt = await ethers.getContractFactory("USDollarToken");
		usdollarToken = await _usdt.deploy() as USDollarToken;
		
        [ owner ] = await ethers.getSigners();
		const bank = await ethers.getContractFactory("bank");
		Bank = await bank.deploy(1,rupeesToken.address,usdollarToken.address) as Bank;

	});

    //Parameter test pkrt
    describe("Parameters Test PKRT", function () {
		it("Should set the right owner", async function () {
			expect(
				await rupeesToken.hasRole(await rupeesToken.MINTER_ROLE(), owner.address)
			).to.be.equal(true);
		});

		it("Symbol should be right", async function () {
			expect(await rupeesToken.symbol()).to.be.equal("pkrt");
		});
	});

    //Parameter test pkrt
    describe("Parameters Test USDT", function () {
		it("Should set the right owner", async function () {
			expect(
				await usdollarToken.hasRole(await usdollarToken.BURNER_ROLE(), owner.address)
			).to.be.equal(true);
		});

		it("Symbol should be right", async function () {
			expect(await rupeesToken.symbol()).to.be.equal("usdt");
		});
	});

    //Alowance test cases 
    /* it("Test case to check with allowance given on this address pkrt ", async function () {
        expect(await rupeesToken.allowance(owner.address,Bank.address)).to.toString()
    });

    it("Test case to check without allowance given on this address usdt ", async function () {
        usdollarToken.allowance(owner.address, Bank.address);
    }); */
    
    //Minting test case for pkrt
    describe("Mint Test PKRT", function () {
		it("Total Supply should be 0", async function () {
			expect(await rupeesToken.totalSupply()).to.be.equal(0);
		});

		it("Reverts : Non Minter tries to mint", async function () {
			await expect(
				rupeesToken.mint(owner.address, 1)
			).to.be.revertedWith(
				`AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6`
			);
		});

		it("Minter Mints", async function () {
			await rupeesToken.mint(owner.address, 1)
		});

		it("TotalSupply is 1", async function () {
			expect(await rupeesToken.totalSupply()).to.be.equal(1);
		});
	});

    //Burn test case to USDT 

/*

    // Test cases to check deposit function
    it("Test case to check deposit with correct amount", async function () {
    });

    it("Test case to check deposit with wrong amount", async function () {
    });

    it("Test case to check deposit with correct currency", async function () {
    });

    it("Test case to check deposit with wrong currency", async function () {
    });

    //Test cases to check withDraw function
    it("Test case to check if bank has the ", async function () {
    });

*/


});