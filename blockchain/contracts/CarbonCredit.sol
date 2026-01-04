// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract CarbonCredit is ERC1155, Ownable, ERC1155Burnable {
    
    // Mapping from token ID to project metadata hash (IPFS or Database ID)
    mapping(uint256 => string) public projectHashes;

    constructor() ERC1155("https://api.carbonmarket.com/metadata/{id}.json") Ownable(msg.sender) {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data, string memory projectHash)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
        projectHashes[id] = projectHash;
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
