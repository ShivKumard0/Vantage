import React, { createContext, useContext, useState, useEffect } from 'react';
import { kpiData, projectsList, tasksList, teamMembers, risksList, activityFeed } from '../data/mockData';

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
    const [kpis, setKpis] = useState(kpiData);
    const [projects, setProjects] = useState(projectsList);
    const [tasks, setTasks] = useState(tasksList);
    const [team, setTeam] = useState(teamMembers);
    const [risks, setRisks] = useState(risksList);
    const [activities, setActivities] = useState(activityFeed);

    // Helper to get random item from array
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Simulation Logic
    useEffect(() => {
        const interval = setInterval(() => {
            const action = Math.random();

            // 30% chance to update a KPI
            if (action < 0.3) {
                setKpis(prev => prev.map(kpi => {
                    if (Math.random() > 0.5) return kpi; // Skip some

                    // Parse value if it's a number-like string (e.g. "$1.2M", "42")
                    let newValue = kpi.value;
                    if (kpi.id === 'budget') {
                        // Fluctuate budget slightly
                        const current = parseFloat(kpi.value.replace('$', '').replace('M', ''));
                        const change = (Math.random() - 0.5) * 0.01;
                        newValue = `$${(current + change).toFixed(2)}M`;
                    } else if (kpi.id === 'velocity') {
                        const current = parseInt(kpi.value);
                        const change = Math.floor((Math.random() - 0.5) * 5);
                        newValue = Math.max(0, current + change).toString();
                    } else if (kpi.id === 'resources') {
                        const current = parseInt(kpi.value.replace('%', ''));
                        const change = Math.floor((Math.random() - 0.5) * 5);
                        newValue = `${Math.min(100, Math.max(0, current + change))}%`;
                    }

                    // Update sparkline
                    const newSparkline = [...kpi.sparkline.slice(1), kpi.sparkline[kpi.sparkline.length - 1] + Math.floor((Math.random() - 0.5) * 10)];

                    return { ...kpi, value: newValue, sparkline: newSparkline };
                }));
            }

            // 30% chance to update Project Progress
            if (action > 0.3 && action < 0.6) {
                setProjects(prev => prev.map(p => {
                    if (p.status === 'Completed' || Math.random() > 0.3) return p;
                    const change = Math.floor(Math.random() * 3); // Increment by 0-2%
                    return { ...p, progress: Math.min(100, p.progress + change) };
                }));
            }

            // 20% chance to update Team Utilization
            if (action > 0.6 && action < 0.8) {
                setTeam(prev => prev.map(m => {
                    if (Math.random() > 0.3) return m;
                    const change = Math.floor((Math.random() - 0.5) * 10);
                    const newUtil = Math.min(100, Math.max(0, m.utilization + change));
                    let newStatus = m.status;
                    if (newUtil > 90) newStatus = 'Overloaded';
                    else if (newUtil < 50) newStatus = 'Available';
                    else newStatus = 'Active';
                    return { ...m, utilization: newUtil, status: newStatus };
                }));
            }

            // 10% chance to add Activity
            if (action > 0.9) {
                const newActivities = [
                    { type: 'success', message: 'Task completed: ' + getRandom(tasks).title, icon: '✅' },
                    { type: 'info', message: 'Team updated: ' + getRandom(team).name + ' utilization changed', icon: '👥' },
                    { type: 'warning', message: 'Risk check: ' + getRandom(risks).description, icon: '⚠️' },
                ];
                const newActivity = {
                    id: Date.now(),
                    ...getRandom(newActivities),
                    timestamp: 'Just now'
                };
                setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
            }

        }, 3000); // Run every 3 seconds

        return () => clearInterval(interval);
    }, [tasks, team, risks]);

    const toggleTask = (taskId) => {
        setTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, status: t.status === 'Done' ? 'In Progress' : 'Done' } : t
        ));
    };

    return (
        <SimulationContext.Provider value={{ kpis, projects, tasks, team, risks, activities, toggleTask }}>
            {children}
        </SimulationContext.Provider>
    );
};
