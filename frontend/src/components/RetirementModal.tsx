import React, { useState } from 'react';
import { X, CheckCircle, Leaf, Lock } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    project: {
        name: string;
        location: string;
        available: number;
    };
    quantity: number;
    onConfirm: (details: { beneficiary: string; purpose: string }) => void;
}

const RetirementModal: React.FC<Props> = ({ isOpen, onClose, project, quantity, onConfirm }) => {
    if (!isOpen) return null;

    const [step, setStep] = useState<'confirm' | 'success'>('confirm');
    const [beneficiary, setBeneficiary] = useState('');
    const [purpose, setPurpose] = useState('');

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('success');
        // Trigger onConfirm after a slight delay or immediately if just UI update
        setTimeout(() => {
            onConfirm({ beneficiary, purpose });
        }, 100);
    };

    if (step === 'success') {
        return (
            <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Retirement Successful!</h3>
                            <p className="text-gray-500 mb-6">
                                You have successfully retired <strong>{quantity} tonnes</strong> of CO₂e from <strong>{project.name}</strong>.
                            </p>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-green-200 rounded-full opacity-50"></div>
                                <div className="relative z-10">
                                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Offset Certificate</div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{beneficiary || 'Anonymous'}</h4>
                                    <p className="text-sm text-gray-600 italic">"{purpose || 'For a sustainable future'}"</p>
                                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-xs text-gray-500">
                                        <span>ID: 0x8a7...2f9</span>
                                        <span>{new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                            >
                                View My Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <div className="flex items-center mb-4">
                                    <div className="bg-green-100 p-2 rounded-full mr-3">
                                        <Leaf className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                                        Confirm Credit Retirement
                                    </h3>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <Lock className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800">Permanent Action</h3>
                                            <div className="mt-2 text-sm text-blue-700">
                                                <p>
                                                    Once retired, credits cannot be reused, transferred, or sold. This action is recorded permanently on the blockchain.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <span className="block text-gray-500 text-xs uppercase">Project</span>
                                        <span className="font-semibold text-gray-900">{project.name}</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <span className="block text-gray-500 text-xs uppercase">Location</span>
                                        <span className="font-semibold text-gray-900">{project.location}</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <span className="block text-gray-500 text-xs uppercase">Retiring</span>
                                        <span className="font-bold text-green-600 text-lg">{quantity} tCO₂e</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <span className="block text-gray-500 text-xs uppercase">Remaining</span>
                                        <span className="font-semibold text-gray-900">{project.available.toLocaleString()} avail.</span>
                                    </div>
                                </div>

                                <form onSubmit={handleConfirm} className="space-y-4">
                                    <div>
                                        <label htmlFor="beneficiary" className="block text-sm font-medium text-gray-700 mb-1">
                                            Beneficiary Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="beneficiary"
                                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                            placeholder="Who is this offset for?"
                                            required
                                            value={beneficiary}
                                            onChange={(e) => setBeneficiary(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                                            Retirement Purpose
                                        </label>
                                        <textarea
                                            id="purpose"
                                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                            placeholder="e.g., Q1 2026 Emissions"
                                            rows={2}
                                            value={purpose}
                                            onChange={(e) => setPurpose(e.target.value)}
                                        />
                                    </div>

                                    <div className="mt-8 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Confirm & Retire Credits
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RetirementModal;
