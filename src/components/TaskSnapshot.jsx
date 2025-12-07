import React, { useState } from 'react';
import { tasksList } from '../data/mockData';

function TaskSnapshot({ showToast }) {
    const [tasks, setTasks] = useState(tasksList);
    const [expandedTask, setExpandedTask] = useState(null);

    const handleCreateTask = () => {
        showToast('Opening Task Creator...', 'info');
    };

    const handleTaskClick = (task) => {
        setExpandedTask(expandedTask === task.id ? null : task.id);
    };

    const toggleTaskStatus = (e, taskId) => {
        e.stopPropagation();
        setTasks(tasks.map(t => {
            if (t.id === taskId) {
                const newStatus = t.status === 'Done' ? 'In Progress' : 'Done';
                showToast(
                    newStatus === 'Done' ? 'Task completed' : 'Task reopened',
                    newStatus === 'Done' ? 'success' : 'info'
                );
                return { ...t, status: newStatus };
            }
            return t;
        }));
    };

    return (
        <div className="card" style={{ height: 'fit-content' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="text-xl font-semibold">My Tasks</h2>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={handleCreateTask}
                >
                    + Add Task
                </button>
            </div>

            <div className="flex-col" style={{ gap: 'var(--spacing-lg)' }}>
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="card"
                        onClick={() => handleTaskClick(task)}
                        style={{
                            background: 'var(--color-bg-secondary)',
                            border: `1px solid ${expandedTask === task.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            cursor: 'pointer',
                            transition: 'all var(--transition-base)',
                            padding: 'var(--spacing-lg)',
                        }}
                    >
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                            <h3 className="text-md font-semibold">{task.title}</h3>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                                <span className={`badge ${task.priority === 'Critical' ? 'badge-error' : task.priority === 'High' ? 'badge-warning' : 'badge-neutral'}`}>
                                    {task.priority}
                                </span>
                                <button
                                    className={`btn btn-sm ${task.status === 'Done' ? 'btn-success' : 'btn-secondary'}`}
                                    onClick={(e) => toggleTaskStatus(e, task.id)}
                                    style={{
                                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                                        minWidth: '32px',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {task.status === 'Done' ? '✓' : '○'}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-2" style={{ gap: 'var(--spacing-lg)' }}>
                            <div>
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Project</div>
                                <div className="text-sm font-medium">{task.project}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Due Date</div>
                                <div className="text-sm font-medium">{task.dueDate}</div>
                            </div>
                        </div>

                        {expandedTask === task.id && (
                            <div
                                style={{
                                    marginTop: 'var(--spacing-lg)',
                                    paddingTop: 'var(--spacing-lg)',
                                    borderTop: '1px solid var(--color-border)',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}
                            >
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Opening task details...', 'info');
                                        }}
                                    >
                                        ✏️ Edit Details
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast('Reassigning task...', 'info');
                                        }}
                                    >
                                        👤 Reassign
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

export default TaskSnapshot;
