// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CarbonMarketplace is ReentrancyGuard {
    
    struct Listing {
        uint256 listingId;
        address seller;
        address tokenContract;
        uint256 tokenId;   // Project ID
        uint256 amount;    // Tonnes available
        uint256 pricePerTonne; // In Wei
        bool isActive;
    }

    uint256 public nextListingId;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed listingId, address indexed seller, uint256 indexed tokenId, uint256 amount, uint256 price);
    event Sale(uint256 indexed listingId, address indexed buyer, uint256 indexed tokenId, uint256 amount, uint256 price);

    constructor() {}

    function listCredit(address tokenContract, uint256 tokenId, uint256 amount, uint256 pricePerTonne) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(pricePerTonne > 0, "Price must be > 0");

        // Verify seller has the credits (frontend checks approval)
        IERC1155(tokenContract).safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        listings[nextListingId] = Listing(
            nextListingId,
            msg.sender,
            tokenContract,
            tokenId,
            amount,
            pricePerTonne,
            true
        );

        emit Listed(nextListingId, msg.sender, tokenId, amount, pricePerTonne);
        nextListingId++;
    }

    function buyCredit(uint256 listingId, uint256 amountToBuy) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing not active");
        require(listing.amount >= amountToBuy, "Not enough credits");
        
        uint256 totalPrice = listing.pricePerTonne * amountToBuy;
        require(msg.value >= totalPrice, "Insufficient funds sent");

        // Update listing
        listing.amount -= amountToBuy;
        if (listing.amount == 0) {
            listing.isActive = false;
        }

        // Transfer Tokens to Buyer
        IERC1155(listing.tokenContract).safeTransferFrom(address(this), msg.sender, listing.tokenId, amountToBuy, "");

        // Transfer Funds to Seller
        payable(listing.seller).transfer(totalPrice);

        // Refund excess if any
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        emit Sale(listingId, msg.sender, listing.tokenId, amountToBuy, totalPrice);
    }
}
