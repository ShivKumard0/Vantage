import React from 'react';
import { kpiData } from '../data/mockData';
import KPICard from './KPICard';

function KPIGrid({ showToast }) {
    return (
        <div className="grid grid-5" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            {kpiData.map((kpi) => (
                <KPICard key={kpi.id} data={kpi} showToast={showToast} />
            ))}
        </div>
    );
}

export default KPIGrid;
