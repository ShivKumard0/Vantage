import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import TabNav from '../components/TabNav';
import { projectsList } from '../data/mockData';

function Projects({ showToast }) {
    const [activeTab, setActiveTab] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    const tabs = [
        { id: 'all', label: 'All Projects', count: projectsList.length },
        { id: 'active', label: 'In Progress', count: projectsList.filter(p => p.status === 'In Progress').length },
        { id: 'risk', label: 'At Risk', count: projectsList.filter(p => p.status === 'At Risk').length },
        { id: 'completed', label: 'Completed', count: projectsList.filter(p => p.status === 'Completed').length },
    ];

    const handleCreateProject = () => {
        showToast('Opening Project Wizard...', 'success');
    };

    const handleProjectAction = (project, action) => {
        showToast(`${action} project: ${project.name}`, 'info');
    };

    const filteredProjects = projectsList.filter(p => {
        if (activeTab === 'active' && p.status !== 'In Progress') return false;
        if (activeTab === 'risk' && p.status !== 'At Risk') return false;
        if (activeTab === 'completed' && p.status !== 'Completed') return false;

        if (filterStatus !== 'all' && p.status !== filterStatus) return false;
        if (filterPriority !== 'all' && p.priority !== filterPriority) return false;
        return true;
    });

    return (
        <>
            <PageHeader
                title="Projects"
                subtitle="Manage and track all ongoing initiatives"
                action={
                    <button className="btn btn-primary" onClick={handleCreateProject}>
                        + New Project
                    </button>
                }
            />

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Filters */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <label className="text-sm text-muted">Status:</label>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="In Progress">In Progress</option>
                            <option value="At Risk">At Risk</option>
                            <option value="Completed">Completed</option>
                            <option value="Planning">Planning</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <label className="text-sm text-muted">Priority:</label>
                        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                            <option value="all">All Priorities</option>
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Projects Table */}
            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Project Name</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Owner</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Progress</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Budget</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Deadline</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((project) => (
                                <tr key={project.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                        {project.name}
                                        <div className="text-xs text-muted" style={{ marginTop: '4px' }}>Priority: {project.priority}</div>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)' }}>
                                        <span className={`badge badge-${project.status === 'In Progress' ? 'success' : project.status === 'At Risk' ? 'warning' : project.status === 'Completed' ? 'neutral' : 'info'}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                        {project.owner}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                            <div style={{ width: '60px', height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${project.progress}%`, height: '100%', background: 'var(--color-primary)' }}></div>
                                            </div>
                                            {project.progress}%
                                        </div>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', fontWeight: 'var(--font-weight-semibold)' }}>
                                        {project.budget}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                        {project.deadline}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-xs)', justifyContent: 'flex-end' }}>
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => handleProjectAction(project, 'edit')}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => handleProjectAction(project, 'details')}
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredProjects.length === 0 && (
                    <div style={{ padding: 'var(--spacing-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📭</div>
                        <div className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-sm)' }}>No projects found</div>
                        <div className="text-sm">Try adjusting your filters or create a new project</div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Projects;
