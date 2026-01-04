import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
    const [emissionValue, setEmissionValue] = React.useState(50);

    // 5. Featured Projects Data (Preview)
    const featuredProjects = [
        {
            id: '1',
            name: 'Amazon Reforestation Alpha',
            category: 'Forestry',
            location: 'Brazil',
            price: 15.0,
            sdg_count: 3,
            verified: true,
        },
        {
            id: '2',
            name: 'Solar Farm Alpha',
            category: 'Renewable Energy',
            location: 'India',
            price: 10.5,
            sdg_count: 4,
            verified: true,
        },
        {
            id: '3',
            name: 'Clean Water Initiative',
            category: 'Infrastructure',
            location: 'Kenya',
            price: 12.0,
            sdg_count: 5,
            verified: true,
        },
    ];

    // 6. Impact Metrics Data
    const impactMetrics = [
        { label: 'Projects Listed', value: '120+' },
        { label: 'Credits Available', value: '450K+' },
        { label: 'Credits Retired', value: '12K+' },
        { label: 'Countries Covered', value: '15' },
    ];

    return (
        <div className="bg-white">
            {/* 2. HERO SECTION */}
            <div className="relative bg-nature-50 overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-50 flex items-center justify-center opacity-20 lg:opacity-100 pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1950&q=80"
                        className="h-full w-full object-cover text-transparent"
                        alt="Nature background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-nature-50 via-white/80 to-transparent lg:hidden"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                            Buy Verified Carbon Credits with <span className="text-green-600">Clarity and Trust</span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-500 max-w-lg">
                            Discover carbon credit projects where AI explains real impact and blockchain ensures credits are used only once.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Link to="/marketplace" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg shadow-lg hover:shadow-xl transition-all">
                                Explore Marketplace
                            </Link>
                            <Link to="#how-it-works" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg">
                                How It Works
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. HOW IT WORKS */}
            <div id="how-it-works" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
                        <p className="mt-4 text-lg text-gray-500">The lifecycle of a verified credit.</p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2 mx-16"></div>

                        {[
                            { icon: CheckCircle, text: "Verified Project" },
                            { icon: Eye, text: "OCR Extracts Proof" },
                            { icon: ShieldCheck, text: "AI Explains Impact" },
                            { icon: Lock, text: "Blockchain Locks Use" },
                            { icon: Leaf, text: "Buy & Offset" }
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center bg-white p-4">
                                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 shadow-sm border border-green-200">
                                    <step.icon className="h-8 w-8" />
                                </div>
                                <p className="text-sm font-bold text-gray-900 text-center w-24 leading-tight">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* IMPACT CALCULATOR */}
            <div className="bg-gradient-to-br from-green-900 to-green-800 py-16 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Calculate Your Impact</h2>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20">
                        <label className="block text-lg font-medium mb-4">
                            My estimated emissions: <span className="text-2xl font-bold text-green-300">{emissionValue} tCO2</span>
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="1000"
                            value={emissionValue}
                            onChange={(e) => setEmissionValue(parseInt(e.target.value))}
                            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-400 mb-8"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-left">
                                <h4 className="font-bold text-green-300 text-sm uppercase mb-2">Recommended Project</h4>
                                <div className="text-xl font-bold">Solar Farm Alpha</div>
                                <div className="text-sm text-gray-300 mt-1">Available: 500+ credits • $10.50/t</div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Link
                                    to={`/projects/2?quantity=${emissionValue}`}
                                    className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform hover:scale-105 text-center flex items-center justify-center"
                                >
                                    Offset Now (${(emissionValue * 10.5).toLocaleString()})
                                </Link>
                                <button
                                    onClick={() => setEmissionValue(200)}
                                    className="text-xs text-green-200 hover:text-white underline decoration-dashed"
                                >
                                    Mercer Hook: Offset 100 hires' travel (~200t)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. TRUST & TRANSPARENCY */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Trust & Transparency</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Why trust this?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "AI-Verified Documents", desc: "Certification data extracted from official reports." },
                            { title: "Blockchain-Backed Ownership", desc: "Credits are unique and traceable." },
                            { title: "No Double Counting", desc: "Retired credits cannot be reused." },
                            { title: "Full Transparency", desc: "Original documents always available." }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="h-2 w-10 bg-green-500 rounded mb-4"></div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                                <p className="text-gray-500 text-sm">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. FEATURED PROJECTS */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProjects.map((proj) => (
                            <div key={proj.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                                    Project Image
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-sm text-green-600 font-bold uppercase tracking-wide">{proj.category}</div>
                                        {proj.verified && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{proj.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{proj.location}</p>

                                    <div className="flex justify-between items-center border-t pt-4">
                                        <div>
                                            <span className="block text-xs text-gray-500">Price per credit</span>
                                            <span className="text-lg font-bold text-gray-900">${proj.price}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 text-right">Impact</span>
                                            <span className="text-sm font-medium text-gray-900">{proj.sdg_count} SDGs</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link to={`/projects/${proj.id}`} className="block w-full text-center bg-white border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-md font-medium">
                                            View Project
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. IMPACT METRICS */}
            <div className="bg-nature-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {impactMetrics.map((metric, idx) => (
                            <div key={idx}>
                                <div className="text-4xl font-extrabold text-white mb-1">{metric.value}</div>
                                <div className="text-green-200 text-sm font-medium uppercase tracking-wider">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 7. FINAL CTA */}
            <div className="bg-white py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Ready to offset emissions responsibly?</h2>
                    <Link to="/marketplace" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all">
                        Explore Marketplace
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Simple Leaf Icon since Lucide might not have it or it's named differently
const Leaf = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
)

export default Home;
