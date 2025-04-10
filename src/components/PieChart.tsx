import React from 'react';
import './PieChart.css';
import { PieChartData } from '../types/PieChartData';

interface PieChartProps {
    data: PieChartData[];
    centerText: string | number;
}

const PieChart: React.FC<PieChartProps> = ({ data, centerText }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
        <div className="pie-chart-container">
            <svg width="100%" height="100%" viewBox="-1 -1 2 2">
                {data.map((item, index) => {
                    const percentage = (item.value / total) * 100;
                    const startAngle = 2 * Math.PI * (cumulativePercentage / 100);
                    const endAngle = 2 * Math.PI * ((cumulativePercentage + percentage) / 100);
                    const x1 = Math.cos(startAngle);
                    const y1 = Math.sin(startAngle);
                    const x2 = Math.cos(endAngle);
                    const y2 = Math.sin(endAngle);
                    const largeArcFlag = percentage > 50 ? 1 : 0;
                    const pathData = `M ${x1} ${y1} A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2} L 0 0`;
                    cumulativePercentage += percentage;
                    return <path key={index} d={pathData} fill={item.color} />;
                })}
                <circle cx="0" cy="0" r="0.6" fill="#fff" />
                <text x="0" y="0.2" textAnchor="middle" className="pie-center-text">
                    {centerText}
                </text>
                <text x="0" y="0.4" textAnchor="middle" className="pie-center-subtext">
                    Lệnh sản xuất
                </text>
            </svg>
            <div className="pie-chart-legend">
                {data.map((item, index) => (
                    <div className="legend-item" key={index}>
                        <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                        <div className="legend-label">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;