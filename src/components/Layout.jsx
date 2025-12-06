import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children, dateRange, onDateRangeChange }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className={`layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                mobileOpen={mobileMenuOpen}
                onMobileClose={() => setMobileMenuOpen(false)}
            />

            <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <Header
                    dateRange={dateRange}
                    onDateRangeChange={onDateRangeChange}
                    onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                />

                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
