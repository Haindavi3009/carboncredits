import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Database, FileText, Share2, Shield } from 'lucide-react';
import { jsPDF } from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';

interface TransactionDetails {
    tx_hash: string;
    block_number: number;
    timestamp: string;
    from_address: string;
    to_address: string;
    quantity: number;
    project_name: string;
    status: string;
    gas_used: number;
    network: string;
}

const Explorer: React.FC = () => {
    const { tx_hash } = useParams<{ tx_hash: string }>();
    const [tx, setTx] = useState<TransactionDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [retiring, setRetiring] = useState(false);

    useEffect(() => {
        fetchTransaction();
    }, [tx_hash]);

    const fetchTransaction = async () => {
        try {
            const res = await fetch(`http://localhost:8000/orders/explorer/${tx_hash}`);
            if (res.ok) {
                const data = await res.json();
                setTx(data);
            } else {
                toast.error("Transaction not found");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load transaction");
        } finally {
            setLoading(false);
        }
    };

    const handleRetire = async () => {
        if (!tx) return;
        setRetiring(true);
        try {
            const res = await fetch(`http://localhost:8000/orders/retire/${tx.tx_hash}`, {
                method: 'PUT'
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Credits Retired Successfully!");
                setTx({ ...tx, status: 'RETIRED' });
                generatePDF(tx);
            } else {
                toast.error(data.detail || "Retirement failed");
            }
        } catch (error) {
            toast.error("Error retiring credits");
        } finally {
            setRetiring(false);
        }
    };

    const generatePDF = (txData: TransactionDetails) => {
        const doc = new jsPDF({
            orientation: 'landscape',
        });

        // Background / Border
        doc.setLineWidth(5);
        doc.setDrawColor(34, 197, 94); // Green
        doc.rect(10, 10, 277, 190);

        // Header
        doc.setFontSize(36);
        doc.setTextColor(22, 163, 74); // Green 600
        doc.text("Certificate of Retirement", 148, 40, { align: "center" });

        // Content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text(`This certifies that`, 148, 70, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text(`${txData.quantity} Tonnes of CO2e`, 148, 85, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        doc.text(`have been permanently retired on the CARBYNE Registry`, 148, 100, { align: "center" });

        doc.text(`Beneficiary: ${txData.from_address}`, 148, 120, { align: "center" });
        doc.text(`Project: ${txData.project_name}`, 148, 135, { align: "center" });

        // Footer
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Transaction Hash: ${txData.tx_hash}`, 148, 160, { align: "center" });
        doc.text(`Block Number: ${txData.block_number}`, 148, 170, { align: "center" });
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 148, 180, { align: "center" });

        doc.save(`CARBYNE_CERT_${txData.tx_hash.substring(0, 8)}.pdf`);
    };

    if (loading) return <div className="p-10 text-center">Loading Explorer...</div>;
    if (!tx) return <div className="p-10 text-center">Transaction not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-12 font-mono">
            <Toaster position="top-right" />

            {/* Nav */}
            <div className="bg-[#1e1e1e] text-white border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Database className="h-6 w-6 text-green-500" />
                        <span className="text-xl font-bold">CARBYNE EXPLORER</span>
                        <span className="bg-green-900 text-green-400 text-xs px-2 py-0.5 rounded">MAINNET</span>
                    </div>
                    <div>
                        <Link to="/dashboard" className="text-gray-400 hover:text-white flex items-center text-sm">
                            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">Transaction Details</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${tx.status === 'RETIRED' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                            {tx.status}
                        </span>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Transaction Hash */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-gray-500 flex items-center"><Share2 className="w-4 h-4 mr-2" /> Transaction Hash:</div>
                            <div className="md:col-span-3 font-mono text-gray-900 break-all">{tx.tx_hash}</div>
                        </div>

                        {/* Status */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-gray-500 flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Status:</div>
                            <div className="md:col-span-3">
                                {tx.status === 'RETIRED' ? (
                                    <span className="text-orange-600 font-bold flex items-center">Success (Retired)</span>
                                ) : (
                                    <span className="text-green-600 font-bold flex items-center">Success (Active)</span>
                                )}
                            </div>
                        </div>

                        {/* Block */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-gray-500 flex items-center"><Database className="w-4 h-4 mr-2" /> Block:</div>
                            <div className="md:col-span-3 text-blue-600 cursor-pointer hover:underline">{tx.block_number}</div>
                        </div>

                        {/* Timestamp */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-2" /> Timestamp:</div>
                            <div className="md:col-span-3 text-gray-900">{new Date(tx.timestamp).toUTCString()}</div>
                        </div>

                        <hr className="my-4 border-gray-100" />

                        {/* From / To */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-gray-500">From:</div>
                            <div className="md:col-span-3 font-mono text-blue-600">{tx.from_address}</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-gray-500">Interacted With (To):</div>
                            <div className="md:col-span-3 font-mono text-blue-600">{tx.to_address} <span className="text-gray-400 text-xs ml-2">(Carbyne Registry Contract)</span></div>
                        </div>

                        <hr className="my-4 border-gray-100" />

                        {/* Details */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-gray-500">Tokens Transferred:</div>
                            <div className="md:col-span-3">
                                <span className="font-bold bg-gray-100 px-2 py-1 rounded">{tx.quantity} TCO2e</span>
                                <span className="ml-2 text-gray-500">From Project: {tx.project_name}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex justify-end">
                            {tx.status === 'COMPLETED' ? (
                                <div className="space-y-2 text-right">
                                    <button
                                        onClick={handleRetire}
                                        disabled={retiring}
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        {retiring ? "Retiring..." : (
                                            <>
                                                <Shield className="w-5 h-5 mr-2" />
                                                Retire & Burn Credits
                                            </>
                                        )}
                                    </button>
                                    <p className="text-xs text-gray-500">This will permanently remove credits from the blockchain.</p>
                                </div>
                            ) : (
                                <button
                                    onClick={() => generatePDF(tx)}
                                    className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                >
                                    <FileText className="w-5 h-5 mr-2" />
                                    Download Certificate
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explorer;
