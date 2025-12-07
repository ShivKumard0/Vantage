import React from 'react';
import { quickActions } from '../data/mockData';

function QuickActions({ showToast }) {
    const handleActionClick = (action) => {
        const messages = {
            'create-project': 'Opening Project Wizard...',
            'add-task': 'Opening Task Creator...',
            'log-risk': 'Opening Risk Logger...',
            'add-member': 'Opening Invitation Dialog...'
        };

        showToast(messages[action.id], 'success');
    };

    return (
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                Quick Actions
            </h2>

            <div className="grid grid-4">
                {quickActions.map((action) => (
                    <div
                        key={action.id}
                        className="card card-clickable"
                        onClick={() => handleActionClick(action)}
                        style={{
                            padding: 'var(--spacing-xl)',
                            textAlign: 'center',
                            background: action.variant === 'primary'
                                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                                : 'var(--color-bg-card)',
                            border: action.variant === 'primary'
                                ? '1px solid var(--color-primary)'
                                : '1px solid var(--color-border)',
                        }}
                    >
                        <div style={{
                            fontSize: '2.5rem',
                            marginBottom: 'var(--spacing-md)',
                            filter: 'grayscale(0)',
                        }}>
                            {action.icon}
                        </div>
                        <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-sm)' }}>
                            {action.title}
                        </h3>
                        <p className="text-sm text-secondary" style={{ lineHeight: '1.5' }}>
                            {action.description}
                        </p>
                        <button
                            className={action.variant === 'primary' ? 'btn btn-primary' : 'btn btn-secondary'}
                            style={{ marginTop: 'var(--spacing-lg)', width: '100%' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleActionClick(action);
                            }}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuickActions;
