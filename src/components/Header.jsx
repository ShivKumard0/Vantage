import React, { useState } from 'react';
import { dateRanges, accounts } from '../data/mockData';
import AlertCenter from './AlertCenter';

function Header({ dateRange, onDateRangeChange, onMobileMenuToggle }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showAlerts, setShowAlerts] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log(`Searching for: ${searchQuery}`);
            alert(`🔍 Search Results for "${searchQuery}"\n\nFound in:\n• 3 Projects\n• 5 Tasks\n• 1 Risk\n• 2 Team Members\n\nTop Result:\nProject: "Mobile App Redesign"\nStatus: In Progress\nPriority: High`);
            setSearchQuery('');
        }
    };

    const handleAccountChange = (e) => {
        const selectedAccount = accounts.find(acc => acc.id === e.target.value);
        console.log(`Account switched to: ${selectedAccount?.name}`);
        alert(`🏪 Switched to ${selectedAccount?.name}\n\nAccount Details:\n• Active Projects: 8\n• Total Team Size: 24\n• Monthly Budget: $120k\n• Last Activity: 5 mins ago\n\nLoading account data...`);
    };

    const handleDateRangeChange = (e) => {
        const newRange = e.target.value;
        onDateRangeChange(newRange);
        console.log(`Date range changed to: ${newRange}`);
    };

    const handleProfileAction = (action) => {
        console.log(`Profile action: ${action}`);

        const messages = {
            profile: '👤 User Profile\n\nName: Admin User\nEmail: admin@vantage.com\nRole: Project Manager\nLast Login: Today at 9:45 AM\n\nEdit profile settings',
            settings: '⚙️ Account Settings\n\nQuick Settings:\n• Notification preferences\n• Team management\n• Billing & subscription\n• API keys\n• Data export\n• Security settings',
            logout: '🚪 Logout\n\nAre you sure you want to logout?\n\nYour  work is automatically saved.\n\n(This is a demo - clicking OK would log you out)'
        };

        alert(messages[action]);
        setShowDropdown(false);
    };

    return (
        <header className="header">
            <div className="header-left">
                <button
                    className="sidebar-toggle mobile-menu-btn"
                    onClick={onMobileMenuToggle}
                    style={{
                        display: 'none',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        padding: 'var(--spacing-sm)',
                        fontSize: '1.25rem'
                    }}
                >
                    ☰
                </button>

                <div className="account-selector">
                    <select defaultValue="acc-001" onChange={handleAccountChange}>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="date-range-filter">
                    <select
                        value={dateRange}
                        onChange={handleDateRangeChange}
                    >
                        {dateRanges.map((range) => (
                            <option key={range.id} value={range.label}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="search-container">
                    <form onSubmit={handleSearch}>
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search projects, tasks, team..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>
            </div>

            <div className="header-right">
                {/* Alert Bell */}
                <div style={{ position: 'relative', marginRight: 'var(--spacing-md)' }}>
                    <button
                        onClick={() => setShowAlerts(!showAlerts)}
                        style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' }}
                    >
                        🔔
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            background: 'var(--color-warning)',
                            color: 'white',
                            fontSize: '0.6rem',
                            padding: '2px 5px',
                            borderRadius: '10px',
                            fontWeight: 'bold'
                        }}>4</span>
                    </button>
                    {showAlerts && <AlertCenter showToast={(msg) => alert(msg)} onClose={() => setShowAlerts(false)} />}
                </div>

                <div className="user-menu">
                    <div
                        className="user-avatar"
                        title="User menu"
                        onClick={() => setShowDropdown(!showDropdown)}
                        style={{ cursor: 'pointer' }}
                    >
                        AM
                    </div>
                    <div
                        className="dropdown"
                        style={{
                            opacity: showDropdown ? 1 : 0,
                            visibility: showDropdown ? 'visible' : 'hidden',
                            transform: showDropdown ? 'translateY(0)' : 'translateY(-10px)'
                        }}
                    >
                        <button
                            className="dropdown-item"
                            onClick={() => handleProfileAction('profile')}
                        >
                            <span>👤</span>
                            <span>Profile</span>
                        </button>
                        <button
                            className="dropdown-item"
                            onClick={() => handleProfileAction('settings')}
                        >
                            <span>⚙️</span>
                            <span>Settings</span>
                        </button>
                        <div className="dropdown-divider"></div>
                        <button
                            className="dropdown-item"
                            onClick={() => handleProfileAction('logout')}
                        >
                            <span>🚪</span>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
        </header>
    );
}

export default Header;
