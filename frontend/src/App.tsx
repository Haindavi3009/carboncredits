import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import ProjectDetails from './pages/ProjectDetails';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProjectOwners from './pages/ProjectOwners';
import Explorer from './pages/Explorer';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/project-owners" element={<ProjectOwners />} />
                        <Route path="/explorer/:tx_hash" element={<Explorer />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
