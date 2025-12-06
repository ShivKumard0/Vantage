import React, { useState } from 'react';
import { activityFeed } from '../data/mockData';

function ActivityFeed() {
    const [filter, setFilter] = useState('all');

    const getIconColor = (type) => {
        switch (type) {
            case 'success':
                return 'var(--color-success)';
            case 'warning':
                return 'var(--color-warning)';
            case 'info':
                return 'var(--color-info)';
            default:
                return 'var(--color-text-muted)';
        }
    };

    const handleActivityClick = (activity) => {
        console.log(`Activity clicked: ${activity.message}`);

        const details = {
            'act-001': 'Campaign Details:\n• Started: Just now\n• Target Audience: 5,240 customers\n• Channels: WhatsApp, SMS\n• Expected reach: 98%',
            'act-002': 'Performance Alert:\n• Campaign: Seasonal Launch\n• Previous CTR: 4.5%\n• Current CTR: 3.6%\n• Recommendation: Review message content and timing',
            'act-003': 'Segment Details:\n• Name: High Intent Shoppers\n• Size: 1,847 customers\n• Criteria: Viewed products 3+ times, added to cart but not purchased\n• Suggested action: Send cart reminder campaign',
            'act-004': 'Journey Performance:\n• Recovery rate: 32%\n• Average cart value: ₹2,450\n• Messages sent: 234\n• Conversion rate: 31%',
            'act-005': 'Team Update:\n• New member: Sarah Johnson\n• Role: Campaign Manager\n• Access level: Editor\n• Onboarding status: In progress',
            'act-006': '🎉 Milestone Achievement!\n• Started with: 10K members\n• Current: 18K members\n• Growth: 80% in 6 months\n• Top tier members: 2,450'
        };

        alert(`${activity.icon} Activity Details\n\n${activity.message}\n${activity.timestamp}\n\n${details[activity.id] || 'No additional details available.'}`);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        console.log(`Activity filter changed to: ${newFilter}`);
    };

    return (
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h2 className="text-xl font-semibold">Notifications & Activity</h2>
                <div className="flex gap-sm">
                    {[
                        { id: 'all', label: 'All' },
                        { id: 'alerts', label: 'Alerts' },
                        { id: 'team', label: 'Team Activity' }
                    ].map((f) => (
                        <button
                            key={f.id}
                            className={`btn btn-sm ${filter === f.id ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleFilterChange(f.id)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card">
                <div className="flex-col gap-md">
                    {activityFeed.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex gap-md"
                            style={{
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--color-bg-secondary)',
                                transition: 'all var(--transition-fast)',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleActivityClick(activity)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--color-bg-hover)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--color-bg-secondary)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <div
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: `${getIconColor(activity.type)}22`,
                                    color: getIconColor(activity.type),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem',
                                    flexShrink: 0,
                                }}
                            >
                                {activity.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="text-sm" style={{ marginBottom: 'var(--spacing-xs)' }}>
                                    {activity.message}
                                </div>
                                <div className="text-xs text-muted">{activity.timestamp}</div>
                            </div>
                            <div style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '1.25rem',
                                opacity: 0,
                                transition: 'opacity var(--transition-fast)'
                            }}
                                className="activity-arrow">
                                →
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .flex.gap-md:hover .activity-arrow {
          opacity: 1;
        }
      `}</style>
        </div>
    );
}

export default ActivityFeed;
