import React, { useState } from 'react';

function TabNav({ tabs, activeTab, onTabChange }) {
    return (
        <div style={{
            borderBottom: '1px solid var(--color-border)',
            marginBottom: 'var(--spacing-xl)'
        }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        style={{
                            padding: 'var(--spacing-md) var(--spacing-lg)',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: activeTab === tab.id ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                            fontSize: 'var(--font-size-sm)',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)',
                            position: 'relative',
                            top: '1px'
                        }}
                    >
                        {tab.label}
                        {tab.count !== undefined && (
                            <span style={{
                                marginLeft: 'var(--spacing-xs)',
                                padding: '2px var(--spacing-xs)',
                                background: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                                color: activeTab === tab.id ? 'white' : 'var(--color-text-muted)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--font-size-xs)'
                            }}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TabNav;
