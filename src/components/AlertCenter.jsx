import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';

function AlertCenter({ showToast, onClose }) {
    const { activities } = useSimulation();
    const [filter, setFilter] = useState('all');

    // Transform activities to alerts format
    const alerts = activities.map(a => ({
        id: a.id,
        type: a.type === 'success' ? 'info' : a.type, // Map success to info for alerts
        title: a.type.charAt(0).toUpperCase() + a.type.slice(1) + ' Update',
        message: a.message,
        time: a.timestamp,
        action: 'View Details'
    }));

    const handleAction = (alert) => {
        showToast(`Action taken: ${alert.action}`, 'success');
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case 'critical': return '🔴';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '🔔';
        }
    };

    const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

    return (
        <div className="card" style={{
            position: 'absolute',
            top: '60px',
            right: '20px',
            width: '350px',
            zIndex: 1000,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            padding: 0,
            overflow: 'hidden'
        }}>
            <div className="flex-between" style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
                <h3 className="text-md font-semibold">Alert Center</h3>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ padding: 'var(--spacing-sm)', display: 'flex', gap: 'var(--spacing-xs)', borderBottom: '1px solid var(--color-border)' }}>
                {['all', 'critical', 'warning', 'info'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`badge ${filter === f ? 'badge-primary' : 'badge-neutral'}`}
                        style={{ cursor: 'pointer', border: 'none', textTransform: 'capitalize' }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {filteredAlerts.length > 0 ? (
                    filteredAlerts.map(alert => (
                        <div key={alert.id} style={{
                            padding: 'var(--spacing-md)',
                            borderBottom: '1px solid var(--color-border)',
                            background: alert.type === 'critical' ? 'rgba(239, 68, 68, 0.05)' : 'transparent'
                        }}>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
                                <span>{getAlertIcon(alert.type)}</span>
                                <div style={{ fontWeight: '600', fontSize: 'var(--font-size-sm)' }}>{alert.title}</div>
                            </div>
                            <div className="text-sm text-secondary" style={{ marginBottom: 'var(--spacing-sm)', paddingLeft: '24px' }}>
                                {alert.message}
                            </div>
                            <div className="flex-between" style={{ paddingLeft: '24px' }}>
                                <span className="text-xs text-muted">{alert.time}</span>
                                <button
                                    className="text-xs font-semibold"
                                    style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
                                    onClick={() => handleAction(alert)}
                                >
                                    {alert.action} →
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        No alerts found
                    </div>
                )}
            </div>

            <div style={{ padding: 'var(--spacing-sm)', textAlign: 'center', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-xs)', cursor: 'pointer' }}>
                    View All Alerts
                </button>
            </div>
        </div>
    );
}

export default AlertCenter;
