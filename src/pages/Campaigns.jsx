import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import TabNav from '../components/TabNav';

// Mock campaign data
const mockCampaigns = [
    { id: 'c1', name: 'Weekend Flash Sale', status: 'live', channel: 'WhatsApp', ctr: 4.8, conversion: 3.2, revenue: 125000, goal: 'sales' },
    { id: 'c2', name: 'Summer Launch Campaign', status: 'live', channel: 'Email', ctr: 3.6, conversion: 2.1, revenue: 89000, goal: 'awareness' },
    { id: 'c3', name: 'Abandoned Cart Recovery', status: 'live', channel: 'SMS', ctr: 6.2, conversion: 4.5, revenue: 156000, goal: 'retention' },
    { id: 'c4', name: 'New Product Announcement', status: 'scheduled', channel: 'WhatsApp', ctr: 0, conversion: 0, revenue: 0, goal: 'awareness' },
    { id: 'c5', name: 'Customer Win-back', status: 'draft', channel: 'Email', ctr: 0, conversion: 0, revenue: 0, goal: 'retention' },
    { id: 'c6', name: 'Loyalty Program Launch', status: 'completed', channel: 'Multi-channel', ctr: 5.2, conversion: 3.8, revenue: 245000, goal: 'engagement' },
];

// Mock experiments data
const experiments = [
    { id: 'exp1', name: 'Subject Line Test: Summer Sale', status: 'active', variants: 2, traffic: '50/50', winner: 'Pending', ctr: { A: 2.4, B: 3.1 }, revenue: { A: 12000, B: 15400 } },
    { id: 'exp2', name: 'CTA Color: Green vs Blue', status: 'completed', variants: 2, traffic: '50/50', winner: 'Variant A (Green)', ctr: { A: 4.2, B: 2.8 }, revenue: { A: 45000, B: 28000 } },
];

import CollaborationPanel from '../components/CollaborationPanel';

function Campaigns({ showToast }) {
    const [activeTab, setActiveTab] = useState('all');
    const [filterChannel, setFilterChannel] = useState('all');
    const [filterGoal, setFilterGoal] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showCollaboration, setShowCollaboration] = useState(false);

    const tabs = [
        { id: 'all', label: 'All Campaigns', count: mockCampaigns.length },
        { id: 'whatsapp', label: 'WhatsApp', count: mockCampaigns.filter(c => c.channel === 'WhatsApp').length },
        { id: 'email', label: 'Email', count: mockCampaigns.filter(c => c.channel === 'Email').length },
        { id: 'sms', label: 'SMS', count: mockCampaigns.filter(c => c.channel === 'SMS').length },
        { id: 'experiments', label: '🧪 Experiments' },
    ];

    const handleCreateCampaign = () => {
        showToast('Opening Campaign Builder...', 'success');
    };

    const handleCampaignAction = (campaign, action) => {
        showToast(`${action} campaign: ${campaign.name}`, 'info');
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'live': return 'badge-success';
            case 'active': return 'badge-success';
            case 'scheduled': return 'badge-info';
            case 'draft': return 'badge-neutral';
            case 'completed': return 'badge-neutral';
            default: return 'badge-neutral';
        }
    };

    const filteredCampaigns = mockCampaigns.filter(c => {
        if (activeTab !== 'all' && activeTab !== 'experiments' && c.channel.toLowerCase() !== activeTab) return false;
        if (filterChannel !== 'all' && c.channel !== filterChannel) return false;
        if (filterGoal !== 'all' && c.goal !== filterGoal) return false;
        if (filterStatus !== 'all' && c.status !== filterStatus) return false;
        return true;
    });

    return (
        <>
            <PageHeader
                title="Campaigns"
                subtitle="Manage, monitor, and optimize all omnichannel campaigns"
                action={
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowCollaboration(!showCollaboration)}
                            style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}
                        >
                            <span>💬</span> Team Chat
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => showToast('Opening AI Copy Assistant...', 'info')}
                            style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}
                        >
                            <span>✨</span> AI Assistant
                        </button>
                        <button className="btn btn-primary" onClick={handleCreateCampaign}>
                            + Create Campaign
                        </button>
                    </div>
                }
            />

            {showCollaboration && <CollaborationPanel showToast={showToast} onClose={() => setShowCollaboration(false)} />}

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Filters */}
            {activeTab !== 'experiments' && (
                <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <label className="text-sm text-muted">Channel:</label>
                            <select value={filterChannel} onChange={(e) => setFilterChannel(e.target.value)}>
                                <option value="all">All Channels</option>
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="Email">Email</option>
                                <option value="SMS">SMS</option>
                                <option value="Multi-channel">Multi-channel</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <label className="text-sm text-muted">Goal:</label>
                            <select value={filterGoal} onChange={(e) => setFilterGoal(e.target.value)}>
                                <option value="all">All Goals</option>
                                <option value="sales">Sales</option>
                                <option value="awareness">Awareness</option>
                                <option value="retention">Retention</option>
                                <option value="engagement">Engagement</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <label className="text-sm text-muted">Status:</label>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="live">Live</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Experiments Tab Content */}
            {activeTab === 'experiments' ? (
                <div className="card">
                    <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <div>
                            <h3 className="text-lg font-semibold">A/B Tests & Experiments</h3>
                            <p className="text-sm text-muted">Run experiments to optimize conversion rates</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => showToast('Starting new experiment wizard...', 'info')}>
                            + New Experiment
                        </button>
                    </div>

                    <div style={{
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: 'var(--spacing-xl)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>💡</span>
                        <div>
                            <div className="font-semibold">Pro Tip</div>
                            <div className="text-sm text-muted">Run an A/B test on your next campaign to improve conversion outcomes by up to 15%.</div>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Experiment Name</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Traffic Split</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Winner</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>CTR (A / B)</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Revenue (A / B)</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {experiments.map((exp) => (
                                    <tr key={exp.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                            {exp.name}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <span className={`badge ${getStatusBadgeClass(exp.status)}`}>
                                                {exp.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
                                            {exp.traffic}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: exp.winner !== 'Pending' ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                                            {exp.winner}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right' }}>
                                            <span style={{ color: exp.ctr.A > exp.ctr.B ? 'var(--color-success)' : '' }}>{exp.ctr.A}%</span>
                                            <span className="text-muted"> / </span>
                                            <span style={{ color: exp.ctr.B > exp.ctr.A ? 'var(--color-success)' : '' }}>{exp.ctr.B}%</span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right' }}>
                                            <span style={{ color: exp.revenue.A > exp.revenue.B ? 'var(--color-success)' : '' }}>₹{(exp.revenue.A / 1000).toFixed(1)}K</span>
                                            <span className="text-muted"> / </span>
                                            <span style={{ color: exp.revenue.B > exp.revenue.A ? 'var(--color-success)' : '' }}>₹{(exp.revenue.B / 1000).toFixed(1)}K</span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                            <button className="btn btn-sm btn-secondary" onClick={() => showToast(`Viewing details for ${exp.name}`, 'info')}>
                                                View Results
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Standard Campaigns Table */
                <div className="card">
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Campaign Name</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Channel</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Sent</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Open Rate</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Revenue</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCampaigns.map((campaign) => (
                                    <tr key={campaign.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                            {campaign.name}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <span className={`badge ${getStatusBadgeClass(campaign.status)}`}>
                                                {campaign.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <span className="badge badge-neutral">{campaign.channel}</span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right' }}>
                                            {campaign.sent ? campaign.sent.toLocaleString() : '—'}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-success)' }}>
                                            {campaign.ctr ? `${campaign.ctr}%` : '—'}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', fontWeight: 'var(--font-weight-semibold)' }}>
                                            {campaign.revenue > 0 ? `₹${(campaign.revenue / 1000).toFixed(0)}K` : '—'}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: 'var(--spacing-xs)', justifyContent: 'flex-end' }}>
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleCampaignAction(campaign, 'edit')}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleCampaignAction(campaign, 'duplicate')}
                                                >
                                                    Duplicate
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleCampaignAction(campaign, 'report')}
                                                >
                                                    Report
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredCampaigns.length === 0 && (
                        <div style={{ padding: 'var(--spacing-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📭</div>
                            <div className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-sm)' }}>No campaigns found</div>
                            <div className="text-sm">Try adjusting your filters or create a new campaign</div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Campaigns;
