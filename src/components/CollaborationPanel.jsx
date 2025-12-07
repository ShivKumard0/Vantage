import React, { useState } from 'react';

const mockComments = [
    { id: 'c1', user: 'Product Owner', avatar: 'PO', text: 'Should we increase the budget for this?', time: '2h ago' },
    { id: 'c2', user: 'Admin User', avatar: 'AU', text: 'Agreed, let\'s double it for the weekend.', time: '1h ago' },
];

const mockActivity = [
    { id: 'a1', user: 'Admin User', action: 'changed status to Active', time: '1h ago' },
    { id: 'a2', user: 'Product Owner', action: 'updated email copy', time: '3h ago' },
];

function CollaborationPanel({ showToast, onClose }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(mockComments);

    const handlePostComment = () => {
        if (!comment.trim()) return;
        const newComment = {
            id: Date.now(),
            user: 'You',
            avatar: 'ME',
            text: comment,
            time: 'Just now'
        };
        setComments([...comments, newComment]);
        setComment('');
        showToast('Comment posted', 'success');
    };

    return (
        <div className="card" style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            width: '320px',
            bottom: '20px',
            zIndex: 900,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-5px 0 15px rgba(0,0,0,0.1)'
        }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)' }}>
                <h3 className="text-lg font-semibold">Team Chat</h3>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 'var(--spacing-lg)' }}>
                {comments.map(c => (
                    <div key={c.id} style={{ marginBottom: 'var(--spacing-md)' }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center', marginBottom: 'var(--spacing-xs)' }}>
                            <div style={{
                                width: '24px', height: '24px', borderRadius: '50%',
                                background: 'var(--color-primary)', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.7rem'
                            }}>
                                {c.avatar}
                            </div>
                            <span className="text-xs font-semibold">{c.user}</span>
                            <span className="text-xs text-muted">{c.time}</span>
                        </div>
                        <div style={{
                            background: 'var(--color-bg-secondary)',
                            padding: 'var(--spacing-sm)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--font-size-sm)',
                            marginLeft: '32px'
                        }}>
                            {c.text}
                        </div>
                    </div>
                ))}

                <div style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
                    <h4 className="text-xs font-semibold text-muted" style={{ marginBottom: 'var(--spacing-sm)', textTransform: 'uppercase' }}>Recent Activity</h4>
                    {mockActivity.map(a => (
                        <div key={a.id} style={{ fontSize: 'var(--font-size-xs)', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)' }}>
                            <strong>{a.user}</strong> {a.action} <span className="text-muted">({a.time})</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <input
                    type="text"
                    className="input"
                    placeholder="Type a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handlePostComment()}
                    style={{ flex: 1 }}
                />
                <button className="btn btn-primary" onClick={handlePostComment}>Send</button>
            </div>
        </div>
    );
}

export default CollaborationPanel;
