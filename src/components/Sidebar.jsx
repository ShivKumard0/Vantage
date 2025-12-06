import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
    const location = useLocation();

    const navigation = [
        { icon: '📊', label: 'Dashboard', path: '/dashboard' },
        { icon: '📢', label: 'Campaigns', path: '/campaigns' },
        { icon: '🛤️', label: 'Journeys / Automation', path: '/journeys' },
        { icon: '👥', label: 'Segments / CRM', path: '/segments' },
        { icon: '🎁', label: 'Loyalty & Offers', path: '/loyalty' },
        { icon: '📈', label: 'Analytics & Reports', path: '/analytics' },
        { icon: '⚙️', label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            {/* Slider Handle for easier reopening */}
            <div
                className="sidebar-slider-handle"
                onClick={onToggle}
                title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
                <div className="handle-indicator"></div>
            </div>

            <div style={{ overflowX: 'hidden', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <div className="sidebar-logo-icon">X</div>
                        <span className="sidebar-logo-text">Xeno</span>
                    </div>
                    <button className="sidebar-toggle" onClick={onToggle} title="Toggle sidebar">
                        {collapsed ? '→' : '←'}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <div className="nav-section-title">Main</div>
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`nav-item ${isActive ? 'active' : ''}`}
                                    onClick={() => {
                                        if (mobileOpen) onMobileClose();
                                    }}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-label">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
