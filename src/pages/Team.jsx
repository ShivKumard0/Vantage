import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { teamMembers } from '../data/mockData';

function Team({ showToast }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddMember = () => {
        showToast('Opening Invitation Dialog...', 'success');
    };

    const handleMemberAction = (member, action) => {
        showToast(`${action} member: ${member.name}`, 'info');
    };

    const filteredMembers = teamMembers.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <PageHeader
                title="Team & Resources"
                subtitle="Manage team members and workload distribution"
                action={
                    <button className="btn btn-primary" onClick={handleAddMember}>
                        + Add Member
                    </button>
                }
            />

            {/* Member Search */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <div className="search-container" style={{ flex: 1, maxWidth: '500px' }}>
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by name or role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-3">
                {filteredMembers.map((member) => (
                    <div key={member.id} className="card" style={{ background: 'var(--color-bg-card)' }}>
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <div className="flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <span className={`badge ${member.status === 'Overloaded' ? 'badge-error' : member.status === 'Available' ? 'badge-success' : 'badge-neutral'}`}>
                                    {member.status}
                                </span>
                            </div>
                            <div className="text-secondary text-sm">
                                {member.role}
                            </div>
                        </div>

                        <div style={{
                            marginBottom: 'var(--spacing-lg)',
                            paddingTop: 'var(--spacing-md)',
                            borderTop: '1px solid var(--color-border)'
                        }}>
                            <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>
                                Utilization
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ flex: 1, height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${member.utilization}%`, height: '100%', background: member.utilization > 90 ? 'var(--color-error)' : 'var(--color-primary)' }}></div>
                                </div>
                                <span className="text-sm font-bold">{member.utilization}%</span>
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>
                                Skills
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
                                {member.skills.map((skill, idx) => (
                                    <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <button
                                className="btn btn-sm btn-secondary"
                                style={{ flex: 1 }}
                                onClick={() => handleMemberAction(member, 'view')}
                            >
                                Profile
                            </button>
                            <button
                                className="btn btn-sm btn-primary"
                                style={{ flex: 1 }}
                                onClick={() => handleMemberAction(member, 'assign')}
                            >
                                Assign Task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Team;
