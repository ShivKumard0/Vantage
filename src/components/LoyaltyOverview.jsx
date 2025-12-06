import React from 'react';
import { loyaltyProgram, activeOffers } from '../data/mockData';

function LoyaltyOverview() {
    const handleCreateOffer = () => {
        console.log('Create Offer clicked');
        alert('🎁 Create New Offer\n\nOffer Types:\n\n1. Percentage Discount\n   "Get 20% off your next purchase"\n\n2. Fixed Amount Discount\n   "Save ₹500 on orders above ₹2000"\n\n3. Buy X Get Y Free\n   "Buy 2, Get 1 Free"\n\n4. Free Shipping\n   "Free delivery on all orders"\n\n5. Loyalty Points Bonus\n   "2x points on weekend purchases"\n\n6. Bundle Offers\n   "Complete the look - Save 30%"');
    };

    const handleOfferClick = (offer) => {
        console.log(`Offer clicked: ${offer.name}`);
        alert(`🎁 ${offer.name}\n\nOffer Details:\n• Status: ${offer.status}\n• Channels: ${offer.channels.join(', ')}\n• Redemptions: ${offer.redemptions > 0 ? offer.redemptions.toLocaleString() : 'Not started'}\n• Revenue Impact: ${offer.revenue > 0 ? `₹${(offer.revenue / 1000).toFixed(0)}K` : 'Pending'}\n\nActions:\n• Edit offer terms\n• Change channels\n• View redemptions\n• Duplicate offer\n• ${offer.status === 'active' ? 'Pause' : offer.status === 'scheduled' ? 'Reschedule' : 'Reactivate'} offer`);
    };

    const handleLoyaltyProgramClick = () => {
        console.log('Loyalty Program clicked');
        alert(`💎 Loyalty Program Overview\n\nProgram Status: ${loyaltyProgram.active ? 'Active' : 'Inactive'}\n\nKey Metrics:\n• Total Members: ${loyaltyProgram.members.toLocaleString()}\n• Points Outstanding: ₹${(loyaltyProgram.pointsOutstanding / 1000000).toFixed(1)}M\n• Redemption Rate: ${loyaltyProgram.redemptionRate}%\n\nProgram Features:\n• Earn 1 point per ₹10 spent\n• Tier system (Silver, Gold, Platinum)\n• Birthday bonuses\n• Referral rewards\n• Exclusive member-only sales\n\nActions Available:\n• Manage tiers\n• Adjust point values\n• View member activity\n• Send loyalty campaigns\n• Download reports`);
    };

    return (
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h2 className="text-xl font-semibold" style={{ marginBottom: 'var(--spacing-lg)' }}>
                Loyalty & Offers
            </h2>

            {/* Loyalty Program Summary */}
            <div
                className="card card-clickable"
                style={{ marginBottom: 'var(--spacing-lg)' }}
                onClick={handleLoyaltyProgramClick}
            >
                <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3 className="text-lg font-semibold">Loyalty Program</h3>
                    <span className={`badge ${loyaltyProgram.active ? 'badge-success' : 'badge-neutral'}`}>
                        {loyaltyProgram.active ? 'Active' : 'Inactive'}
                    </span>
                </div>

                <div className="grid grid-3">
                    <div>
                        <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>
                            Total Members
                        </div>
                        <div className="text-2xl font-bold">
                            {loyaltyProgram.members.toLocaleString()}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>
                            Points Outstanding
                        </div>
                        <div className="text-2xl font-bold">
                            ₹{(loyaltyProgram.pointsOutstanding / 1000000).toFixed(1)}M
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>
                            Redemption Rate
                        </div>
                        <div className="text-2xl font-bold text-success">
                            {loyaltyProgram.redemptionRate}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Offers Table */}
            <div className="card">
                <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3 className="text-lg font-semibold">Active Offers</h3>
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={handleCreateOffer}
                    >
                        + Create Offer
                    </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Offer Name</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Channels</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Redemptions</th>
                                <th style={{ textAlign: 'right', padding: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeOffers.map((offer) => (
                                <tr
                                    key={offer.id}
                                    style={{
                                        borderBottom: '1px solid var(--color-border)',
                                        transition: 'background var(--transition-fast)',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleOfferClick(offer)}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                        {offer.name}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)' }}>
                                        <span className={`badge badge-${offer.status === 'active' ? 'success' : offer.status === 'scheduled' ? 'info' : 'neutral'}`}>
                                            {offer.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)' }}>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
                                            {offer.channels.map((channel, idx) => (
                                                <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                                                    {channel}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                        {offer.redemptions > 0 ? offer.redemptions.toLocaleString() : '—'}
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md) var(--spacing-sm)', fontSize: 'var(--font-size-sm)', textAlign: 'right', fontWeight: 'var(--font-weight-semibold)' }}>
                                        {offer.revenue > 0 ? `₹${(offer.revenue / 1000).toFixed(0)}K` : '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LoyaltyOverview;
