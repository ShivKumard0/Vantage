import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './components/Layout.css';
import Layout from './components/Layout';
import Toast from './components/Toast';
import OnboardingWizard from './components/OnboardingWizard';

// Pages
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Journeys from './pages/Journeys';
import Segments from './pages/Segments';
import Loyalty from './pages/Loyalty';
import Analytics from './pages/Analytics';
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
                <OnboardingWizard showToast={showToast} />
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard dateRange={dateRange} showToast={showToast} />} />
                    <Route path="/campaigns" element={<Campaigns showToast={showToast} />} />
                    <Route path="/journeys" element={<Journeys showToast={showToast} />} />
                    <Route path="/segments" element={<Segments showToast={showToast} />} />
                    <Route path="/loyalty" element={<Loyalty showToast={showToast} />} />
                    <Route path="/analytics" element={<Analytics showToast={showToast} dateRange={dateRange} />} />
                    <Route path="/settings" element={<Settings showToast={showToast} />} />
                </Routes>
            </Layout>

            {toast.show && <Toast message={toast.message} type={toast.type} />}
        </HashRouter>
    );
}

export default App;
