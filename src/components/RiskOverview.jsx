import React from 'react';
import { useSimulation } from '../context/SimulationContext';

function RiskOverview({ showToast }) {
    const { risks } = useSimulation();

    const handleLogRisk = () => {
        showToast('Opening Risk Logger...', 'info');
    };

    const handleRiskClick = (risk) => {
        showToast(`Viewing risk: ${risk.description}`, 'info');
    };

    return (
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h2 className="text-xl font-semibold">Risk Register</h2>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={handleLogRisk}
                >
                    + Log Risk
                </button>
            </div>

            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Description</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Impact</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Probability</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {risks.map((risk) => (
                                <tr
                                    key={risk.id}
                                    style={{
                                        borderBottom: '1px solid var(--color-border)',
                                        transition: 'background var(--transition-fast)',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleRiskClick(risk)}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                        {risk.description}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)' }}>
                                        <span className={`badge ${risk.impact === 'High' ? 'badge-error' : risk.impact === 'Medium' ? 'badge-warning' : 'badge-neutral'}`}>
                                            {risk.impact}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)' }}>
                                        <span className={`badge ${risk.probability === 'High' ? 'badge-error' : risk.probability === 'Medium' ? 'badge-warning' : 'badge-neutral'}`}>
                                            {risk.probability}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)' }}>
                                        {risk.status}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                        {risk.owner}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RiskOverview;
