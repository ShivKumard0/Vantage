import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

// Mock analytics data
const revenueData = [
    { channel: 'WhatsApp', revenue: 425000, conversions: 1245 },
    { channel: 'Email', revenue: 285000, conversions: 892 },
    { channel: 'SMS', revenue: 198000, conversions: 654 },
    { channel: 'Push', revenue: 145000, conversions: 421 },
    { channel: 'RCS', revenue: 89000, conversions: 245 },
];

const channelPerformance = [
    { channel: 'WhatsApp', ctr: 4.8, conversion: 3.2, roi: 4.5 },
    { channel: 'Email', ctr: 3.6, conversion: 2.1, roi: 3.2 },
    { channel: 'SMS', ctr: 6.2, conversion: 4.5, roi: 5.1 },
    { channel: 'Push', ctr: 2.8, conversion: 1.5, roi: 2.3 },
    { channel: 'RCS', ctr: 5.1, conversion: 3.8, roi: 4.2 },
];

function Analytics({ showToast, dateRange }) {
    const [filterChannel, setFilterChannel] = useState('all');

    const handleExportPDF = () => {
        showToast('Exporting report as PDF...', 'info');
    };

    const handleExportExcel = () => {
        showToast('Exporting data as Excel...', 'info');
    };

    const handleScheduleReport = () => {
        showToast('Opening report scheduling...', 'info');
    };

    const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

    return (
        <>
            <PageHeader
                title="Marketing Analytics"
                subtitle="ROI analysis and customer behavior intelligence"
                action={
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <button className="btn btn-secondary" onClick={handleExportPDF}>
                            📄 Export PDF
                        </button>
                        <button className="btn btn-secondary" onClick={handleExportExcel}>
                            📊 Export Excel
                        </button>
                        <button className="btn btn-primary" onClick={handleScheduleReport}>
                            📅 Schedule Report
                        </button>
                    </div>
                }
            />

            {/* Filters */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <label className="text-sm text-muted">Date Range:</label>
                        <div className="badge badge-info">{dateRange}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <label className="text-sm text-muted">Channel:</label>
                        <select value={filterChannel} onChange={(e) => setFilterChannel(e.target.value)}>
                            <option value="all">All Channels</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Email">Email</option>
                            <option value="SMS">SMS</option>
                            <option value="Push">Push</option>
                            <option value="RCS">RCS</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Revenue Attribution Chart */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    Revenue Attribution by Channel
                </h2>

                <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    {revenueData.map((item) => (
                        <div key={item.channel} style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <div className="flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                <span className="text-sm font-semibold">{item.channel}</span>
                                <span className="text-sm font-semibold">₹{(item.revenue / 1000).toFixed(0)}K</span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '32px',
                                background: 'var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden'
                            }}>
                                <div
                                    style={{
                                        height: '100%',
                                        width: `${(item.revenue / maxRevenue) * 100}%`,
                                        background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingLeft: 'var(--spacing-md)',
                                        color: 'white',
                                        fontSize: 'var(--font-size-xs)',
                                        fontWeight: 'var(--font-weight-semibold)',
                                        transition: 'width var(--transition-base)'
                                    }}
                                >
                                    {item.conversions} conversions
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Channel Performance Comparison */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    Channel Performance Comparison
                </h2>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Channel</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>CTR</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Conversion Rate</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>ROI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {channelPerformance.map((channel) => (
                                <tr
                                    key={channel.channel}
                                    style={{ borderBottom: '1px solid var(--color-border)' }}
                                >
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                        {channel.channel}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-success)' }}>
                                        {channel.ctr}%
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-success)' }}>
                                        {channel.conversion}%
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', fontWeight: 'var(--font-weight-semibold)' }}>
                                        {channel.roi}x
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cohort Retention (Placeholder) */}
            <div className="card">
                <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    Cohort Retention Analysis
                </h2>
                <div style={{
                    padding: 'var(--spacing-2xl)',
                    textAlign: 'center',
                    background: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-lg)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📊</div>
                    <div className="text-muted">Cohort retention visualization coming soon</div>
                </div>
            </div>
        </>
    );
}

export default Analytics;
