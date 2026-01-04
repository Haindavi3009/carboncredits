import React, { useState } from 'react';
import { PieChart, ArrowUpRight, Leaf, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
    // Metric Data
    const metrics = [
        { label: 'Credits Owned', value: '450', sub: 'Active Credits', icon: Leaf, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Credits Retired', value: '1,250', sub: 'Lifetime Carbon Offset', icon: ArrowUpRight, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total CO₂ Offset', value: '1,250', sub: 'Tonnes CO₂e', icon: PieChart, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Projects Supported', value: '8', sub: 'Global Impact', icon: CheckCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    // Portfolio Data
    const [portfolio, setPortfolio] = useState([
        { id: 1, name: 'Amazon Reforestation Alpha', credits: 200, status: 'Active', location: 'Brazil' },
        { id: 2, name: 'Solar Farm Alpha', credits: 150, status: 'Active', location: 'India' },
        { id: 3, name: 'Clean Water Initiative', credits: 100, status: 'Active', location: 'Kenya' },
        { id: 4, name: 'Wind Power Expansion', credits: 500, status: 'Retired', location: 'USA' },
    ]);

    // Transaction History Data
    const [transactions, setTransactions] = useState([
        { id: 101, project: 'Amazon Reforestation Alpha', amount: 200, action: 'Purchased', date: '2024-03-15', status: 'Completed' },
        { id: 102, project: 'Wind Power Expansion', amount: 500, action: 'Retired', date: '2024-02-28', status: 'Completed' },
        { id: 103, project: 'Solar Farm Alpha', amount: 150, action: 'Purchased', date: '2024-01-10', status: 'Completed' },
    ]);

    // Retirement Modal State
    const [isRetireModalOpen, setIsRetireModalOpen] = useState(false);
    const [selectedCredit, setSelectedCredit] = useState<any>(null);

    const openRetireModal = (item: any) => {
        setSelectedCredit(item);
        setIsRetireModalOpen(true);
    };

    const confirmRetire = () => {
        if (!selectedCredit) return;

        // Update Portfolio Status
        setPortfolio(prev => prev.map(p =>
            p.id === selectedCredit.id ? { ...p, status: 'Retired' } : p
        ));

        // Add to Transaction History
        setTransactions(prev => [{
            id: Date.now(),
            project: selectedCredit.name,
            amount: selectedCredit.credits,
            action: 'Retired',
            date: new Date().toISOString().split('T')[0],
            status: 'Completed'
        }, ...prev]);

        setIsRetireModalOpen(false);
        setSelectedCredit(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* 1. Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">Track your verified carbon credits and environmental impact.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                {/* 2. Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {metrics.map((m, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
                            <div className={`p-3 rounded-full ${m.bg} ${m.color} mr-4`}>
                                <m.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{m.value}</div>
                                <div className="text-sm text-gray-500 font-medium">{m.label}</div>
                                <div className="text-xs text-gray-400 mt-1">{m.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 3. My Portfolio */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900">My Portfolio</h3>
                            </div>
                            <ul className="divide-y divide-gray-200">
                                {portfolio.map((item) => (
                                    <li key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="mb-4 sm:mb-0">
                                            <div className="flex items-center">
                                                <span className={`inline-block h-2 w-2 rounded-full mr-2 ${item.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 ml-4">{item.location}</p>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 cursor-default">
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-900">{item.credits.toLocaleString()}</p>
                                                <p className="text-xs text-gray-500">Credits</p>
                                            </div>
                                            {item.status === 'Active' ? (
                                                <button
                                                    onClick={() => openRetireModal(item)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Retire Credits
                                                </button>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Retired
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 5. Transaction History */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                            </div>
                            <ul className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                                {transactions.map((tx) => (
                                    <li key={tx.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-sm font-medium text-gray-900 truncate w-2/3" title={tx.project}>{tx.project}</p>
                                            <span className={`text-xs font-bold ${tx.action === 'Purchased' ? 'text-green-600' : 'text-red-500'}`}>
                                                {tx.action === 'Purchased' ? '+' : '-'}{tx.amount}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>{tx.date}</span>
                                            <span className="flex items-center">
                                                {tx.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1 text-green-500" />}
                                                {tx.status}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Retirement Confirmation Modal */}
            {isRetireModalOpen && selectedCredit && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsRetireModalOpen(false)}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Retire Carbon Credits?
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to retire <strong>{selectedCredit.credits} credits</strong> from <strong>{selectedCredit.name}</strong>?
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                                            <strong>Warning:</strong> This action permanently removes these credits from circulation. This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={confirmRetire}
                                >
                                    Confirm Retirement
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => setIsRetireModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
