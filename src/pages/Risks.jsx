import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { risksList } from '../data/mockData';

function Risks({ showToast }) {
    const handleLogRisk = () => {
        showToast('Opening Risk Logger...', 'success');
    };

    const handleRiskAction = (risk, action) => {
        showToast(`${action} risk: ${risk.description}`, 'info');
    };

    return (
        <>
            <PageHeader
                title="Risks & Issues"
                subtitle="Identify, track, and mitigate project risks"
                action={
                    <button className="btn btn-primary" onClick={handleLogRisk}>
                        + Log Risk
                    </button>
                }
            />

            {/* Risk Matrix Placeholder */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>Risk Matrix</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', maxWidth: '600px', margin: '0 auto' }}>
                    {/* High Impact Row */}
                    <div style={{ background: '#fecaca', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>Low Prob / High Imp</div>
                    <div style={{ background: '#fca5a5', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>Med Prob / High Imp</div>
                    <div style={{ background: '#ef4444', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff', color: 'white', fontWeight: 'bold' }}>High Prob / High Imp</div>

                    {/* Medium Impact Row */}
                    <div style={{ background: '#fed7aa', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>Low Prob / Med Imp</div>
                    <div style={{ background: '#fdba74', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>Med Prob / Med Imp</div>
                    <div style={{ background: '#fca5a5', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>High Prob / Med Imp</div>

                    {/* Low Impact Row */}
                    <div style={{ background: '#bbf7d0', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>Low Prob / Low Imp</div>
                    <div style={{ background: '#fed7aa', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>Med Prob / Low Imp</div>
                    <div style={{ background: '#fecaca', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>High Prob / Low Imp</div>
                </div>
                <div style={{ textAlign: 'center', marginTop: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
                    Risk Heatmap (Probability vs Impact)
                </div>
            </div>

            {/* Risk Register */}
            <div className="card">
                <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>Risk Register</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Description</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Impact</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Probability</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Owner</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Mitigation</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {risksList.map((risk) => (
                                <tr key={risk.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                        {risk.description}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)' }}>
                                        <span className={`badge ${risk.impact === 'High' ? 'badge-error' : risk.impact === 'Medium' ? 'badge-warning' : 'badge-neutral'}`}>
                                            {risk.impact}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)' }}>
                                        <span className={`badge ${risk.probability === 'High' ? 'badge-error' : risk.probability === 'Medium' ? 'badge-warning' : 'badge-neutral'}`}>
                                            {risk.probability}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
                                        {risk.status}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                        {risk.owner}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {risk.mitigation}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() => handleRiskAction(risk, 'edit')}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Risks;
