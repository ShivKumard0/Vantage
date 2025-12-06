import React, { useState } from 'react';

function KPICard({ data, showToast }) {
    const { title, subtitle, value, period, trend, sparkline, meta } = data;
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        showToast(`Opening detailed analytics for ${title}`, 'info');
    };

    return (
        <div
            className="card card-clickable"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                borderColor: isHovered ? 'var(--color-primary)' : 'var(--color-border)',
            }}
        >
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <div className="text-muted text-xs font-medium" style={{ marginBottom: 'var(--spacing-xs)' }}>
                    {subtitle}
                </div>
                <h3 className="text-2xl font-bold" style={{ marginBottom: 'var(--spacing-xs)' }}>
                    {value}
                </h3>
                <div className="text-secondary text-xs">{period}</div>
            </div>

            {trend && (
                <div className={`trend trend-${trend.direction}`} style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
                    <span>{trend.value} {trend.label}</span>
                </div>
            )}

            {sparkline && (
                <div style={{
                    height: '40px',
                    marginTop: 'var(--spacing-md)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '2px'
                }}>
                    {sparkline.map((value, index) => {
                        const maxValue = Math.max(...sparkline);
                        const height = (value / maxValue) * 100;
                        return (
                            <div
                                key={index}
                                style={{
                                    flex: 1,
                                    height: `${height}%`,
                                    background: trend.direction === 'up'
                                        ? 'var(--color-success)'
                                        : 'var(--color-primary)',
                                    borderRadius: '2px',
                                    opacity: 0.3 + (index / sparkline.length) * 0.7,
                                    transition: 'all var(--transition-base)',
                                    transform: isHovered ? 'scaleY(1.1)' : 'scaleY(1)',
                                }}
                                title={`Day ${index + 1}: ${value}`}
                            ></div>
                        );
                    })}
                </div>
            )}

            {meta && (
                <div className="text-xs text-muted" style={{
                    marginTop: 'var(--spacing-md)',
                    paddingTop: 'var(--spacing-sm)',
                    borderTop: '1px solid var(--color-border)'
                }}>
                    {meta}
                </div>
            )}
        </div>
    );
}

export default KPICard;
