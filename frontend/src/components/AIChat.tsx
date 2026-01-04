import React, { useState } from 'react';

interface Props {
    projectId: string;
}

const AIChat: React.FC<Props> = ({ projectId }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:8000/ai/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project_id: projectId, query: userMsg })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Failed to fetch AI response');
            }

            const data = await res.json();
            const aiResponse = data.answer || "No response generated.";

            setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
        } catch (e: any) {
            console.error(e);
            setMessages(prev => [...prev, { role: 'ai', content: `Error: ${e.message}` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border rounded-lg shadow-sm p-4 h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.length === 0 && (
                    <div className="text-gray-400 text-center mt-10">
                        Ask about this project's impact, certifications, or SDGs.
                    </div>
                )}
                {messages.map((m, idx) => (
                    <div key={idx} className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user'
                        ? 'bg-green-100 text-green-900 ml-auto'
                        : 'bg-gray-100 text-gray-900 mr-auto'
                        }`}>
                        <p className="text-sm">{m.content}</p>
                    </div>
                ))}
                {loading && (
                    <div className="text-sm text-gray-500 italic">AI is analyzing documents...</div>
                )}
            </div>
            <div className="flex gap-2">
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-md transition-colors flex items-center justify-center" title="Upload document for analysis">
                    <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setMessages(prev => [...prev, { role: 'user', content: `[Uploaded File: ${file.name}]` }]);
                                setTimeout(() => {
                                    setMessages(prev => [...prev, { role: 'ai', content: `I've received '${file.name}'. I'm analyzing its contents... (Simulation)` }]);
                                }, 800);
                            }
                        }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                </label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask AI or upload documents..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button
                    onClick={handleSend}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default AIChat;
