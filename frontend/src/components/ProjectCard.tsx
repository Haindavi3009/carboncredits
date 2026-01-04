import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
    id: string;
    name: string;
    category: string;
    location: string;
    price_per_credit: number;
    available_credits: number;
    sdg_count: number;
    verified: boolean;
}

interface Props {
    project: Project;
    onCompare?: (id: string, selected: boolean) => void;
    isSelected?: boolean;
}

const ProjectCard: React.FC<Props> = ({ project, onCompare, isSelected = false }) => {
    // AI-driven label logic (simulated decision intelligence)
    const getAiLabel = () => {
        if (project.sdg_count >= 5) return { text: "High Impact per Credit", color: "text-purple-600 bg-purple-50" };
        if (project.price_per_credit <= 12) return { text: "Low-Cost Offset Option", color: "text-blue-600 bg-blue-50" };
        return { text: "Balanced Price & Impact", color: "text-orange-600 bg-orange-50" };
    };

    const aiLabel = getAiLabel();

    return (
        <div className={`bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 border ${isSelected ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-100'} flex flex-col h-full relative`}>

            {/* Compare Checkbox - Top Right */}
            {onCompare && (
                <div className="absolute top-3 right-3 z-10">
                    <label className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm cursor-pointer border border-gray-200 hover:bg-gray-50">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => onCompare(project.id, e.target.checked)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="text-xs font-medium text-gray-600">Compare</span>
                    </label>
                </div>
            )}

            <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${project.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {project.verified ? '✔ Verified' : 'Unverified'}
                    </span>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide pr-2">
                        {project.category}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate" title={project.name}>
                    {project.name}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="mr-2">📍 {project.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span title="Sustainable Development Goals">
                        🎯 {project.sdg_count} SDGs
                    </span>
                    <span>
                        📦 {project.available_credits.toLocaleString()} avail.
                    </span>
                </div>
            </div>

            <div className="bg-gray-50 px-5 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 uppercase font-semibold">Price</span>
                    <span className="text-lg font-bold text-green-700">${project.price_per_credit.toFixed(2)}</span>
                </div>

                {/* AI Value Label */}
                <div className={`text-xs font-bold px-2 py-1 rounded mb-4 inline-block ${aiLabel.color}`}>
                    ✨ AI: {aiLabel.text}
                </div>

                <Link to={`/projects/${project.id}`} className="block w-full text-center bg-white border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
