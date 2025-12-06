import React, { useState } from 'react';
import { channelPerformance, topCampaigns } from '../data/mockData';

function CampaignPerformance() {
    const [activeTab, setActiveTab] = useState('all');
    const maxValue = Math.max(...channelPerformance.map(c => c.revenue));

    const handleCampaignAction = (campaignName, action) => {
        console.log(`Campaign Action: ${action} on "${campaignName}"`);

        const messages = {
            view: `📊 Viewing campaign: "${campaignName}"\n\nShowing:\n• Real-time performance\n• Audience breakdown\n• Message delivery stats\n• Revenue attribution`,
            edit: `✏️ Editing campaign: "${campaignName}"\n\nYou can modify:\n• Target audience\n• Message content\n• Schedule\n• Budget allocation`,
            duplicate: `📋 Duplicating campaign: "${campaignName}"\n\nCreating a copy with:\n• Same configuration\n• Same message templates\n• New draft status`
        };

        alert(messages[action]);
    };

    const handleChannelClick = (channel) => {
        console.log(`Channel clicked: ${channel.channel}`);
        alert(`📱 ${channel.channel} Performance\n\nDetailed metrics:\n• Sends: ${channel.sends.toLocaleString()}\n• Opens: ${channel.opens.toLocaleString()} (${((channel.opens / channel.sends) * 100).toFixed(1)}%)\n• Clicks: ${channel.clicks.toLocaleString()} (${((channel.clicks / channel.opens) * 100).toFixed(1)}%)\n• Conversions: ${channel.conversions.toLocaleString()}\n• Revenue: ₹${(channel.revenue / 1000000).toFixed(2)}M`);
    };

    return (
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h2 className="text-xl font-semibold">Campaign & Channel Performance</h2>
                <div className="flex gap-sm">
                    {[
                        { id: 'all', label: 'All Campaigns' },
                        { id: 'by-channel', label: 'By Channel' },
                        { id: 'by-objective', label: 'By Objective' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => {
                                setActiveTab(tab.id);
                                console.log(`Tab switched to: ${tab.label}`);
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    Revenue by Channel
                </h3>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 'var(--spacing-md)',
                    height: '250px',
                    padding: 'var(--spacing-lg) 0'
                }}>
                    {channelPerformance.map((channel) => {
                        const height = (channel.revenue / maxValue) * 70; // Max 70% height to leave room for labels
                        return (
                            <div
                                key={channel.channel}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    gap: 'var(--spacing-sm)',
                                    cursor: 'pointer',
                                    height: '100%',
                                }}
                                onClick={() => handleChannelClick(channel)}
                            >
                                <div className="text-xs font-semibold text-secondary">
                                    ₹{(channel.revenue / 1000000).toFixed(1)}M
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        height: `${height}%`,
                                        background: `linear-gradient(180deg, ${channel.color} 0%, ${channel.color}88 100%)`,
                                        borderRadius: 'var(--radius-md)',
                                        transition: 'all var(--transition-base)',
                                        position: 'relative',
                                    }}
                                    className="bar-chart-item"
                                    title={`${channel.channel}: ₹${(channel.revenue / 1000000).toFixed(2)}M`}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scaleY(1.05)';
                                        e.currentTarget.style.filter = 'brightness(1.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scaleY(1)';
                                        e.currentTarget.style.filter = 'brightness(1)';
                                    }}
                                ></div>
                                <div className="text-xs font-medium">{channel.channel}</div>
                                <div className="text-xs text-muted">
                                    {(channel.conversions / 1000).toFixed(1)}K conv
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="card">
                <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    Top Performing Campaigns
                </h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Campaign Name</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Channel</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>CTR</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Conv. Rate</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Revenue</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topCampaigns.map((campaign) => (
                                <tr
                                    key={campaign.id}
                                    style={{
                                        borderBottom: '1px solid var(--color-border)',
                                        transition: 'background var(--transition-fast)',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleCampaignAction(campaign.name, 'view')}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                        {campaign.name}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)' }}>
                                        <span className={`badge badge-${campaign.status === 'live' ? 'success' : campaign.status === 'scheduled' ? 'info' : campaign.status === 'paused' ? 'warning' : 'neutral'}`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                        {campaign.channel}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                        {campaign.ctr > 0 ? `${campaign.ctr}%` : '—'}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                        {campaign.conversionRate > 0 ? `${campaign.conversionRate}%` : '—'}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', textAlign: 'right', fontWeight: 'var(--font-weight-semibold)' }}>
                                        {campaign.revenue > 0 ? `₹${(campaign.revenue / 1000).toFixed(0)}K` : '—'}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', textAlign: 'right' }}>
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const action = prompt(`Choose action for "${campaign.name}":\n\n1. View Details\n2. Edit Campaign\n3. Duplicate Campaign\n\nEnter 1, 2, or 3:`);
                                                    if (action === '1') handleCampaignAction(campaign.name, 'view');
                                                    else if (action === '2') handleCampaignAction(campaign.name, 'edit');
                                                    else if (action === '3') handleCampaignAction(campaign.name, 'duplicate');
                                                }}
                                            >
                                                ⋯
                                            </button>
                                        </div>
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

export default CampaignPerformance;
