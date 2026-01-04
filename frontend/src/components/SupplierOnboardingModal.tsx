import React, { useState } from 'react';
import { X, CheckSquare, Square } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SupplierOnboardingModal: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, validation and submission logic here
        alert("Application Submitted! We will review your details and contact you shortly.");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="mt-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                <span className="border-b-4 border-blue-500 pb-1">Become a supplier on</span> CARBYNE
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* General Information */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">General Information</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Please note: if you want to issue credits, please use the CARBYNE Direct onboarding form.
                                        This will ensure your request is directed to the right team and processed more efficiently.
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                            <input type="text" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                            <input type="text" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Business email</label>
                                            <input type="email" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" required />
                                        </div>
                                    </div>
                                </div>

                                {/* Carbon Credits */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Carbon Credits</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">What carbon standards do you currently develop/trade projects under?</label>
                                            <input type="text" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Other Applicable Carbon Standard</label>
                                            <input type="text" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" />
                                            <p className="mt-1 text-xs text-gray-500">If you selected "Other", please indicate which carbon standard here.</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Methodology</label>
                                            <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                                <option>-None-</option>
                                                <option>VM0007</option>
                                                <option>ACM0002</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Do you currently utilize a Web3 wallet?</label>
                                            <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                                <option>-None-</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Privacy & Captcha */}
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                            I agree to the <a href="#" className="text-blue-600 hover:text-blue-500 underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:text-blue-500 underline">Terms of Use</a>.
                                        </label>
                                    </div>

                                    {/* Mock ReCAPTCHA */}
                                    <div className="bg-gray-50 border border-gray-300 rounded-md p-3 w-64 flex items-center justify-between shadow-inner">
                                        <div className="flex items-center">
                                            <div className="h-6 w-6 border-2 border-gray-300 rounded bg-white mr-3"></div>
                                            <span className="text-sm text-gray-700 font-medium">I'm not a robot</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full border-2 border-blue-400 border-t-transparent animate-spin mb-1"></div>
                                            <span className="text-[10px] text-gray-400">reCAPTCHA</span>
                                            <span className="text-[8px] text-gray-400">Privacy - Terms</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        disabled={!agreed}
                                        className={`w-32 flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-bold text-white ${agreed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierOnboardingModal;
