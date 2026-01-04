import React from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Tag, Cpu } from 'lucide-react';

interface Project {
    id: string;
    name: string;
    category: string;
    location: string;
    price_per_credit: number;
    available_credits: number;
    sdg_count: number;
    verified: boolean;
    // Expanded fields for comparison
    authority?: string;
    validity?: string;
    supported_sdgs?: string[];
    ai_summary?: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    projects: Project[];
}

const ComparisonModal: React.FC<Props> = ({ isOpen, onClose, projects }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Compare Projects</h2>
                            <p className="text-gray-500">AI-Assisted Side-by-Side Analysis</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Feature</th>
                                        {projects.map(p => (
                                            <th key={p.id} className="px-6 py-3 bg-gray-50 text-left text-sm font-bold text-gray-900">
                                                {p.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* 1. Category */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Category</td>
                                        {projects.map(p => (
                                            <td key={p.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    <Tag className="w-3 h-3 mr-1" /> {p.category}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* 2. Location */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Location</td>
                                        {projects.map(p => (
                                            <td key={p.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {p.location}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* 3. Price */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Price per Credit</td>
                                        {projects.map(p => (
                                            <td key={p.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold text-green-700">
                                                ${p.price_per_credit.toFixed(2)}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* 4. Available */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Availability</td>
                                        {projects.map(p => (
                                            <td key={p.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {p.available_credits.toLocaleString()} tCO₂e
                                            </td>
                                        ))}
                                    </tr>

                                    {/* 5. Authority & Validity */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Certification</td>
                                        {projects.map(p => (
                                            <td key={p.id} className="px-6 py-4 text-sm text-gray-900">
                                                <div className="font-medium">{p.authority || 'Verra'}</div>
                                                <div className="text-xs text-gray-500">Valid: {p.validity || '2024-2029'}</div>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* 6. Verification Status */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Verification</td>
                                        {projects.map(p => (
                                            <td key={p.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {p.verified ? (
                                                    <div className="flex items-center text-green-700">
                                                        <ShieldCheck className="w-4 h-4 mr-1" />
                                                        Verified
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">Pending</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* 7. SDGs */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-500">SDG Impact</td>
                                        {projects.map(p => (
                                            <td key={p.id} className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                                                <div className="flex flex-wrap gap-1 mb-1">
                                                    {(p.supported_sdgs || ['Goal 13', 'Goal 15']).map((sdg, i) => (
                                                        <span key={i} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-100">
                                                            {sdg}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500 font-semibold">{p.sdg_count} Goals Supported</span>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* 8. Blockchain Logic */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Asset Type</td>
                                        {projects.map(p => (
                                            <td key={p.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex items-center text-purple-700 bg-purple-50 px-2 py-1 rounded w-max">
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Retirable ERC-1155
                                                </div>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* 9. AI Summary Analysis (The "Killer Feature") */}
                                    <tr className="bg-green-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-800 flex items-start pt-6">
                                            <Cpu className="w-5 h-5 mr-2" /> AI Insight
                                        </td>
                                        {projects.map(p => (
                                            <td key={p.id} className="px-6 py-4 whitespace-normal text-sm text-gray-800 italic border-l border-green-100">
                                                "{p.ai_summary || 'High-integrity project with verified additionality and strong community co-benefits.'}"
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonModal;
