import React from 'react';
import './HorizontalBarChartItem.css';
import { HorizontalBarChartItemProps } from '../types/HorizontalBarChartItem';

const HorizontalBarChartItem: React.FC<HorizontalBarChartItemProps> = ({ label, value, maxValue }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
        <div className="horizontal-bar-chart-item">
            <div className="label">{label}</div>
            <div className="bar-container">
                <div className="bar" style={{ width: `${percentage}%` }}>
                    <div className="bar-value">{value.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalBarChartItem;