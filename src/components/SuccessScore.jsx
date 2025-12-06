import React from 'react';

function SuccessScore() {
    return (
        <div className="card" style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: 'white',
            marginBottom: 'var(--spacing-2xl)'
        }}>
            <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                <div>
                    <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-xs)' }}>Xeno Success Score</h3>
                    <div className="text-sm" style={{ opacity: 0.9 }}>Level: Marketing Superstar 🌟</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div className="text-3xl font-bold">850</div>
                    <div className="text-xs" style={{ opacity: 0.8 }}>/ 1000 Points</div>
                </div>
            </div>

            <div style={{
                margin: 'var(--spacing-lg) 0',
                height: '8px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
            }}>
                <div style={{ width: '85%', height: '100%', background: '#34d399' }}></div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)', overflowX: 'auto', paddingBottom: 'var(--spacing-xs)' }}>
                <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                    🚀 First Launch
                </div>
                <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                    🎯 100 Conversions
                </div>
                <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                    ⚡ Fast Responder
                </div>
                <div className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', border: '1px dashed rgba(255,255,255,0.2)' }}>
                    🔒 1k Club (Locked)
                </div>
            </div>
        </div>
    );
}

export default SuccessScore;
