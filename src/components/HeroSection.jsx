import React from 'react';

function HeroSection({ dateRange }) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="hero-section" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <h1 className="text-3xl font-bold" style={{ marginBottom: 'var(--spacing-xs)' }}>
                    Marketing Overview
                </h1>
                <p className="text-secondary" style={{ fontSize: 'var(--font-size-lg)' }}>
                    What's happening in your account right now
                </p>
            </div>

            <div className="flex-between" style={{ flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                <div className="flex gap-md" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge badge-info">
                        📅 {dateRange}
                    </span>
                    <span className="text-muted text-sm">
                        {dateString} • {timeString}
                    </span>
                </div>
                <span className="text-muted text-xs" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--color-success)',
                        display: 'inline-block',
                        animation: 'pulse 2s infinite'
                    }}></span>
                    Data refreshed 3 mins ago
                </span>
            </div>
        </div>
    );
}

export default HeroSection;
