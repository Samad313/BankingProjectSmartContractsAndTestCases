// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract RupeesToken is ERC20, Pausable, Ownable, AccessControl {

               
    bytes32 public constant MINTER_ROLE = keccak256( "MINTER_ROLE" );

    constructor() ERC20("RupeesToken", "PKRT") 
    {

     _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
     _grantRole(MINTER_ROLE, msg.sender);

    }


    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole ( MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn(address to, uint256 amount) public onlyOwner {
        _burn(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}