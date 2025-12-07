import React from 'react';

// Mock recommendations data
const recommendations = [
    {
        id: 'r1',
        title: 'Mitigate Critical Risk on Cloud Migration',
        type: 'Risk',
        impact: 'Prevent 2 week delay',
        urgency: 'high',
        icon: '🚨'
    },
    {
        id: 'r2',
        title: 'Reallocate Resources to Mobile App',
        type: 'Resourcing',
        impact: 'Accelerate delivery by 15%',
        urgency: 'medium',
        icon: '👥'
    },
    {
        id: 'r3',
        title: 'Schedule Sprint Retrospective',
        type: 'Process',
        impact: 'Improve team velocity',
        urgency: 'low',
        icon: '📅'
    }
];

function SmartRecommendations({ showToast }) {
    const handleAction = (rec) => {
        showToast(`Initiating action: ${rec.title}`, 'success');
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'high': return 'var(--color-warning)'; // Using warning color for high urgency/alert
            case 'medium': return 'var(--color-info)';
            case 'low': return 'var(--color-success)';
            default: return 'var(--color-text-muted)';
        }
    };

    return (
        <div className="card" style={{ marginBottom: 'var(--spacing-2xl)', borderLeft: '4px solid var(--color-primary)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h3 className="text-lg font-semibold">⚡ Next Best Actions</h3>
                    <p className="text-sm text-muted">AI-driven recommendations to drive growth</p>
                </div>
                <span className="badge badge-neutral">Updated 5m ago</span>
            </div>

            <div className="grid grid-3">
                {recommendations.map((rec) => (
                    <div
                        key={rec.id}
                        style={{
                            padding: 'var(--spacing-md)',
                            background: 'var(--color-bg-secondary)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            border: '1px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'transparent';
                        }}
                        onClick={() => handleAction(rec)}
                    >
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <span style={{ fontSize: '1.5rem' }}>{rec.icon}</span>
                            <span
                                className="badge"
                                style={{
                                    fontSize: '0.7rem',
                                    background: getUrgencyColor(rec.urgency),
                                    color: 'white',
                                    padding: '2px 6px'
                                }}
                            >
                                {rec.urgency.toUpperCase()}
                            </span>
                        </div>

                        <div style={{ fontWeight: '600', marginBottom: 'var(--spacing-xs)', fontSize: '0.95rem' }}>
                            {rec.title}
                        </div>

                        <div style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: '500' }}>
                            📈 {rec.impact}
                        </div>

                        <div style={{ marginTop: 'var(--spacing-md)', fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: '600' }}>
                            Launch Action →
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SmartRecommendations;
