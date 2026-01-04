import React, { useState } from 'react';

const WalletConnect: React.FC = () => {
    const [address, setAddress] = useState<string | null>(null);

    const connectWallet = async () => {
        // Mock connection
        // In real app: window.ethereum.request({ method: 'eth_requestAccounts' })
        setAddress("0x71C...9A21");
    };

    return (
        <button
            onClick={connectWallet}
            className={`px-4 py-2 rounded-md text-sm font-medium ${address
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
        >
            {address ? `Connected: ${address}` : "Connect Wallet"}
        </button>
    );
};

export default WalletConnect;
