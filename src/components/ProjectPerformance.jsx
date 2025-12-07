import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';

function ProjectPerformance() {
    const { projects } = useSimulation();
    const [activeTab, setActiveTab] = useState('all');

    const handleProjectAction = (projectName, action) => {
        console.log(`Project Action: ${action} on "${projectName}"`);
        alert(`Action: ${action} on ${projectName}`);
    };

    return (
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h2 className="text-xl font-semibold">Active Projects</h2>
                <div className="flex gap-sm">
                    {[
                        { id: 'all', label: 'All Projects' },
                        { id: 'active', label: 'Active' },
                        { id: 'at-risk', label: 'At Risk' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Project Name</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Owner</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Progress</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Budget</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Deadline</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr
                                    key={project.id}
                                    style={{
                                        borderBottom: '1px solid var(--color-border)',
                                        transition: 'background var(--transition-fast)',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleProjectAction(project.name, 'view')}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                        {project.name}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)' }}>
                                        <span className={`badge badge-${project.status === 'In Progress' ? 'success' : project.status === 'At Risk' ? 'warning' : project.status === 'Completed' ? 'neutral' : 'info'}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                        {project.owner}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                            <div style={{ width: '60px', height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${project.progress}%`, height: '100%', background: 'var(--color-primary)' }}></div>
                                            </div>
                                            {project.progress}%
                                        </div>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', textAlign: 'right', fontWeight: 'var(--font-weight-semibold)' }}>
                                        {project.budget}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                        {project.deadline}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', textAlign: 'right' }}>
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleProjectAction(project.name, 'edit');
                                            }}
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
        </div>
    );
}

export default ProjectPerformance;
