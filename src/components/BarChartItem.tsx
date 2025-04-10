import React from 'react';
import './BarChartItem.css';

interface BarChartItemProps {
    label: string;
    planned: number;
    actual: number;
    maxValue: number;
}

const BarChartItem: React.FC<BarChartItemProps> = ({ label, planned, actual, maxValue }) => {
    const plannedHeight = maxValue > 0 ? (planned / maxValue) * 100 : 0;
    const actualHeight = maxValue > 0 ? (actual / maxValue) * 100 : 0;

    return (
        <div className="bar-group">
            <div className="bar-label">{label}</div>
            <div className="bars">
                <div className="planned-bar" style={{ height: `${plannedHeight}px` }}>
                    {planned}
                </div>
                <div className="actual-bar" style={{ height: `${actualHeight}px` }}>
                    {actual}
                </div>
            </div>
        </div>
    );
};

export default BarChartItem;