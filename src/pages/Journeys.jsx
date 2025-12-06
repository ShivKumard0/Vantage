import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

// Mock journey data (expanded from existing data)
const mockJourneys = [
    { id: 'j1', name: 'New Customer Onboarding', status: 'active', customersInFlow: 1245, messagesSent: 8945, revenue: 425000, period: 'Last 7 days' },
    { id: 'j2', name: 'Cart Abandonment Recovery', status: 'active', customersInFlow: 845, messagesSent: 2535, revenue: 765000, period: 'Last 7 days' },
    { id: 'j3', name: 'Lapsed Customer Win-back', status: 'active', customersInFlow: 542, messagesSent: 1626, revenue: 285000, period: 'Last 7 days' },
    { id: 'j4', name: 'Post-Purchase Follow-up', status: 'inactive', customersInFlow: 0, messagesSent: 0, revenue: 0, period: 'Inactive' },
    { id: 'j5', name: 'Birthday Campaign', status: 'paused', customersInFlow: 0, messagesSent: 0, revenue: 0, period: 'Paused' },
    { id: 'j6', name: 'Re-engagement Series', status: 'draft', customersInFlow: 0, messagesSent: 0, revenue: 0, period: 'Draft' },
];

function Journeys({ showToast }) {
    const [journeys, setJourneys] = useState(mockJourneys);

    const activeJourneys = journeys.filter(j => j.status === 'active');
    const inactiveJourneys = journeys.filter(j => j.status !== 'active');

    const handleCreateJourney = () => {
        showToast('Opening Journey Builder...', 'success');
    };

    const handleOpenBuilder = () => {
        showToast('Opening Journey Builder Canvas...', 'info');
    };

    const handleJourneyAction = (journey, action) => {
        if (action === 'pause' || action === 'activate') {
            setJourneys(journeys.map(j =>
                j.id === journey.id
                    ? { ...j, status: action === 'pause' ? 'paused' : 'active' }
                    : j
            ));
            showToast(`Journey ${action === 'pause' ? 'paused' : 'activated'}`, 'success');
        } else {
            showToast(`${action} journey: ${journey.name}`, 'info');
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'active': return 'badge-success';
            case 'paused': return 'badge-warning';
            case 'inactive': return 'badge-neutral';
            case 'draft': return 'badge-neutral';
            default: return 'badge-neutral';
        }
    };

    return (
        <>
            <PageHeader
                title="Customer Journeys"
                subtitle="Automate lifecycle engagement and retention"
                action={
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <button className="btn btn-secondary" onClick={handleOpenBuilder}>
                            Journey Builder
                        </button>
                        <button className="btn btn-primary" onClick={handleCreateJourney}>
                            + Create Journey
                        </button>
                    </div>
                }
            />

            {/* Active Journeys */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    Active Journeys
                </h2>
                <div className="grid grid-3">
                    {activeJourneys.map((journey) => (
                        <div key={journey.id} className="card" style={{ background: 'var(--color-bg-card)' }}>
                            <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                                <h3 className="text-lg font-semibold">{journey.name}</h3>
                                <span className={`badge ${getStatusBadgeClass(journey.status)}`}>
                                    {journey.status}
                                </span>
                            </div>

                            <div className="grid grid-2" style={{ gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                                <div>
                                    <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Customers in Flow</div>
                                    <div className="text-2xl font-bold">{journey.customersInFlow.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>{journey.period}</div>
                                    <div className="text-2xl font-bold">{journey.messagesSent.toLocaleString()}</div>
                                    <div className="text-xs text-secondary">messages sent</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Revenue Generated</div>
                                <div className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>
                                    ₹{(journey.revenue / 1000).toFixed(0)}K
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => handleJourneyAction(journey, 'edit')}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => handleJourneyAction(journey, 'pause')}
                                >
                                    ⏸ Pause
                                </button>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => handleJourneyAction(journey, 'analytics')}
                                >
                                    📊 Analytics
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Inactive Journeys */}
            {inactiveJourneys.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        Inactive Journeys
                    </h2>
                    <div className="card">
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Journey Name</th>
                                        <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                        <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inactiveJourneys.map((journey) => (
                                        <tr
                                            key={journey.id}
                                            style={{ borderBottom: '1px solid var(--color-border)' }}
                                        >
                                            <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                                {journey.name}
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)' }}>
                                                <span className={`badge ${getStatusBadgeClass(journey.status)}`}>
                                                    {journey.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: 'var(--spacing-xs)', justifyContent: 'flex-end' }}>
                                                    <button
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => handleJourneyAction(journey, 'edit')}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => handleJourneyAction(journey, 'activate')}
                                                    >
                                                        Activate
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Journeys;
