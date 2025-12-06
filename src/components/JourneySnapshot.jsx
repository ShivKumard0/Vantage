import React, { useState } from 'react';
import { customerJourneys } from '../data/mockData';

function JourneySnapshot({ showToast }) {
    const [journeys, setJourneys] = useState(customerJourneys);
    const [expandedJourney, setExpandedJourney] = useState(null);

    const handleCreateJourney = () => {
        showToast('Opening Journey Builder...', 'info');
    };

    const handleJourneyClick = (journey) => {
        setExpandedJourney(expandedJourney === journey.id ? null : journey.id);
    };

    const toggleJourneyStatus = (e, journeyId) => {
        e.stopPropagation();
        setJourneys(journeys.map(j => {
            if (j.id === journeyId) {
                const newStatus = j.status === 'active' ? 'inactive' : 'active';
                showToast(
                    newStatus === 'active' ? 'Journey activated' : 'Journey paused',
                    newStatus === 'active' ? 'success' : 'warning'
                );
                return { ...j, status: newStatus };
            }
            return j;
        }));
    };

    return (
        <div className="card" style={{ height: 'fit-content' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="text-xl font-semibold">Customer Journeys</h2>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={handleCreateJourney}
                >
                    + Create Journey
                </button>
            </div>

            <div className="flex-col" style={{ gap: 'var(--spacing-lg)' }}>
                {journeys.map((journey) => (
                    <div
                        key={journey.id}
                        className="card"
                        onClick={() => handleJourneyClick(journey)}
                        style={{
                            background: 'var(--color-bg-secondary)',
                            border: `1px solid ${expandedJourney === journey.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            cursor: 'pointer',
                            transition: 'all var(--transition-base)',
                            padding: 'var(--spacing-lg)',
                        }}
                    >
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                            <h3 className="text-md font-semibold">{journey.name}</h3>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                                <span className={`badge ${journey.status === 'active' ? 'badge-success' : 'badge-neutral'}`}>
                                    {journey.status}
                                </span>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={(e) => toggleJourneyStatus(e, journey.id)}
                                    style={{
                                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                                        minWidth: '32px',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {journey.status === 'active' ? '⏸' : '▶'}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-3" style={{ gap: 'var(--spacing-lg)' }}>
                            <div>
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Customers in Flow</div>
                                <div className="text-lg font-semibold">{journey.customersInFlow.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>{journey.period}</div>
                                <div className="text-lg font-semibold">{journey.messagesSent.toLocaleString()}</div>
                                <div className="text-xs text-secondary">messages sent</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Revenue Generated</div>
                                <div className="text-lg font-semibold" style={{ color: 'var(--color-success)' }}>
                                    ₹{(journey.revenue / 1000).toFixed(0)}K
                                </div>
                            </div>
                        </div>

                        {expandedJourney === journey.id && (
                            <div
                                style={{
                                    marginTop: 'var(--spacing-lg)',
                                    paddingTop: 'var(--spacing-lg)',
                                    borderTop: '1px solid var(--color-border)',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}
                            >
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Opening journey editor...', 'info');
                                        }}
                                    >
                                        ✏️ Edit Flow
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Viewing customer list...', 'info');
                                        }}
                                    >
                                        👥 View Customers
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Exporting analytics...', 'info');
                                        }}
                                    >
                                        📊 Analytics
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JourneySnapshot;
