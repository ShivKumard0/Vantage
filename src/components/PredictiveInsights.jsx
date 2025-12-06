import React, { useState } from 'react';

// Mock predictive data
const predictiveData = {
    roiForecast: {
        current: 125000,
        predicted: 148000,
        uplift: 18.4,
        confidence: 92
    },
    optimalSendTimes: [
        { day: 'Mon', time: '10:00 AM', score: 85 },
        { day: 'Tue', time: '2:00 PM', score: 94 },
        { day: 'Wed', time: '11:00 AM', score: 88 },
        { day: 'Thu', time: '4:00 PM', score: 76 },
        { day: 'Fri', time: '9:00 AM', score: 65 },
    ]
};

function PredictiveInsights({ showToast }) {
    const [showGenAIModal, setShowGenAIModal] = useState(false);
    const [genAIPrompt, setGenAIPrompt] = useState('');
    const [generatedCopy, setGeneratedCopy] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateCopy = () => {
        if (!genAIPrompt.trim()) return;

        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            setGeneratedCopy(`🚀 **Exclusive Offer just for you!**\n\nHey there! We noticed you've been eyeing our summer collection. Here's a special 20% OFF code: **SUMMER20**.\n\nShop now before it's gone! 🛍️`);
            setIsGenerating(false);
            showToast('AI Copy generated successfully!', 'success');
        }, 1500);
    };

    const handleApplyCopy = () => {
        showToast('Copy applied to clipboard/campaign!', 'success');
        setShowGenAIModal(false);
        setGenAIPrompt('');
        setGeneratedCopy('');
    };

    return (
        <div className="grid grid-2" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            {/* ROI Forecasting Card */}
            <div className="card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', border: 'none' }}>
                <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <span style={{ fontSize: '1.5rem' }}>🔮</span>
                        <h3 className="text-lg font-semibold">ROI Forecast</h3>
                    </div>
                    <span className="badge badge-success" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                        {predictiveData.roiForecast.confidence}% Confidence
                    </span>
                </div>

                <div className="grid grid-2" style={{ gap: 'var(--spacing-lg)' }}>
                    <div>
                        <div className="text-sm" style={{ color: '#a5b4fc', marginBottom: 'var(--spacing-xs)' }}>Predicted Revenue</div>
                        <div className="text-3xl font-bold">₹{(predictiveData.roiForecast.predicted / 1000).toFixed(0)}K</div>
                        <div className="text-sm" style={{ color: '#34d399', marginTop: 'var(--spacing-xs)' }}>
                            +{predictiveData.roiForecast.uplift}% uplift
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'end', height: '60px', gap: '4px' }}>
                        {[40, 55, 45, 60, 75, 65, 85].map((h, i) => (
                            <div key={i} style={{
                                flex: 1,
                                background: i === 6 ? '#34d399' : 'rgba(255,255,255,0.2)',
                                height: `${h}%`,
                                borderRadius: '2px'
                            }}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Optimal Send Time & GenAI */}
            <div className="card">
                <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3 className="text-lg font-semibold">AI Assistant</h3>
                    <button
                        className="btn btn-sm btn-primary"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
                        onClick={() => setShowGenAIModal(true)}
                    >
                        ✨ GenAI Copy
                    </button>
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <div className="text-sm text-muted" style={{ marginBottom: 'var(--spacing-sm)' }}>Optimal Send Time (Next 24h)</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <div className="text-2xl font-bold">{predictiveData.optimalSendTimes[1].time}</div>
                        <span className="badge badge-success">High Engagement</span>
                    </div>
                </div>

                <div style={{
                    padding: 'var(--spacing-md)',
                    background: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)'
                }}>
                    <span style={{ marginRight: 'var(--spacing-sm)' }}>💡</span>
                    <strong>Insight:</strong> Tuesday afternoons have 22% higher open rates for your "Loyal" segment.
                </div>
            </div>

            {/* GenAI Modal */}
            {showGenAIModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} onClick={() => setShowGenAIModal(false)}>
                    <div className="card" style={{ width: '90%', maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h3 className="text-xl font-semibold">✨ GenAI Copy Assistant</h3>
                            <button onClick={() => setShowGenAIModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}>×</button>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="text-sm font-semibold" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                                What is this campaign about?
                            </label>
                            <textarea
                                className="input"
                                rows="3"
                                placeholder="e.g., Summer sale for VIP customers, 20% off..."
                                value={genAIPrompt}
                                onChange={(e) => setGenAIPrompt(e.target.value)}
                                style={{ width: '100%', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)' }}
                            />
                        </div>

                        {generatedCopy && (
                            <div style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-primary)' }}>
                                <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)', textTransform: 'uppercase' }}>Generated Content</div>
                                <div style={{ whiteSpace: 'pre-wrap' }}>{generatedCopy}</div>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)' }}>
                            <button className="btn btn-secondary" onClick={() => setShowGenAIModal(false)}>Cancel</button>
                            {!generatedCopy ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleGenerateCopy}
                                    disabled={!genAIPrompt.trim() || isGenerating}
                                >
                                    {isGenerating ? 'Generating...' : 'Generate Magic ✨'}
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={handleApplyCopy}>
                                    Apply to Campaign
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PredictiveInsights;
