import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import KPIGrid from '../components/KPIGrid';
import QuickActions from '../components/QuickActions';
import PredictiveInsights from '../components/PredictiveInsights';
import SmartRecommendations from '../components/SmartRecommendations';
import SuccessScore from '../components/SuccessScore';
import CampaignPerformance from '../components/CampaignPerformance';
import JourneySnapshot from '../components/JourneySnapshot';
import SegmentSnapshot from '../components/SegmentSnapshot';
import LoyaltyOverview from '../components/LoyaltyOverview';
import ActivityFeed from '../components/ActivityFeed';

function Dashboard({ dateRange, showToast }) {
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [visibleWidgets, setVisibleWidgets] = useState({
        hero: true,
        score: true,
        recommendations: true,
        kpi: true,
        predictive: true,
        actions: true,
        campaigns: true,
        snapshots: true,
        loyalty: true,
        activity: true
    });

    const toggleWidget = (widget) => {
        setVisibleWidgets(prev => ({ ...prev, [widget]: !prev[widget] }));
    };

    return (
        <>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                <h2 className="text-xl font-bold">Dashboard</h2>
                <button
                    className={`btn ${isCustomizing ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setIsCustomizing(!isCustomizing)}
                >
                    {isCustomizing ? 'Done Customizing' : '✏️ Customize Layout'}
                </button>
            </div>

            {isCustomizing && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)', border: '2px dashed var(--color-primary)' }}>
                    <h4 className="font-semibold" style={{ marginBottom: 'var(--spacing-md)' }}>Show/Hide Widgets</h4>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                        {Object.keys(visibleWidgets).map(key => (
                            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={visibleWidgets[key]}
                                    onChange={() => toggleWidget(key)}
                                />
                                <span style={{ textTransform: 'capitalize' }}>{key}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {visibleWidgets.hero && <HeroSection dateRange={dateRange} />}
            {visibleWidgets.score && <SuccessScore />}
            {visibleWidgets.recommendations && <SmartRecommendations showToast={showToast} />}
            {visibleWidgets.kpi && <KPIGrid showToast={showToast} />}
            {visibleWidgets.predictive && <PredictiveInsights showToast={showToast} />}
            {visibleWidgets.actions && <QuickActions showToast={showToast} />}

            {visibleWidgets.campaigns && <CampaignPerformance showToast={showToast} />}

            {visibleWidgets.snapshots && (
                <div className="grid grid-2" style={{ marginTop: 'var(--spacing-2xl)' }}>
                    <JourneySnapshot showToast={showToast} />
                    <SegmentSnapshot showToast={showToast} />
                </div>
            )}

            {visibleWidgets.loyalty && <LoyaltyOverview showToast={showToast} />}
            {visibleWidgets.activity && <ActivityFeed showToast={showToast} />}
        </>
    );
}

export default Dashboard;
