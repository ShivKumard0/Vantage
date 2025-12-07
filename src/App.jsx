import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './components/Layout.css';
import Layout from './components/Layout';
import Toast from './components/Toast';


// Pages
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Team from './pages/Team';
import Risks from './pages/Risks';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
    const [dateRange, setDateRange] = useState('Last 30 days');
    const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

    const showToast = (message, type = 'info') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000);
    };

    return (
        <BrowserRouter>
            <Layout dateRange={dateRange} onDateRangeChange={setDateRange} showToast={showToast}>

                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard dateRange={dateRange} showToast={showToast} />} />
                    <Route path="/projects" element={<Projects showToast={showToast} />} />
                    <Route path="/tasks" element={<Tasks showToast={showToast} />} />
                    <Route path="/team" element={<Team showToast={showToast} />} />
                    <Route path="/risks" element={<Risks showToast={showToast} />} />
                    <Route path="/reports" element={<Reports showToast={showToast} dateRange={dateRange} />} />
                    <Route path="/settings" element={<Settings showToast={showToast} />} />
                </Routes>
            </Layout>

            {toast.show && <Toast message={toast.message} type={toast.type} />}
        </BrowserRouter>
    );
}

export default App;
