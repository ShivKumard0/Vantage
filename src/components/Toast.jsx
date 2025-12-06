import React, { useEffect } from 'react';

function Toast({ message, type = 'info' }) {
    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'var(--color-success)';
            case 'warning':
                return 'var(--color-warning)';
            case 'error':
                return 'var(--color-danger)';
            default:
                return 'var(--color-primary)';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'warning':
                return '⚠';
            case 'error':
                return '✕';
            default:
                return 'ℹ';
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 'calc(var(--header-height) + var(--spacing-md))',
                right: 'var(--spacing-md)',
                background: getBackgroundColor(),
                color: 'white',
                padding: 'var(--spacing-md) var(--spacing-xl)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                zIndex: 1000,
                animation: 'slideInRight 0.3s ease-out',
                maxWidth: '400px',
            }}
        >
            <div style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
            }}>
                {getIcon()}
            </div>
            <div style={{ flex: 1, fontSize: 'var(--font-size-sm)' }}>{message}</div>

            <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}

export default Toast;
