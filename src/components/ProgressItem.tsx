import React from 'react';
import './ProgressItem.css';
import { ProgressItemProps } from '../types/ProgressItem';

const ProgressItem: React.FC<ProgressItemProps> = ({ label, value, total }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
        <div className="progress-item">
            <div className="label">{label}</div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }}>
                    <div className="progress-value">{value} / {total} ({percentage.toFixed(0)}%)</div>
                </div>
            </div>
        </div>
    );
};

export default ProgressItem;