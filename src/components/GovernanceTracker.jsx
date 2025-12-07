import React, { useState } from 'react';

function GovernanceTracker({ showToast }) {
    const [complianceItems, setComplianceItems] = useState([
        { id: 1, name: 'GDPR Compliance', status: 'Approved', date: '2024-10-15', owner: 'Legal Team' },
        { id: 2, name: 'Security Review', status: 'Pending', date: '2024-12-10', owner: 'InfoSec' },
        { id: 3, name: 'Budget Approval', status: 'Approved', date: '2024-11-01', owner: 'Finance' },
        { id: 4, name: 'Architecture Sign-off', status: 'Rejected', date: '2024-12-05', owner: 'CTO Office' },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'var(--color-success)';
            case 'Pending': return 'var(--color-warning)';
            case 'Rejected': return 'var(--color-danger)';
            default: return 'var(--color-text-muted)';
        }
    };

    const handleRequestApproval = (item) => {
        showToast(`Approval requested for ${item.name}`, 'info');
    };

    return (
        <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h3 className="text-lg font-semibold">Governance & Compliance</h3>
                    <p className="text-sm text-muted">Project Gate Reviews</p>
                </div>
                <button className="btn btn-sm btn-secondary" onClick={() => showToast('Refreshing compliance status...', 'info')}>
                    🔄 Refresh
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                            <th style={{ padding: 'var(--spacing-sm)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Requirement</th>
                            <th style={{ padding: 'var(--spacing-sm)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Status</th>
                            <th style={{ padding: 'var(--spacing-sm)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Owner</th>
                            <th style={{ padding: 'var(--spacing-sm)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Date</th>
                            <th style={{ padding: 'var(--spacing-sm)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complianceItems.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontWeight: '500' }}>{item.name}</td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)' }}>
                                    <span className="badge" style={{
                                        background: `${getStatusColor(item.status)}20`,
                                        color: getStatusColor(item.status),
                                        border: `1px solid ${getStatusColor(item.status)}40`
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: '0.9rem' }}>{item.owner}</td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{item.date}</td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)' }}>
                                    {item.status !== 'Approved' && (
                                        <button
                                            className="btn btn-xs btn-primary"
                                            onClick={() => handleRequestApproval(item)}
                                        >
                                            Request
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GovernanceTracker;
