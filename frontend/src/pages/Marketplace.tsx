import React, { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import ComparisonModal from '../components/ComparisonModal';
import { Filter, SlidersHorizontal, CheckCircle, ShieldCheck, RefreshCw, Cpu, Sparkles } from 'lucide-react';

// Enhanced Mock Data
const MOCK_PROJECTS = [
    {
        id: '1',
        name: 'Amazon Reforestation Alpha',
        category: 'Forestry',
        location: 'Brazil',
        price_per_credit: 15.0,
        available_credits: 5000,
        sdg_count: 3,
        verified: true,
        authority: 'Verra',
        validity: '2024-2029',
        supported_sdgs: ['Climate Action', 'Life on Land', 'No Poverty'],
        ai_summary: 'High biodiversity impact confirmed by Jaguar sightings.'
    },
    {
        id: '2',
        name: 'Solar Farm Alpha',
        category: 'Renewable Energy',
        location: 'India',
        price_per_credit: 10.5,
        available_credits: 12000,
        sdg_count: 4,
        verified: true,
        authority: 'Gold Standard',
        validity: '2023-2028',
        supported_sdgs: ['Clean Energy', 'Good Jobs', 'Climate Action', 'Infrastructure'],
        ai_summary: 'Efficient grid displacement reduces local coal dependency by 40%.'
    },
    {
        id: '3',
        name: 'Clean Water Initiative',
        category: 'Infrastructure',
        location: 'Kenya',
        price_per_credit: 12.0,
        available_credits: 8000,
        sdg_count: 5,
        verified: true,
        authority: 'Gold Standard',
        validity: '2024-2030',
        supported_sdgs: ['Clean Water', 'Good Health', 'Gender Equality', 'Climate Action', 'Life on Land'],
        ai_summary: 'Health data indicates 65% drop in waterborne illness in target villages.'
    },
    {
        id: '4',
        name: 'Wind Power Expansion',
        category: 'Renewable Energy',
        location: 'USA',
        price_per_credit: 22.0,
        available_credits: 3500,
        sdg_count: 2,
        verified: true,
        authority: 'ACR',
        validity: '2023-2027',
        supported_sdgs: ['Clean Energy', 'Climate Action'],
        ai_summary: 'Radar systems effectively minimize avian impact risk.'
    },
    {
        id: '5',
        name: 'Mangrove Restoration',
        category: 'Forestry',
        location: 'Indonesia',
        price_per_credit: 18.5,
        available_credits: 6500,
        sdg_count: 6,
        verified: false,
        authority: 'Pending',
        validity: 'Reviewing',
        supported_sdgs: ['Climate Action', 'Life Below Water', 'No Poverty', 'Gender Equality', 'Life on Land', 'Partnerships'],
        ai_summary: 'Soil carbon stock analysis shows 4x sequestration vs terrestrial forests.'
    },
];

const Marketplace: React.FC = () => {
    // State for filters
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
    const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('recently_added');

    // State for Comparison
    const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
    const [isComparisonOpen, setIsComparisonOpen] = useState(false);

    // Filter Logic
    const filteredProjects = useMemo(() => {
        let result = MOCK_PROJECTS.filter(p => {
            if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
            if (p.price_per_credit < priceRange[0] || p.price_per_credit > priceRange[1]) return false;
            if (verifiedOnly && !p.verified) return false;
            return true;
        });

        // Sorting Logic
        if (sortBy === 'price_asc') {
            result.sort((a, b) => a.price_per_credit - b.price_per_credit);
        } else if (sortBy === 'impact_desc') {
            result.sort((a, b) => b.sdg_count - a.sdg_count);
        }
        // recently_added assumes default order for now

        return result;
    }, [selectedCategory, priceRange, verifiedOnly, sortBy]);

    const resetFilters = () => {
        setSelectedCategory('All');
        setPriceRange([0, 100]);
        setVerifiedOnly(false);
        setSortBy('recently_added');
    };

    // Compare Logic
    const handleCompareToggle = (id: string, selected: boolean) => {
        if (selected) {
            if (selectedProjectIds.length < 3) {
                setSelectedProjectIds(prev => [...prev, id]);
            } else {
                alert("You can compare up to 3 projects at a time.");
            }
        } else {
            setSelectedProjectIds(prev => prev.filter(pid => pid !== id));
        }
    };

    const projectsToCompare = MOCK_PROJECTS.filter(p => selectedProjectIds.includes(p.id));

    // Dynamic AI Recommendation
    const aiRecommendation = useMemo(() => {
        // Simple heuristic: Find max SDG count or lowest price
        const highestImpact = [...filteredProjects].sort((a, b) => b.sdg_count - a.sdg_count)[0];
        if (highestImpact) {
            return {
                title: "Top AI Pick for Impact",
                text: `${highestImpact.name} supports ${highestImpact.sdg_count} SDGs, the highest in your selection.`,
                project: highestImpact
            };
        }
        return null;
    }, [filteredProjects]);


    return (
        <div className="bg-gray-50 min-h-screen">
            <ComparisonModal
                isOpen={isComparisonOpen}
                onClose={() => setIsComparisonOpen(false)}
                projects={projectsToCompare}
            />

            {/* 1. Page Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Carbon Credit Marketplace</h1>
                    <p className="mt-2 text-lg text-gray-500">Browse verified carbon credit projects across categories and regions</p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* 0. AI Recommendation Banner (New) */}
                {aiRecommendation && (
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-lg p-4 mb-8 flex items-start sm:items-center gap-4 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-purple-200 rounded-full opacity-30 blur-xl"></div>
                        <div className="p-2 bg-white rounded-full shadow-sm text-purple-600 z-10">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <div className="flex-1 z-10">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center">
                                {aiRecommendation.title}
                            </h3>
                            <p className="text-gray-700 text-sm mt-1">
                                {aiRecommendation.text}
                            </p>
                        </div>
                        <button
                            onClick={() => window.location.href = `/projects/${aiRecommendation.project.id}`}
                            className="z-10 bg-white text-purple-700 text-xs font-bold px-4 py-2 rounded-md border border-purple-200 shadow-sm hover:bg-purple-50"
                        >
                            View Project
                        </button>
                    </div>
                )}

                {/* Sticky Compare Bar */}
                {selectedProjectIds.length > 0 && selectedProjectIds.length <= 3 && (
                    <div className="fixed bottom-6 right-6 z-40 animate-fade-in-up">
                        <button
                            onClick={() => setIsComparisonOpen(true)}
                            className="bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl font-bold flex items-center hover:scale-105 transition-transform"
                        >
                            <SlidersHorizontal className="mr-2 h-5 w-5" />
                            Compare {selectedProjectIds.length} Projects
                        </button>
                    </div>
                )}


                {/* 5. Trust Strip (Visible while browsing) */}
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-8 flex flex-wrap justify-between items-center gap-4 text-sm text-green-800">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        <span><strong>AI-Verified Documents</strong>: Integrity checked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span><strong>Blockchain-Backed</strong>: Immutable ownership</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 text-green-600" />
                        <span><strong>One-Time Use</strong>: Guaranteed retirement</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* 2. Filters Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                            <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg">
                                <Filter className="h-5 w-5" /> Filters
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                                <div className="space-y-2">
                                    {['All', 'Forestry', 'Renewable Energy', 'Infrastructure'].map(cat => (
                                        <label key={cat} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === cat}
                                                onChange={() => setSelectedCategory(cat)}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Max Price: ${priceRange[1]}</h3>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>$0</span>
                                    <span>$100+</span>
                                </div>
                            </div>

                            {/* Verified Toggle */}
                            <div className="mb-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={verifiedOnly}
                                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-900 font-medium">Verified Only</span>
                                </label>
                            </div>

                            <button
                                onClick={resetFilters}
                                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* 4. Sorting Options */}
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm text-gray-500">Showing {filteredProjects.length} projects</span>
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                                >
                                    <option value="recently_added">Recently Added</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="impact_desc">Impact: High SDG Count</option>
                                </select>
                            </div>
                        </div>

                        {/* 3. Project Cards Grid */}
                        {filteredProjects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProjects.map((proj) => (
                                    <ProjectCard
                                        key={proj.id}
                                        project={proj}
                                        onCompare={handleCompareToggle}
                                        isSelected={selectedProjectIds.includes(proj.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* 6. Empty State */
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                                <Filter className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
                                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filtering to find what you're looking for.</p>
                                <div className="mt-6">
                                    <button
                                        onClick={resetFilters}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Marketplace;
