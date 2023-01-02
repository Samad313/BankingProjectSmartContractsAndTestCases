// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./pkrt.sol";
import "./usdt.sol";


contract CurrencyConverter {
    // Declare a mapping to store the balances of each account
    mapping(address => uint) public balances;

    RupeesToken immutable public pkrt;
    USDollarToken immutable public usdt;


    // Declare a variable to store the conversion rate between USDT and PKRT
    uint256 public conversionRate;

    // The constructor sets the conversion rate between USDT and PKRT
    constructor(uint256 _conversionRate , address _pkrt , address _usdt )  {
        conversionRate = _conversionRate;
        pkrt = RupeesToken ( _pkrt ) ;
        usdt = USDollarToken ( _usdt ) ;

    }

    // The deposit function allows users to deposit an amount in USDT or PKRT
    function deposit(uint _amount, address _currency) public {
        // If the currency is USDT, convert the amount to PKRT and add it to the user's balance
        if ( USDollarToken ( _currency ) == usdt) 
        {
            usdt.burn(msg.sender,_amount); // Modify based on roles / Give access to bank contract in pkrt contract to burn
            _amount = _amount * conversionRate;
        }

        pkrt.transferFrom(msg.sender,address(this),_amount);

        // Add the amount to the user's balance
        balances[msg.sender] += _amount;
    }

    // The withdraw function allows users to withdraw their balance in PKRT
    function withdraw(uint256 _amount) public {
        // Check if the user has a sufficient balance
        require (balances[msg.sender] < _amount, "balance not correct");
        balances[msg.sender]-=_amount;

        // Otherwise, transfer the balance to the user's account and reset their balance to 0
        pkrt.transfer(msg.sender,_amount);
    }
}
