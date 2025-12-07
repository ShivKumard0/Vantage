import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';

function TeamSnapshot({ showToast }) {
    const { team: members } = useSimulation();
    const [expandedMember, setExpandedMember] = useState(null);

    const handleAddMember = () => {
        showToast('Opening Invitation Dialog...', 'info');
    };

    const handleMemberClick = (member) => {
        setExpandedMember(expandedMember === member.id ? null : member.id);
    };

    const handleAssignProject = (e, member) => {
        e.stopPropagation();
        showToast(`Assigning project to ${member.name}`, 'info');
    };

    return (
        <div className="card" style={{ height: 'fit-content' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="text-xl font-semibold">Team Resources</h2>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={handleAddMember}
                >
                    + Add Member
                </button>
            </div>

            <div className="flex-col" style={{ gap: 'var(--spacing-lg)' }}>
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="card"
                        onClick={() => handleMemberClick(member)}
                        style={{
                            background: 'var(--color-bg-secondary)',
                            border: `1px solid ${expandedMember === member.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            cursor: 'pointer',
                            transition: 'all var(--transition-base)',
                            padding: 'var(--spacing-lg)',
                        }}
                    >
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                            <div>
                                <h3 className="text-md font-semibold">{member.name}</h3>
                                <div className="text-sm text-secondary" style={{ marginTop: 'var(--spacing-xs)' }}>
                                    {member.role}
                                </div>
                            </div>
                            <div className={`badge ${member.status === 'Overloaded' ? 'badge-error' : member.status === 'Available' ? 'badge-success' : 'badge-neutral'}`}>
                                {member.status}
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-lg)',
                            paddingTop: 'var(--spacing-md)',
                            borderTop: '1px solid var(--color-border)',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{ flex: 1, minWidth: '120px' }}>
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Utilization</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ flex: 1, height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${member.utilization}%`, height: '100%', background: member.utilization > 90 ? 'var(--color-error)' : 'var(--color-primary)' }}></div>
                                    </div>
                                    <span className="text-sm font-bold">{member.utilization}%</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={(e) => handleAssignProject(e, member)}
                                >
                                    Assign
                                </button>
                            </div>
                        </div>

                        {expandedMember === member.id && (
                            <div
                                style={{
                                    marginTop: 'var(--spacing-lg)',
                                    paddingTop: 'var(--spacing-lg)',
                                    borderTop: '1px solid var(--color-border)',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}
                            >
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-md)' }}>
                                    Skills & Expertise
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', marginBottom: 'var(--spacing-lg)' }}>
                                    {member.skills.map((skill, index) => (
                                        <div key={index} className="badge badge-neutral">{skill}</div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Viewing profile...', 'info');
                                        }}
                                    >
                                        👤 View Profile
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Checking schedule...', 'info');
                                        }}
                                    >
                                        📅 View Schedule
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamSnapshot;
