// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract CarbonCreditToken is ERC1155, Ownable, ERC1155Burnable {
    
    // Mapping from token ID to project metadata text (e.g., IPFS hash)
    mapping(uint256 => string) public _uris;

    constructor() ERC1155("") Ownable(msg.sender) {}

    // Mint new carbon credits (only owner/verifier can do this in this simplified version)
    // id: Project ID
    // amount: Number of tonnes
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    // Set the metadata URI for a specific project ID
    function setURI(uint256 id, string memory newuri) public onlyOwner {
        _uris[id] = newuri;
        emit URI(newuri, id);
    }

    // Override uri function to return specific IPFS hash for the project
    function uri(uint256 id) public view override returns (string memory) {
        return _uris[id];
    }
}
