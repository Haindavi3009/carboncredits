import { ethers } from 'ethers';

// Partial ABIs for the contracts we just wrote
const TOKEN_ABI = [
    "function mint(address account, uint256 id, uint256 amount, bytes memory data) public",
    "function uri(uint256 id) public view returns (string memory)",
    "function retire(uint256 id, uint256 amount) public", // Custom function we added
    "function balanceOf(address account, uint256 id) public view returns (uint256)"
];

const MARKETPLACE_ABI = [
    "function listCredit(address tokenContract, uint256 tokenId, uint256 amount, uint256 pricePerTonne) external",
    "function buyCredit(uint256 listingId, uint256 amountToBuy) external payable",
    "event Listed(uint256 indexed listingId, address indexed seller, uint256 indexed tokenId, uint256 amount, uint256 price)",
    "event Sale(uint256 indexed listingId, address indexed buyer, uint256 indexed tokenId, uint256 amount, uint256 price)"
];

// Address of deployed contracts (Placeholders for now)
// In a real deployment, these would come from environment variables or a config file
export const TOKEN_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const MARKETPLACE_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export class Web3Service {
    provider: ethers.BrowserProvider | null = null;
    signer: ethers.JsonRpcSigner | null = null;
    tokenContract: ethers.Contract | null = null;
    marketplaceContract: ethers.Contract | null = null;

    constructor() {
        if (window.ethereum) {
            this.provider = new ethers.BrowserProvider(window.ethereum);
        }
    }

    async connectWallet(): Promise<string> {
        if (!this.provider) {
            throw new Error("Metamask not installed!");
        }

        await this.provider.send("eth_requestAccounts", []);
        this.signer = await this.provider.getSigner();
        const address = await this.signer.getAddress();

        this.initializeContracts();
        return address;
    }

    initializeContracts() {
        if (!this.signer) return;

        this.tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, this.signer);
        this.marketplaceContract = new ethers.Contract(MARKETPLACE_CONTRACT_ADDRESS, MARKETPLACE_ABI, this.signer);
    }

    async buyCredit(listingId: number, amount: number, pricePerTonne: number): Promise<string> {
        if (!this.marketplaceContract) throw new Error("Wallet not connected");

        const totalCost = ethers.parseEther((amount * pricePerTonne).toString());

        const tx = await this.marketplaceContract.buyCredit(listingId, amount, {
            value: totalCost
        });

        await tx.wait();
        return tx.hash;
    }

    async retireCredit(projectId: number, amount: number): Promise<string> {
        if (!this.tokenContract) throw new Error("Wallet not connected");

        // Note: Our simplified contract assumes a 'retire' or burn function
        // verify implementation matches ABI
        const tx = await this.tokenContract.retire(projectId, amount);
        await tx.wait();
        return tx.hash;
    }
}

export const web3Service = new Web3Service();
