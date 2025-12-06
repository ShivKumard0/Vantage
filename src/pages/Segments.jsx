import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

// Mock segment data
const mockSegments = [
    { id: 's1', name: 'High Value Customers', size: 3245, revenueContribution: 42, health: 'growing', trend: '+8%' },
    { id: 's2', name: 'At-risk / Churn Risk', size: 1245, revenueContribution: 12, health: 'at-risk', trend: '-6%' },
    { id: 's3', name: 'New Customers', size: 5842, revenueContribution: 18, health: 'growing', trend: '+16%' },
    { id: 's4', name: 'Loyal / VIP', size: 2145, revenueContribution: 35, health: 'stabilizing', trend: '+3%' },
    { id: 's5', name: 'Inactive Customers', size: 4580, revenueContribution: 0, health: 'at-risk', trend: '-12%' },
    { id: 's6', name: 'Frequent Buyers', size: 1890, revenueContribution: 28, health: 'growing', trend: '+11%' },
];

function Segments({ showToast }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showCustomerModal, setShowCustomerModal] = useState(false);

    const handleCreateSegment = () => {
        showToast('Opening Segment Builder...', 'success');
    };

    const handleViewSegment = (segment) => {
        showToast(`Viewing segment: ${segment.name}`, 'info');
    };

    const handleTargetSegment = (segment) => {
        showToast(`Creating campaign for ${segment.size.toLocaleString()} customers`, 'success');
    };

    const handleSearchCustomer = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowCustomerModal(true);
            showToast(`Searching for: ${searchQuery}`, 'info');
        }
    };

    const getHealthBadgeClass = (health) => {
        switch (health) {
            case 'growing': return 'badge-success';
            case 'stabilizing': return 'badge-info';
            case 'at-risk': return 'badge-warning';
            default: return 'badge-neutral';
        }
    };

    return (
        <>
            <PageHeader
                title="Customer Segments"
                subtitle="Group customers for targeted campaigns"
                action={
                    <button className="btn btn-primary" onClick={handleCreateSegment}>
                        + Create Segment
                    </button>
                }
            />

            {/* Customer Search */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <form onSubmit={handleSearchCustomer}>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <div className="search-container" style={{ flex: 1, maxWidth: '500px' }}>
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search customers by name, email, or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-secondary">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {/* Segment Cards */}
            <div className="grid grid-3">
                {mockSegments.map((segment) => (
                    <div key={segment.id} className="card" style={{ background: 'var(--color-bg-card)' }}>
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                {segment.name}
                            </h3>
                            <div className="flex-between">
                                <div className="text-secondary text-sm">
                                    {segment.size.toLocaleString()} customers
                                </div>
                                <span className={`badge ${getHealthBadgeClass(segment.health)}`}>
                                    {segment.health}
                                </span>
                            </div>
                        </div>

                        <div style={{
                            marginBottom: 'var(--spacing-lg)',
                            paddingTop: 'var(--spacing-md)',
                            borderTop: '1px solid var(--color-border)'
                        }}>
                            <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>
                                Revenue Contribution
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-sm)' }}>
                                <div className="text-3xl font-bold">{segment.revenueContribution}%</div>
                                <div className={`trend ${segment.trend.startsWith('+') ? 'trend-up' : 'trend-down'}`}>
                                    <span>{segment.trend.startsWith('+') ? '↑' : '↓'}</span>
                                    <span>{segment.trend}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-sm)'
                        }}>
                            <button
                                className="btn btn-sm btn-secondary"
                                style={{ flex: 1 }}
                                onClick={() => handleViewSegment(segment)}
                            >
                                View Segment
                            </button>
                            <button
                                className="btn btn-sm btn-primary"
                                style={{ flex: 1 }}
                                onClick={() => handleTargetSegment(segment)}
                            >
                                Target Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Customer Profile Modal Placeholder */}
            {showCustomerModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                    onClick={() => setShowCustomerModal(false)}
                >
                    <div
                        className="card"
                        style={{
                            maxWidth: '600px',
                            width: '90%',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h2 className="text-xl font-semibold">Customer Profile</h2>
                            <button
                                onClick={() => setShowCustomerModal(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-text-muted)',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    padding: 'var(--spacing-xs)'
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className="text-secondary text-center" style={{ padding: 'var(--spacing-2xl)' }}>
                            Customer profile viewer will be displayed here
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Segments;
