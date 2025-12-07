import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { tasksList } from '../data/mockData';

function Tasks({ showToast }) {
    const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'

    const handleCreateTask = () => {
        showToast('Opening Task Creator...', 'success');
    };

    const handleTaskAction = (task, action) => {
        showToast(`${action} task: ${task.title}`, 'info');
    };

    const columns = [
        { id: 'To Do', title: 'To Do', color: 'var(--color-text-secondary)' },
        { id: 'In Progress', title: 'In Progress', color: 'var(--color-primary)' },
        { id: 'Done', title: 'Done', color: 'var(--color-success)' },
    ];

    return (
        <>
            <PageHeader
                title="Tasks & Board"
                subtitle="Manage tasks using Kanban or List view"
                action={
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <div className="btn-group">
                            <button
                                className={`btn ${viewMode === 'board' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setViewMode('board')}
                            >
                                ⊞ Board
                            </button>
                            <button
                                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setViewMode('list')}
                            >
                                ☰ List
                            </button>
                        </div>
                        <button className="btn btn-primary" onClick={handleCreateTask}>
                            + Add Task
                        </button>
                    </div>
                }
            />

            {viewMode === 'board' ? (
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)', overflowX: 'auto', paddingBottom: 'var(--spacing-lg)' }}>
                    {columns.map((column) => (
                        <div key={column.id} style={{ flex: 1, minWidth: '300px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 'var(--spacing-md)',
                                padding: 'var(--spacing-sm)',
                                background: 'var(--color-bg-secondary)',
                                borderRadius: 'var(--radius-sm)'
                            }}>
                                <h3 className="font-semibold" style={{ color: column.color }}>{column.title}</h3>
                                <span className="badge badge-neutral">
                                    {tasksList.filter(t => t.status === column.id).length}
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                {tasksList.filter(t => t.status === column.id).map((task) => (
                                    <div
                                        key={task.id}
                                        className="card card-clickable"
                                        onClick={() => handleTaskAction(task, 'view')}
                                        style={{ borderLeft: `4px solid ${task.priority === 'Critical' ? 'var(--color-error)' : task.priority === 'High' ? 'var(--color-warning)' : 'transparent'}` }}
                                    >
                                        <div className="text-sm text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>
                                            {task.project}
                                        </div>
                                        <h4 className="font-medium" style={{ marginBottom: 'var(--spacing-md)' }}>
                                            {task.title}
                                        </h4>
                                        <div className="flex-between">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                                                <span className="avatar-sm" style={{ width: '24px', height: '24px', fontSize: '0.75rem' }}>
                                                    {task.assignee.charAt(0)}
                                                </span>
                                                <span className="text-xs text-secondary">{task.assignee.split(' ')[0]}</span>
                                            </div>
                                            <div className="text-xs text-muted">
                                                {task.dueDate}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card">
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Task Title</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Project</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Priority</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Assignee</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Due Date</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasksList.map((task) => (
                                    <tr key={task.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                            {task.title}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                            {task.project}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <span className={`badge badge-${task.status === 'Done' ? 'success' : task.status === 'In Progress' ? 'primary' : 'neutral'}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <span className={`badge ${task.priority === 'Critical' ? 'badge-error' : task.priority === 'High' ? 'badge-warning' : 'badge-neutral'}`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
                                            {task.assignee}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                            {task.dueDate}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => handleTaskAction(task, 'edit')}
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
            )}
        </>
    );
}

export default Tasks;
