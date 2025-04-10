import React from 'react';
import './DataItem.css';

interface DataItemProps {
    value: number;
    label: string;
    percentage: number;
}

const DataItem: React.FC<DataItemProps> = ({ value, label, percentage }) => (
    <div className="data-item">
        <div className="value">{value}</div>
        <div className="label">{label}</div>
        <div className="percentage">{percentage}%</div>
    </div>
);

export default DataItem;