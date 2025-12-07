import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

// Mock PM analytics data
const velocityData = [
    { sprint: 'Sprint 20', points: 35, completed: 32 },
    { sprint: 'Sprint 21', points: 38, completed: 38 },
    { sprint: 'Sprint 22', points: 40, completed: 35 },
    { sprint: 'Sprint 23', points: 42, completed: 42 },
    { sprint: 'Sprint 24', points: 45, completed: 40 },
];

const resourceUtilization = [
    { role: 'Developers', allocated: 85, capacity: 100 },
    { role: 'Designers', allocated: 95, capacity: 100 },
    { role: 'QA', allocated: 60, capacity: 100 },
    { role: 'Product', allocated: 75, capacity: 100 },
];

function Reports({ showToast, dateRange }) {
    const handleExportPDF = () => {
        showToast('Exporting report as PDF...', 'success');
    };

    const handleExportExcel = () => {
        showToast('Exporting data as Excel...', 'success');
    };

    const maxPoints = Math.max(...velocityData.map(d => d.points));

    return (
        <>
            <PageHeader
                title="Reports & Analytics"
                subtitle="Track team velocity, burn-down, and resource utilization"
                action={
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <button className="btn btn-secondary" onClick={handleExportPDF}>
                            📄 Export PDF
                        </button>
                        <button className="btn btn-secondary" onClick={handleExportExcel}>
                            📊 Export Excel
                        </button>
                    </div>
                }
            />

            {/* Velocity Chart */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    Sprint Velocity
                </h2>

                <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    {velocityData.map((item) => (
                        <div key={item.sprint} style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <div className="flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                <span className="text-sm font-semibold">{item.sprint}</span>
                                <span className="text-sm font-semibold">{item.completed} / {item.points} pts</span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '32px',
                                background: 'var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                {/* Planned Points (Background Bar) */}
                                <div
                                    style={{
                                        height: '100%',
                                        width: `${(item.points / maxPoints) * 100}%`,
                                        background: 'rgba(99, 102, 241, 0.2)',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                ></div>
                                {/* Completed Points (Foreground Bar) */}
                                <div
                                    style={{
                                        height: '100%',
                                        width: `${(item.completed / maxPoints) * 100}%`,
                                        background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingLeft: 'var(--spacing-md)',
                                        color: 'white',
                                        fontSize: 'var(--font-size-xs)',
                                        fontWeight: 'var(--font-weight-semibold)',
                                        transition: 'width var(--transition-base)',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Resource Utilization */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    Resource Utilization by Role
                </h2>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Role</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Utilization</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resourceUtilization.map((res) => (
                                <tr key={res.role} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                        {res.role}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                            <div style={{ flex: 1, height: '8px', background: '#eee', borderRadius: '4px', maxWidth: '200px' }}>
                                                <div style={{
                                                    width: `${res.allocated}%`,
                                                    height: '100%',
                                                    background: res.allocated > 90 ? 'var(--color-error)' : 'var(--color-success)',
                                                    borderRadius: '4px'
                                                }}></div>
                                            </div>
                                            <span className="text-sm font-semibold">{res.allocated}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                        <span className={`badge ${res.allocated > 90 ? 'badge-error' : 'badge-success'}`}>
                                            {res.allocated > 90 ? 'Overloaded' : 'Optimal'}
                                        </span>
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

export default Reports;
