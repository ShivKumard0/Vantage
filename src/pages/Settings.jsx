import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import TabNav from '../components/TabNav';

// Mock settings data
const integrations = [
    { id: 'whatsapp', name: 'WhatsApp Business API', icon: '💬', connected: true },
    { id: 'email', name: 'Email (SMTP)', icon: '✉️', connected: true },
    { id: 'sms', name: 'SMS Gateway', icon: '📱', connected: true },
    { id: 'meta', name: 'Meta Ads', icon: '📘', connected: false },
];

const teamMembers = [
    { id: 't1', name: 'Admin User', email: 'admin@vantage.com', role: 'Admin', status: 'active' },
    { id: 't2', name: 'Product Owner', email: 'pm@vantage.com', role: 'Editor', status: 'active' },
    { id: 't3', name: 'Lead Developer', email: 'dev@vantage.com', role: 'Editor', status: 'active' },
];

// Mock Audit Logs
const auditLogs = [
    { id: 1, action: 'User Login', user: 'Admin User', ip: '192.168.1.1', time: 'Today, 9:45 AM' },
    { id: 2, action: 'Project Created', user: 'Product Owner', ip: '192.168.1.4', time: 'Today, 10:30 AM' },
    { id: 3, action: 'Exported Task Data', user: 'Admin User', ip: '192.168.1.1', time: 'Yesterday, 4:15 PM' },
    { id: 4, action: 'Changed API Key', user: 'Dev Ops', ip: '10.0.0.5', time: 'Yesterday, 2:00 PM' },
];

function Settings({ showToast }) {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile & Organization' },
        { id: 'team', label: 'Team & Permissions' },
        { id: 'integrations', label: 'Integrations' },
        { id: 'branding', label: 'Branding' },
        { id: 'billing', label: 'Billing & Plan' },
        { id: 'security', label: '🔒 Security & Audit' },
    ];

    const handleSaveSettings = () => {
        showToast('Settings saved successfully', 'success');
    };

    const handleConnectIntegration = (integration) => {
        showToast(`Connecting ${integration.name}...`, 'info');
    };

    const handleInviteTeamMember = () => {
        showToast('Opening team invitation...', 'info');
    };

    const handleUpgradePlan = () => {
        showToast('Opening plan upgrade...', 'info');
    };

    return (
        <>
            <PageHeader
                title="Settings"
                subtitle="Platform configuration and account management"
            />

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Profile & Organization */}
            {activeTab === 'profile' && (
                <div className="card">
                    <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        Organization Settings
                    </h3>

                    <div style={{ maxWidth: '600px' }}>
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="text-sm font-semibold" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                                Organization Name
                            </label>
                            <input type="text" defaultValue="Acme Retail Store" />
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="text-sm font-semibold" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                                Admin Email
                            </label>
                            <input type="email" defaultValue="admin@vantage.com" />
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="text-sm font-semibold" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                                Time Zone
                            </label>
                            <select>
                                <option>Asia/Kolkata (IST)</option>
                                <option>America/New_York (EST)</option>
                                <option>Europe/London (GMT)</option>
                            </select>
                        </div>

                        <button className="btn btn-primary" onClick={handleSaveSettings}>
                            Save Changes
                        </button>
                    </div>
                </div>
            )}

            {/* Team & Permissions */}
            {activeTab === 'team' && (
                <div className="card">
                    <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <h3 className="text-lg font-semibold">Team Members</h3>
                        <button className="btn btn-primary" onClick={handleInviteTeamMember}>
                            + Invite Member
                        </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Name</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Email</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Role</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map((member) => (
                                    <tr key={member.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                            {member.name}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
                                            {member.email}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <span className="badge badge-info">{member.role}</span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <span className="badge badge-success">{member.status}</span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                            <button className="btn btn-sm btn-secondary">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
                <div className="grid grid-2">
                    {integrations.map((integration) => (
                        <div key={integration.id} className="card" style={{ background: 'var(--color-bg-card)' }}>
                            <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                    <div style={{ fontSize: '2rem' }}>{integration.icon}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{integration.name}</h3>
                                    </div>
                                </div>
                                <span className={`badge ${integration.connected ? 'badge-success' : 'badge-neutral'}`}>
                                    {integration.connected ? 'Connected' : 'Not Connected'}
                                </span>
                            </div>

                            <button
                                className={integration.connected ? 'btn btn-sm btn-secondary' : 'btn btn-sm btn-primary'}
                                style={{ width: '100%' }}
                                onClick={() => handleConnectIntegration(integration)}
                            >
                                {integration.connected ? 'Configure' : 'Connect'}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Branding */}
            {activeTab === 'branding' && (
                <div className="card">
                    <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        Brand Customization
                    </h3>

                    <div style={{ maxWidth: '600px' }}>
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="text-sm font-semibold" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                                Store Logo
                            </label>
                            <div style={{
                                padding: 'var(--spacing-xl)',
                                border: '2px dashed var(--color-border)',
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>📤</div>
                                <div className="text-sm text-muted">Click to upload logo</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="text-sm font-semibold" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                                Primary Brand Color
                            </label>
                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                                <input type="color" defaultValue="#6366f1" />
                                <input type="text" defaultValue="#6366f1" style={{ flex: 1 }} />
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={handleSaveSettings}>
                            Save Branding
                        </button>
                    </div>
                </div>
            )}

            {/* Billing & Plan */}
            {activeTab === 'billing' && (
                <div className="card">
                    <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        Current Plan
                    </h3>

                    <div style={{
                        padding: 'var(--spacing-xl)',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--spacing-xl)'
                    }}>
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                            <div>
                                <h4 className="text-xl font-bold">Professional Plan</h4>
                                <div className="text-sm text-secondary">Billed monthly</div>
                            </div>
                            <div className="text-3xl font-bold">₹9,999<span className="text-lg text-muted">/mo</span></div>
                        </div>
                        <div className="text-sm" style={{ marginBottom: 'var(--spacing-md)' }}>
                            ✓ Unlimited projects • ✓ All features • ✓ Advanced analytics • ✓ 10 team members
                        </div>
                        <button className="btn btn-primary" onClick={handleUpgradePlan}>
                            Upgrade Plan
                        </button>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold" style={{ marginBottom: 'var(--spacing-md)' }}>
                            Billing History
                        </h4>
                        <div className="text-sm text-muted">
                            No billing history available
                        </div>
                    </div>
                </div>
            )}

            {/* Security & Audit */}
            {activeTab === 'security' && (
                <div className="card">
                    <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <h3 className="text-lg font-semibold">Security & Audit Log</h3>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <span className="badge badge-success">SOC2 Compliant</span>
                            <span className="badge badge-info">GDPR Ready</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h4 className="text-md font-semibold" style={{ marginBottom: 'var(--spacing-md)' }}>Recent Activity</h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                    <th style={{ padding: 'var(--spacing-sm)' }}>Action</th>
                                    <th style={{ padding: 'var(--spacing-sm)' }}>User</th>
                                    <th style={{ padding: 'var(--spacing-sm)' }}>IP Address</th>
                                    <th style={{ padding: 'var(--spacing-sm)' }}>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditLogs.map(log => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: 'var(--spacing-sm)' }}>{log.action}</td>
                                        <td style={{ padding: 'var(--spacing-sm)' }}>{log.user}</td>
                                        <td style={{ padding: 'var(--spacing-sm)', fontFamily: 'monospace' }}>{log.ip}</td>
                                        <td style={{ padding: 'var(--spacing-sm)', color: 'var(--color-text-muted)' }}>{log.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-secondary" style={{ marginTop: 'var(--spacing-md)', width: '100%' }}>View Full Audit Log</button>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold" style={{ marginBottom: 'var(--spacing-md)' }}>Security Settings</h4>
                        <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                            <button className="btn btn-secondary">Change Password</button>
                            <button className="btn btn-secondary">Enable 2FA</button>
                            <button className="btn btn-secondary">Manage API Keys</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Settings;
