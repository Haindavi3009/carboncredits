// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonMarketplace is ReentrancyGuard, Ownable {
    
    struct Listing {
        uint256 listingId;
        address seller;
        address tokenAddress;
        uint256 tokenId;
        uint256 quantity;
        uint256 pricePerToken; // In Wei
        bool active;
    }

    uint256 public nextListingId;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed listingId, address indexed seller, uint256 tokenId, uint256 price);
    event Sale(uint256 indexed listingId, address indexed buyer, uint256 quantity, uint256 totalPrice);

    constructor() Ownable(msg.sender) {}

    function listToken(address _tokenAddress, uint256 _tokenId, uint256 _quantity, uint256 _pricePerToken) external {
        IERC1155 token = IERC1155(_tokenAddress);
        require(token.balanceOf(msg.sender, _tokenId) >= _quantity, "Insufficient balance");
        require(token.isApprovedForAll(msg.sender, address(this)), "Marketplace not approved");

        listings[nextListingId] = Listing({
            listingId: nextListingId,
            seller: msg.sender,
            tokenAddress: _tokenAddress,
            tokenId: _tokenId,
            quantity: _quantity,
            pricePerToken: _pricePerToken,
            active: true
        });

        emit Listed(nextListingId, msg.sender, _tokenId, _pricePerToken);
        nextListingId++;
    }

    function buyToken(uint256 _listingId, uint256 _quantity) external payable nonReentrant {
        Listing storage listing = listings[_listingId];
        require(listing.active, "Listing inactive");
        require(listing.quantity >= _quantity, "Insufficient stock");
        
        uint256 totalPrice = listing.pricePerToken * _quantity;
        require(msg.value >= totalPrice, "Insufficient funds sent");

        listing.quantity -= _quantity;
        if (listing.quantity == 0) {
            listing.active = false;
        }

        IERC1155(listing.tokenAddress).safeTransferFrom(listing.seller, msg.sender, listing.tokenId, _quantity, "");
        payable(listing.seller).transfer(totalPrice);

        emit Sale(_listingId, msg.sender, _quantity, totalPrice);
    }
}
