import React, { useState } from 'react';
import { CheckCircle, Zap, Shield, FileText, Cpu, Lock, ArrowRight, Globe, Leaf, BarChart3 } from 'lucide-react';
import SupplierOnboardingModal from '../components/SupplierOnboardingModal';

const ProjectOwners: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnboardClick = () => {
        setIsModalOpen(true);
    };

    const scrollToSteps = () => {
        document.getElementById('issuance-steps')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <SupplierOnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            {/* 1. Hero Section */}
            <section className="relative bg-gray-900 text-white overflow-hidden border-b border-gray-800">
                {/* Background pattern/gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 opacity-50"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        List Once. Sell Globally. <br /><span className="text-green-400">Get Paid Instantly.</span>
                    </h1>
                    <p className="max-w-3xl text-xl text-gray-300 mb-10 leading-relaxed">
                        Tokenize, verify, and sell carbon credits directly to verified buyers.
                        We combine AI-powered verification with blockchain transparency to maximize your project's funding.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleOnboardClick}
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-gray-900 bg-green-400 hover:bg-green-500 transition-colors"
                        >
                            Onboard as a Supplier
                        </button>
                        <button
                            onClick={scrollToSteps}
                            className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-lg font-medium rounded-md text-white hover:bg-gray-800 transition-colors"
                        >
                            How to Issue Credits
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. Platform Impact Metrics (Moved up for better flow/trust) */}
            <section className="bg-white py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <div className="text-center px-4 py-4">
                            <div className="text-4xl font-extrabold text-gray-900 mb-2">2.5M+</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center justify-center gap-2">
                                <Leaf className="w-4 h-4 text-green-500" /> Tonnes CO₂ Retired
                            </div>
                        </div>
                        <div className="text-center px-4 py-4">
                            <div className="text-4xl font-extrabold text-gray-900 mb-2">150+</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center justify-center gap-2">
                                <BarChart3 className="w-4 h-4 text-blue-500" /> Projects Listed
                            </div>
                        </div>
                        <div className="text-center px-4 py-4">
                            <div className="text-4xl font-extrabold text-gray-900 mb-2">12</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center justify-center gap-2">
                                <Globe className="w-4 h-4 text-purple-500" /> Global Regions
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Trust & Value Highlights */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why Issue with CARBYNE?</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Eliminate intermediaries and transparently prove your impact.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Direct & Transparent</h3>
                            <p className="text-gray-600 leading-relaxed">
                                List projects directly to verified buyers. Remove opaque brokers and keep more of your funding for actual impact.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI-Powered Verification</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our AI instantly analyzes technical documents to create accessible impact summaries, reducing buyer due diligence time.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Guaranteed Uniqueness</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Blockchain technology mints each credit as a unique digital asset. Once retired, it's burned forever—zero double counting.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Direct Credit Issuance */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="inline-block px-3 py-1 rounded bg-gray-100 text-gray-800 font-semibold text-xs uppercase tracking-wider mb-6">
                            Smart Assets
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                            Direct Credit Issuance
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We convert your environmental claims into liquid, auditable digital assets.
                            Our infrastructure handles the complex tokenization, allowing you to focus on project delivery.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-green-100 p-2 rounded mr-4 mt-1">
                                    <FileText className="w-5 h-5 text-green-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Verified Documentation</h4>
                                    <p className="text-gray-500 text-sm mt-1">Source documents are hashed and linked directly to the token metadata.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-2 rounded mr-4 mt-1">
                                    <Cpu className="w-5 h-5 text-blue-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">AI Extraction & Analysis</h4>
                                    <p className="text-gray-500 text-sm mt-1">Key metrics found by AI are automatically populated into the smart contract.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-purple-100 p-2 rounded mr-4 mt-1">
                                    <Lock className="w-5 h-5 text-purple-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Registered On-Chain</h4>
                                    <p className="text-gray-500 text-sm mt-1">Credits are minted as ERC-1155 tokens, guaranteeing ownership and provenance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        {/* Visual Representation of Issuance */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-1 shadow-2xl">
                            <div className="bg-gray-900 rounded-xl p-8 h-full border border-gray-700">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-gray-400 font-mono text-xs">CONTRACT: 0x71...3A9</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-green-500 text-xs font-bold uppercase">Live Minting</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center p-3 bg-gray-800 rounded border border-gray-700">
                                        <Leaf className="text-green-400 w-5 h-5 mr-3" />
                                        <div className="flex-1">
                                            <div className="h-2 bg-gray-700 rounded w-24 mb-1"></div>
                                            <div className="h-2 bg-gray-700 rounded w-16"></div>
                                        </div>
                                        <div className="text-green-400 font-mono text-sm">Valid</div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-800 rounded border border-gray-700 opacity-70">
                                        <Lock className="text-purple-400 w-5 h-5 mr-3" />
                                        <div className="flex-1">
                                            <div className="h-2 bg-gray-700 rounded w-32 mb-1"></div>
                                            <div className="h-2 bg-gray-700 rounded w-12"></div>
                                        </div>
                                        <div className="text-purple-400 font-mono text-sm">Secured</div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-800 rounded border border-gray-700 opacity-40">
                                        <Globe className="text-blue-400 w-5 h-5 mr-3" />
                                        <div className="flex-1">
                                            <div className="h-2 bg-gray-700 rounded w-20 mb-1"></div>
                                            <div className="h-2 bg-gray-700 rounded w-24"></div>
                                        </div>
                                        <div className="text-blue-400 font-mono text-sm">Global</div>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-gray-800">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Total Issued</span>
                                        <span className="text-white font-mono">1,000,000 TCO2E</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. How to Issue Carbon Credits (Step-by-Step) */}
            <section id="issuance-steps" className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">How to Issue Carbon Credits</h2>
                        <p className="mt-4 text-lg text-gray-600">A clear path from project registration to revenue generation.</p>
                    </div>

                    <div className="space-y-12 relative">
                        {/* Vertical line connecting steps */}
                        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 -z-10"></div>

                        {[
                            {
                                title: "1. Register Your Interest",
                                desc: "Submit project details, methodology standards (Verra, Gold Standard, etc.), expected annual volume, and verification body details.",
                            },
                            {
                                title: "2. Onboarding & Review",
                                desc: "We perform Know-Your-Customer (KYC) and Know-Your-Business (KYB) checks. A kickoff call establishes compliance and documentation needs.",
                            },
                            {
                                title: "3. Official Project Registration",
                                desc: "Complete credit intake forms, define vintage years, and setup your secure digital wallet for receiving assets.",
                            },
                            {
                                title: "4. Credit Issuance",
                                desc: "Credits are minted as unique, fractionalizable blockchain tokens fixed to your project ID and vintage year.",
                            },
                            {
                                title: "5. Listing & Management",
                                desc: "Your credits go live. Manage inventory, view analytics, and sell directly via the Marketplace or our API.",
                            }
                        ].map((step, idx) => (
                            <div key={idx} className="flex gap-6 items-start bg-white p-6 rounded-lg shadow-sm w-full relative">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg border-4 border-white shadow-sm z-10">
                                    {idx + 1}
                                </div>
                                <div className="pt-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Final Call-to-Action */}
            <section className="py-24 bg-gray-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to fund your environmental impact?</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Fast, transparent, AI-verified carbon credit issuance.
                    </p>
                    <button
                        onClick={handleOnboardClick}
                        className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-xl font-bold rounded-md text-gray-900 bg-green-400 hover:bg-green-500 transition-all transform hover:scale-105"
                    >
                        Onboard as a Supplier
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProjectOwners;
