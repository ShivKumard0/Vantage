import React, { useState } from 'react';
import { customerSegments } from '../data/mockData';

function SegmentSnapshot({ showToast }) {
    const [segments, setSegments] = useState(customerSegments);
    const [expandedSegment, setExpandedSegment] = useState(null);

    const handleCreateSegment = () => {
        showToast('Opening Segment Builder...', 'info');
    };

    const handleViewSegment = (e, segment) => {
        e.stopPropagation();
        setExpandedSegment(expandedSegment === segment.id ? null : segment.id);
    };

    const handleTargetSegment = (e, segment) => {
        e.stopPropagation();
        showToast(`Creating campaign for ${segment.size.toLocaleString()} customers`, 'success');
    };

    return (
        <div className="card" style={{ height: 'fit-content' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="text-xl font-semibold">Customer Segments</h2>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={handleCreateSegment}
                >
                    + Create Segment
                </button>
            </div>

            <div className="flex-col" style={{ gap: 'var(--spacing-lg)' }}>
                {segments.map((segment) => (
                    <div
                        key={segment.id}
                        className="card"
                        onClick={(e) => handleViewSegment(e, segment)}
                        style={{
                            background: 'var(--color-bg-secondary)',
                            border: `1px solid ${expandedSegment === segment.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            cursor: 'pointer',
                            transition: 'all var(--transition-base)',
                            padding: 'var(--spacing-lg)',
                        }}
                    >
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                            <div>
                                <h3 className="text-md font-semibold">{segment.name}</h3>
                                <div className="text-sm text-secondary" style={{ marginTop: 'var(--spacing-xs)' }}>
                                    {segment.size.toLocaleString()} customers
                                </div>
                            </div>
                            <div className={`trend trend-${segment.trend === 'growing' ? 'up' : segment.trend === 'shrinking' ? 'down' : 'neutral'}`}>
                                <span>{segment.trend === 'growing' ? '↑' : segment.trend === 'shrinking' ? '↓' : '→'}</span>
                                <span>{segment.trendValue}</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-lg)',
                            paddingTop: 'var(--spacing-md)',
                            borderTop: '1px solid var(--color-border)',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{ flex: 1, minWidth: '120px' }}>
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Revenue Contribution</div>
                                <div className="text-xl font-bold">{segment.revenueContribution}%</div>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={(e) => handleViewSegment(e, segment)}
                                >
                                    View Segment
                                </button>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={(e) => handleTargetSegment(e, segment)}
                                >
                                    Target Now
                                </button>
                            </div>
                        </div>

                        {expandedSegment === segment.id && (
                            <div
                                style={{
                                    marginTop: 'var(--spacing-lg)',
                                    paddingTop: 'var(--spacing-lg)',
                                    borderTop: '1px solid var(--color-border)',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}
                            >
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-md)' }}>
                                    Segment Characteristics
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', marginBottom: 'var(--spacing-lg)' }}>
                                    <div className="badge badge-neutral">High Engagement</div>
                                    <div className="badge badge-neutral">Email Responsive</div>
                                    <div className="badge badge-neutral">AOV: ₹2,450</div>
                                    <div className="badge badge-neutral">Active: 30 days</div>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Editing segment criteria...', 'info');
                                        }}
                                    >
                                        ✏️ Edit Criteria
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Exporting customer list...', 'info');
                                        }}
                                    >
                                        📥 Export List
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Viewing segment analytics...', 'info');
                                        }}
                                    >
                                        📊 View Analytics
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

export default SegmentSnapshot;
