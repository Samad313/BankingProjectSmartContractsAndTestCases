
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
        
    it("Deposit should work", async function () {
        // Create the smart contract object to test from
        const [owner] = await ethers.getSigners();
        const TestContract = await ethers.getContractFactory("bank");
        const contract = await TestContract.deploy(1,"USDollarToken","RupeesToken");

        // Input USDT
        const depositTestUSDT = await contract.deposit(100, true );
        expect(depositTestUSDT).to.equal(false);    
        // Input PKRT
        const depositTestPKRT = await contract.deposit(100, false );
        expect(depositTestPKRT).to.equal(false);    

        const withdrawTest = await contract.withdraw(10);
        expect(withdrawTest);
        
    });

});