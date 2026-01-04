import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AIChat from '../components/AIChat';
import { Share2, MapPin, Tag, FileText, Cpu, Lock, ShieldCheck, ArrowRight, Info, Mail } from 'lucide-react';
import RetirementModal from '../components/RetirementModal';

// Rich Mock Data (simulating API response)
interface ProjectDoc {
    name: string;
    size: string;
    type: string;
    url: string;
}

interface ProjectData {
    id: string;
    name: string;
    category: string;
    location: string;
    price: number;
    available: number;
    verified: boolean;
    sdgs: string[];
    description: string;
    why_it_matters: string;
    verification: {
        authority: string;
        standard: string;
        status: string;
        validity: string;
        project_id: string;
    };
    contact_email: string;
    ai_summary: string;
    documents: {
        verification: ProjectDoc[];
        methodology: ProjectDoc[];
        supporting: ProjectDoc[];
    };
}

// Expanded Mock Data Dictionary
const PROJECTS: Record<string, ProjectData> = {
    '1': {
        id: '1',
        name: 'Amazon Reforestation Alpha',
        category: 'Forestry',
        location: 'Brazil',
        price: 15.0,
        available: 5000,
        verified: true,
        sdgs: ['Climate Action', 'Life on Land', 'No Poverty'],
        description: 'This project focuses on reforesting degraded pasture land in the Amazon basin. It connects fragmented habitats to support biodiversity while sequestering significant amounts of carbon.',
        why_it_matters: 'The Amazon is the world\'s largest tropical rainforest and a vital carbon sink. Reforestation here not only captures carbon but also protects endangered species and supports local communities through sustainable forestry jobs.',
        verification: {
            authority: 'Verra',
            standard: 'VCS (Verified Carbon Standard)',
            status: 'Verified',
            validity: '2024 - 2029',
            project_id: 'VCS-1923'
        },
        contact_email: 'contact@amazonreforestation.org',
        ai_summary: 'Analysis of audit report #2024-Q1 confirms successful planting of 50,000 native saplings. Survival rate is 92%, exceeding the 85% baseline. Satellite imagery correlates with ground reports showing increased canopy cover.',
        documents: {
            verification: [
                { name: 'VERIFICATION_REPORT_Rapporto_Ver_LIMENET_r2_24.03.20...', size: '1.2 MB', type: 'PDF', url: 'https://anthropocenefii.org/downloads/AFII-Amazon-Reforestation-Bond.pdf' },
                { name: 'OpinioneValidazioneLimenet_r1', size: '2.5 MB', type: 'PDF', url: 'https://www.sciencedirect.com/science/article/abs/pii/S037811271932537X' },
                { name: 'Limenet_Verification_RINA_Opinione_Verifica_Limenet_r1_E...', size: '845 KB', type: 'PDF', url: 'https://files.unsdsn.org/PB-Carbon-Emissions-EN.pdf' }
            ],
            methodology: [
                { name: 'PDD_Project_Design_Document_Limenet_Augusta_Stocca...', size: '2.2 MB', type: 'PDF', url: 'https://cdn.sanity.io/files/l6of5nwi/production/6903c2046371c4ecfa52fc8596aa57c0b5b85e2b.pdf' },
                { name: 'LM_V1_Methodology_Storage_rev.7.5', size: '912 KB', type: 'PDF', url: 'https://cdn.sanity.io/files/l6of5nwi/production/e2d2319a1190a34195bf1b93b12065a563ebd564.pdf' }
            ],
            supporting: [
                { name: 'CM_Limenet_OAE_Project_Info', size: '3.1 MB', type: 'PDF', url: 'https://cdn.sanity.io/files/l6of5nwi/production/e2d2319a1190a34195bf1b93b12065a563ebd564.pdf' }
            ]
        }
    },
    '2': {
        id: '2',
        name: 'Solar Farm Alpha',
        category: 'Renewable Energy',
        location: 'India',
        price: 10.5,
        available: 12000,
        verified: true,
        sdgs: ['Clean Energy', 'Good Jobs', 'Climate Action', 'Infrastructure'],
        description: 'A large-scale solar power project in Rajasthan, replacing coal-based electricity generation.',
        why_it_matters: 'Reduces dependency on fossil fuels and provides clean energy to the local grid, creating green jobs in the region.',
        verification: {
            authority: 'Gold Standard',
            standard: 'Gold Standard for the Global Goals',
            status: 'Verified',
            validity: '2023 - 2028',
            project_id: 'GS-4502'
        },
        contact_email: 'contact@solarfarmalpha.com',
        ai_summary: 'Efficient grid displacement reduces local coal dependency by 40%.',
        documents: {
            verification: [
                { name: 'GS_Validation_Report_Solar_Rajasthan', size: '1.8 MB', type: 'PDF', url: 'https://cdn.sanity.io/files/l6of5nwi/production/f68ae4dcedbfc7abff3841c10b4ff28aa9bf6780.pdf' }
            ],
            methodology: [
                { name: 'Gold_Standard_Solar_PV_Methodology', size: '1.1 MB', type: 'PDF', url: 'https://cdm.unfccc.int/methodologies/PAmethodologies/tools/am-tool-07-v7.0.pdf' }
            ],
            supporting: [
                { name: 'Grid_Connectivity_Certificate', size: '950 KB', type: 'PDF', url: 'https://unfccc.int/sites/default/files/resource/paris_agreement_english_0.pdf' }
            ]
        }
    },
    '3': {
        id: '3',
        name: 'Clean Water Initiative',
        category: 'Infrastructure',
        location: 'Kenya',
        price: 12.0,
        available: 8000,
        verified: true,
        sdgs: ['Clean Water', 'Good Health', 'Gender Equality', 'Climate Action', 'Life on Land'],
        description: 'Providing clean drinking water to rural communities, reducing the need for boiling water with wood fuel.',
        why_it_matters: 'Improves health outcomes by reducing waterborne diseases and reduces deforestation by removing the need for firewood.',
        verification: {
            authority: 'Gold Standard',
            standard: 'Gold Standard for the Global Goals',
            status: 'Verified',
            validity: '2024 - 2030',
            project_id: 'GS-1109'
        },
        contact_email: 'info@cleanwaterkenya.org',
        ai_summary: 'Health data indicates 65% drop in waterborne illness in target villages.',
        documents: {
            verification: [
                { name: 'Water_Benefit_Standard_Verification', size: '1.4 MB', type: 'PDF', url: 'https://globalgoals.goldstandard.org/standards/GS-Water-Benefit-Standard.pdf' }
            ],
            methodology: [
                { name: 'Safe_Water_Supply_Methodology', size: '2.0 MB', type: 'PDF', url: 'https://cdm.unfccc.int/filestorage/e/x/t/extfile-20150204163900769-Meth_AMS-III.AV._ver04.0.pdf/Meth_AMS-III.AV._ver04.0.pdf?t=WkR8bzMzbXAzfDA_vT8t8Kq6Wf9v-z5w_3hL' }
            ],
            supporting: [
                { name: 'Community_Impact_Assessment', size: '3.5 MB', type: 'PDF', url: 'https://apps.who.int/iris/bitstream/handle/10665/329972/9789241516853-eng.pdf' }
            ]
        }
    },
    '4': {
        id: '4',
        name: 'Wind Power Project',
        category: 'Renewable Energy',
        location: 'Texas, USA',
        price: 10.0,
        available: 15000,
        verified: true,
        sdgs: ['Clean Energy', 'Industry', 'Climate Action'],
        description: 'Large-scale wind farm contributing to the renewable energy mix of the Texas grid.',
        why_it_matters: 'Reduces greenhouse gas emissions from fossil fuel power plants.',
        verification: {
            authority: 'Verra',
            standard: 'VCS',
            status: 'Verified',
            validity: '2022 - 2032',
            project_id: 'VCS-2001'
        },
        contact_email: 'ops@windpowertexas.com',
        ai_summary: 'Operational efficiency at 98%, offsetting significant carbon emissions.',
        documents: {
            verification: [
                { name: 'VCS_Verification_Report_Wind_TX', size: '2.1 MB', type: 'PDF', url: 'https://verra.org/wp-content/uploads/2020/09/JNR_Validation_Report_Template_v3.2.pdf' }
            ],
            methodology: [
                { name: 'ACM0002_Grid_Connected_Electricity_Generation', size: '1.5 MB', type: 'PDF', url: 'https://cdm.unfccc.int/methodologies/PAmethodologies/tools/am-tool-07-v7.0.pdf' }
            ],
            supporting: [
                { name: 'Environmental_Impact_Statement', size: '4.2 MB', type: 'PDF', url: 'https://www.epa.gov/sites/default/files/2014-04/documents/wind-energy-eis-executive-summary.pdf' }
            ]
        }
    }
};



const ProjectDetails: React.FC = () => {
    const { id } = useParams();
    const project = PROJECTS[id || '1'] || PROJECTS['1'];

    const [activeTab, setActiveTab] = useState<'overview' | 'ai' | 'docs'>('overview');
    const [quantity, setQuantity] = useState(1);
    const [isRetireModalOpen, setIsRetireModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Auto-index documents on load (Live RAG)
    React.useEffect(() => {
        const indexDocs = async () => {
            if (!project) return;
            const allDocs = [
                ...project.documents.verification,
                ...project.documents.methodology,
                ...project.documents.supporting
            ];

            for (const doc of allDocs) {
                // Fire and forget indexing for speed, or could await
                console.log(`Indexing ${doc.name}...`);
                fetch('http://localhost:8000/ai/index-url', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ project_id: project.id, url: doc.url })
                }).catch(err => console.error("Indexing failed", err));
            }
        };
        indexDocs();
    }, [project.id]); // Fixed dependency

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0] || !project) return;

        const file = e.target.files[0];
        setUploading(true);

        const formData = new FormData();
        formData.append('project_id', project.id);
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:8000/ai/upload-document', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                alert("File uploaded and indexed successfully! You can now ask the AI about it.");
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading file.");
        } finally {
            setUploading(false);
        }
    };

    const handleBuy = () => {
        setIsRetireModalOpen(true);
    };

    const handleConfirmRetirement = (details: { beneficiary: string; purpose: string }) => {
        console.log("Retiring credits:", { quantity, ...details });
        // Simulation of blockchain interaction
        setTimeout(() => {
            alert(`Successfully retired ${quantity} credits for ${details.beneficiary || 'Self'}!\n\nTransaction ID: 0x${Math.random().toString(16).substr(2, 10).toUpperCase()}`);
            setIsRetireModalOpen(false);
        }, 1000);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <RetirementModal
                isOpen={isRetireModalOpen}
                onClose={() => setIsRetireModalOpen(false)}
                project={{
                    name: project.name,
                    location: project.location,
                    available: project.available
                }}
                quantity={quantity}
                onConfirm={handleConfirmRetirement}
            />
            {/* 1. Project Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {project.verified ? '✔ Verified Project' : 'Unverified'}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    <Tag className="w-3 h-3 mr-1" /> {project.category}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                            <div className="flex items-center text-gray-500 mt-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                {project.location}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-gray-400 hover:text-gray-600">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:col-span-2">
                        {/* 2. Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="-mb-px flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`${activeTab === 'overview'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('docs')}
                                    className={`${activeTab === 'docs'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Documents
                                </button>
                                <button
                                    onClick={() => setActiveTab('ai')}
                                    className={`${activeTab === 'ai'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                                >
                                    <Cpu className="w-4 h-4 mr-2" />
                                    AI Insights & Verification
                                </button>
                            </nav>
                        </div>

                        {activeTab === 'overview' ? (
                            <div className="space-y-8">
                                {/* Description */}
                                <section className="bg-white shadow rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">About this Project</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {project.description}
                                    </p>
                                </section>

                                {/* Why it Matters */}
                                <section className="bg-green-50 border border-green-100 rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center">
                                        <Info className="w-5 h-5 mr-2" />
                                        Why this project matters
                                    </h3>
                                    <p className="text-green-800 leading-relaxed">
                                        {project.why_it_matters}
                                    </p>
                                </section>

                                {/* SDG Impact */}
                                <section className="bg-white shadow rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Sustainable Development Goals</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {project.sdgs.map((sdg: string, idx: number) => {
                                            // Comprehensive mapping for all 17 SDGs
                                            const getSdgNumber = (text: string): string => {
                                                const lowerText = text.toLowerCase();
                                                if (lowerText.includes('poverty')) return '1';
                                                if (lowerText.includes('hunger')) return '2';
                                                if (lowerText.includes('health') || lowerText.includes('well-being')) return '3';
                                                if (lowerText.includes('education')) return '4';
                                                if (lowerText.includes('gender') || lowerText.includes('equality')) return '5';
                                                if (lowerText.includes('clean water') || lowerText.includes('sanitation')) return '6';
                                                if (lowerText.includes('clean energy') || lowerText.includes('affordable')) return '7';
                                                if (lowerText.includes('decent work') || lowerText.includes('economic')) return '8';
                                                if (lowerText.includes('industry') || lowerText.includes('innovation') || lowerText.includes('infrastructure')) return '9';
                                                if (lowerText.includes('inequalities')) return '10';
                                                if (lowerText.includes('cities') || lowerText.includes('communities')) return '11';
                                                if (lowerText.includes('consumption') || lowerText.includes('production')) return '12';
                                                if (lowerText.includes('climate')) return '13';
                                                if (lowerText.includes('below water')) return '14';
                                                if (lowerText.includes('on land')) return '15';
                                                if (lowerText.includes('peace') || lowerText.includes('justice')) return '16';
                                                if (lowerText.includes('partnerships')) return '17';
                                                return '13'; // Default fallback
                                            };

                                            // Using reliable GitHub pages CDN from Open SDG
                                            const num = getSdgNumber(sdg);
                                            const cleanNum = parseInt(num, 10).toString();
                                            const imgUrl = `https://open-sdg.github.io/sdg-translations/assets/img/goals/en/${cleanNum}.png`;

                                            return (
                                                <div key={idx} className="relative group">
                                                    <img
                                                        src={imgUrl}
                                                        alt={sdg}
                                                        title={sdg}
                                                        className="w-24 h-24 rounded shadow-sm hover:scale-105 transition-transform bg-white"
                                                        onError={(e) => {
                                                            // Fallback to text if image fails
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                        }}
                                                    />
                                                    <div className="hidden w-24 h-24 flex items-center justify-center bg-blue-50 text-blue-700 text-xs font-bold text-center p-2 rounded border border-blue-200">
                                                        {sdg} (Goal {cleanNum})
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            </div>
                        ) : activeTab === 'docs' ? (
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Project Documentation</h3>
                                    <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                                        <input type="file" className="hidden" accept=".pdf,.txt" onChange={handleFileUpload} disabled={uploading} />
                                        {uploading ? 'Indexing...' : 'Upload & Index New Doc'}
                                    </label>
                                </div>

                                <div className="space-y-8">
                                    {/* Verification Docs */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                                            <h4 className="font-bold text-gray-900 flex items-center text-lg">
                                                Verification ({project.documents.verification.length})
                                            </h4>
                                        </div>
                                        <div className="space-y-3">
                                            {project.documents.verification.map((doc: ProjectDoc, idx: number) => (
                                                <a
                                                    key={idx}
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <div className="flex-shrink-0 mr-3">
                                                        <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center text-red-600">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-blue-600 group-hover:underline truncate">{doc.name}</p>
                                                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Methodology Docs */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                                            <h4 className="font-bold text-gray-900 flex items-center text-lg">
                                                Methodology and PDD ({project.documents.methodology.length})
                                            </h4>
                                        </div>
                                        <div className="space-y-3">
                                            {project.documents.methodology.map((doc: ProjectDoc, idx: number) => (
                                                <a
                                                    key={idx}
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <div className="flex-shrink-0 mr-3">
                                                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-blue-600 group-hover:underline truncate">{doc.name}</p>
                                                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Supporting Docs */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                                            <h4 className="font-bold text-gray-900 flex items-center text-lg">
                                                Supporting Documentation ({project.documents.supporting.length})
                                            </h4>
                                        </div>
                                        <div className="space-y-3">
                                            {project.documents.supporting.map((doc: ProjectDoc, idx: number) => (
                                                <a
                                                    key={idx}
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <div className="flex-shrink-0 mr-3">
                                                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-600">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-blue-600 group-hover:underline truncate">{doc.name}</p>
                                                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">


                                {/* Verification Details & AI Summary */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white shadow rounded-lg p-6">
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                            <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
                                            Verification Status
                                        </h3>
                                        <dl className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Authority</dt>
                                                <dd className="font-medium text-gray-900">{project.verification.authority}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Standard</dt>
                                                <dd className="font-medium text-gray-900">{project.verification.standard}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Valid Until</dt>
                                                <dd className="font-medium text-gray-900">{project.verification.validity}</dd>
                                            </div>
                                            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                                                <dt className="text-gray-500">Status</dt>
                                                <dd className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    {project.verification.status}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="bg-nature-50 border border-nature-100 rounded-lg p-6">
                                        <h3 className="font-bold text-green-900 mb-4 flex items-center">
                                            <Cpu className="w-5 h-5 mr-2" />
                                            AI-Generated Summary
                                        </h3>
                                        <p className="text-sm text-green-800 leading-relaxed italic mb-3">
                                            "{project.ai_summary}"
                                        </p>
                                        <p className="text-xs text-green-700 font-medium">
                                            *Based on verified audit reports and supporting documents.
                                        </p>
                                    </div>
                                </div>

                                {/* AI Q&A */}
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h3 className="font-bold text-gray-900 mb-4">Ask AI about this project</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Our RAG (Retrieval Augmented Generation) engine answers questions based on the actual audit reports.
                                    </p>

                                    {/* Example Questions */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors">
                                            Does this project protect local wildlife?
                                        </button>
                                        <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors">
                                            What is the survival rate of planted trees?
                                        </button>
                                    </div>

                                    <AIChat projectId={project.id} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN - Purchase Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Purchase Credits</h3>

                            <div className="mb-6">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity (Tonnes of CO2)
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 pl-4"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">tCO2e</span>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    {project.available.toLocaleString()} credits available
                                </p>
                            </div>

                            <div className="border-t border-gray-100 pt-6 mb-6">
                                <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                                    <span>Total Price</span>
                                    <span className="text-2xl">${(quantity * project.price).toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-500 text-right">USD</p>
                            </div>

                            <button
                                onClick={handleBuy}
                                className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-4 px-4 text-base font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex justify-center items-center"
                            >
                                Buy Credits <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                            {/* Hidden wallet connect logic, triggered by Buy button */}

                            <a
                                href={`mailto:${project.contact_email}?subject=${encodeURIComponent(`Inquiry about ${project.name} – Carbon Credits`)}&body=${encodeURIComponent(`Project Name: ${project.name}\nProject Location: ${project.location}\nProject ID: ${project.verification.project_id}\n\nHello,\n\nI am interested in purchasing carbon credits from this project and would like to ask...`)}`}
                                className="w-full mt-3 bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex justify-center items-center"
                            >
                                <Mail className="w-4 h-4 mr-2" /> Contact Project
                            </a>

                            <div className="mt-6 flex items-center justify-center text-xs text-gray-400">
                                <Lock className="w-3 h-3 mr-1" />
                                Secured by Polygon Blockchain
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    );
};

export default ProjectDetails;
