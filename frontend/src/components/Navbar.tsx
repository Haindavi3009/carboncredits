import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { web3Service } from '../services/web3';

const Navbar: React.FC = () => {
    const location = useLocation();
    const isProjectDetails = location.pathname.startsWith('/projects/');
    const [isConnected, setIsConnected] = React.useState(false);
    const [walletAddress, setWalletAddress] = React.useState('');

    const handleConnect = async () => {
        try {
            const address = await web3Service.connectWallet();
            setWalletAddress(address);
            setIsConnected(true);
        } catch (error) {
            console.error("Wallet connection failed:", error);
            // Fallback for demo purposes if Metamask isn't available
            alert("Metamask not detected or connection failed. using simulation mode.");
            setIsConnected(true);
            setWalletAddress('0x71...Simulated');
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-green-700 tracking-wider">CARBYNE</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/marketplace"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${location.pathname === '/marketplace'
                                    ? 'border-green-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                    }`}
                            >
                                For Buyers
                            </Link>
                            <Link
                                to="/project-owners"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${location.pathname === '/project-owners'
                                    ? 'border-green-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                    }`}
                            >
                                For Project Owners
                            </Link>
                            <Link
                                to="/dashboard"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${location.pathname === '/dashboard'
                                    ? 'border-green-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                    }`}
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {!isProjectDetails && (
                            <button
                                onClick={handleConnect}
                                className={`${isConnected ? 'bg-gray-100 text-gray-800' : 'bg-green-600 hover:bg-green-700 text-white'} px-4 py-2 rounded-md text-sm font-medium transition-colors`}
                            >
                                {isConnected ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Connect Wallet'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
