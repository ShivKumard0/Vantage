import React from 'react';

function PageHeader({ title, subtitle, action }) {
    return (
        <div className="flex-between" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div>
                <h1 className="text-3xl font-bold" style={{ marginBottom: 'var(--spacing-xs)' }}>
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-secondary">{subtitle}</p>
                )}
            </div>
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
}

export default PageHeader;
