import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import KPICard from './KPICard';

function KPIGrid({ showToast }) {
    const { kpis } = useSimulation();

    return (
        <div className="grid grid-5" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            {kpis.map((kpi) => (
                <KPICard key={kpi.id} data={kpi} showToast={showToast} />
            ))}
        </div>
    );
}

export default KPIGrid;
