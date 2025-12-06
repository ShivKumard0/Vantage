import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

// Mock loyalty and offers data
const mockLoyaltyProgram = {
    active: true,
    members: 18450,
    pointsIssued: 2850000,
    pointsRedeemed: 1240000,
    redemptionRate: 43.5,
};

const mockOffers = [
    { id: 'o1', name: 'First Purchase Discount', status: 'active', redemptions: 1248, redemptionRate: 32.5, revenueUplift: 145000 },
    { id: 'o2', name: 'Weekend Flash Sale', status: 'active', redemptions: 892, redemptionRate: 28.3, revenueUplift: 98000 },
    { id: 'o3', name: 'Buy 2 Get 1 Free', status: 'active', redemptions: 654, redemptionRate: 41.2, revenueUplift: 124000 },
    { id: 'o4', name: 'Summer Clearance', status: 'expired', redemptions: 2145, redemptionRate: 52.1, revenueUplift: 285000 },
    { id: 'o5', name: 'Holiday Special 2024', status: 'scheduled', redemptions: 0, redemptionRate: 0, revenueUplift: 0 },
];

function Loyalty({ showToast }) {
    const [loyaltyActive, setLoyaltyActive] = useState(mockLoyaltyProgram.active);

    const handleCreateOffer = () => {
        showToast('Opening Offer Creation Wizard...', 'success');
    };

    const handleToggleLoyalty = () => {
        setLoyaltyActive(!loyaltyActive);
        showToast(loyaltyActive ? 'Loyalty program deactivated' : 'Loyalty program activated', loyaltyActive ? 'warning' : 'success');
    };

    const handleOfferAction = (offer, action) => {
        showToast(`${action} offer: ${offer.name}`, 'info');
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'active': return 'badge-success';
            case 'scheduled': return 'badge-info';
            case 'expired': return 'badge-neutral';
            default: return 'badge-neutral';
        }
    };

    const pointsOutstanding = mockLoyaltyProgram.pointsIssued - mockLoyaltyProgram.pointsRedeemed;

    return (
        <>
            <PageHeader
                title="Loyalty & Offers"
                subtitle="Drive repeat business with programs & incentives"
                action={
                    <button className="btn btn-primary" onClick={handleCreateOffer}>
                        + Create Offer
                    </button>
                }
            />

            {/* Loyalty Program Summary */}
            <div className="card" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div className="flex-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h2 className="text-xl font-semibold">Loyalty Program</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <span className="text-sm text-muted">Program Status:</span>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={loyaltyActive}
                                onChange={handleToggleLoyalty}
                                style={{ marginRight: 'var(--spacing-sm)' }}
                            />
                            <span className={loyaltyActive ? 'text-success' : 'text-muted'}>
                                {loyaltyActive ? 'Active' : 'Inactive'}
                            </span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <div>
                        <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Total Members</div>
                        <div className="text-2xl font-bold">{mockLoyaltyProgram.members.toLocaleString()}</div>
                    </div>
                    <div>
                        <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Points Issued</div>
                        <div className="text-2xl font-bold">{(mockLoyaltyProgram.pointsIssued / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                        <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Points Redeemed</div>
                        <div className="text-2xl font-bold">{(mockLoyaltyProgram.pointsRedeemed / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                        <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Redemption Rate</div>
                        <div className="text-2xl font-bold text-success">{mockLoyaltyProgram.redemptionRate}%</div>
                    </div>
                </div>

                {/* Enhanced Points Graph */}
                <div style={{
                    marginTop: 'var(--spacing-xl)',
                    padding: 'var(--spacing-xl)',
                    background: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-lg)'
                }}>
                    <div className="text-sm font-semibold" style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-primary)' }}>
                        Points Overview
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 'var(--spacing-xl)'
                    }}>
                        {/* Issued */}
                        <div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'var(--spacing-md)'
                            }}>
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <div className="text-2xl font-bold" style={{
                                        marginBottom: 'var(--spacing-xs)',
                                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>
                                        {(mockLoyaltyProgram.pointsIssued / 1000).toFixed(0)}K
                                    </div>
                                    <div className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Points Issued
                                    </div>
                                </div>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
                                }}>
                                    <span style={{ fontSize: '2rem' }}>🎁</span>
                                </div>
                            </div>
                        </div>

                        {/* Redeemed */}
                        <div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'var(--spacing-md)'
                            }}>
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <div className="text-2xl font-bold" style={{
                                        marginBottom: 'var(--spacing-xs)',
                                        color: 'var(--color-success)'
                                    }}>
                                        {(mockLoyaltyProgram.pointsRedeemed / 1000).toFixed(0)}K
                                    </div>
                                    <div className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Points Redeemed
                                    </div>
                                </div>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'var(--color-success)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)'
                                }}>
                                    <span style={{ fontSize: '2rem' }}>✓</span>
                                </div>
                            </div>
                        </div>

                        {/* Outstanding */}
                        <div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'var(--spacing-md)'
                            }}>
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <div className="text-2xl font-bold" style={{
                                        marginBottom: 'var(--spacing-xs)',
                                        color: 'var(--color-warning)'
                                    }}>
                                        {(pointsOutstanding / 1000).toFixed(0)}K
                                    </div>
                                    <div className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Outstanding
                                    </div>
                                </div>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'var(--color-warning)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 16px rgba(245, 158, 11, 0.3)'
                                }}>
                                    <span style={{ fontSize: '2rem' }}>⏳</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginTop: 'var(--spacing-2xl)' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 'var(--spacing-sm)',
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-secondary)'
                        }}>
                            <span>Redemption Progress</span>
                            <span className="font-semibold" style={{ color: 'var(--color-success)' }}>
                                {mockLoyaltyProgram.redemptionRate}%
                            </span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '8px',
                            background: 'var(--color-bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${mockLoyaltyProgram.redemptionRate}%`,
                                height: '100%',
                                background: 'linear-gradient(to right, var(--color-success), #34d399)',
                                borderRadius: 'var(--radius-md)',
                                transition: 'width var(--transition-base)'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Offers Table */}
            <div className="card">
                <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>Active Offers</h2>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Offer Name</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Redemptions</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Redemption Rate</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Revenue Uplift</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockOffers.map((offer) => (
                                <tr
                                    key={offer.id}
                                    style={{ borderBottom: '1px solid var(--color-border)' }}
                                >
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                        {offer.name}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)' }}>
                                        <span className={`badge ${getStatusBadgeClass(offer.status)}`}>
                                            {offer.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right' }}>
                                        {offer.redemptions > 0 ? offer.redemptions.toLocaleString() : '—'}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: offer.redemptionRate > 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                                        {offer.redemptionRate > 0 ? `${offer.redemptionRate}%` : '—'}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', textAlign: 'right', fontWeight: 'var(--font-weight-semibold)' }}>
                                        {offer.revenueUplift > 0 ? `₹${(offer.revenueUplift / 1000).toFixed(0)}K` : '—'}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-xs)', justifyContent: 'flex-end' }}>
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => handleOfferAction(offer, 'View')}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => handleOfferAction(offer, 'Edit')}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => handleOfferAction(offer, 'Duplicate')}
                                            >
                                                Duplicate
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Loyalty;
