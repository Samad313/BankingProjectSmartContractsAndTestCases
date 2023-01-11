// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract USDollarToken is ERC20, Pausable, Ownable, AccessControl {
    constructor() ERC20("USDollarToken", "USDT") 
    {
          _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
          _grantRole(BURNER_ROLE,msg.sender); 
    }

    bytes32 public constant BURNER_ROLE = keccak256( "BURNER_ROLE" );    

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address to, uint256 amount) public onlyRole ( BURNER_ROLE ) {
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