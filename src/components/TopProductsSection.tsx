import React from 'react';
import './TopProductsSection.css'; // Create this CSS file
import DateFilterDropdown from './DateFilterDropdown';

interface TopProductItemProps {
    value: number;
    label: string;
    percentage: number;
}

const TopProductItem: React.FC<TopProductItemProps> = ({ value, label, percentage }) => (
    <div className="top-product-item">
        <div className="value">{value}</div>
        <div className="label">{label}</div>
        <div className="percentage">
      <span className={percentage > 0 ? 'positive' : 'negative'}>
        {percentage > 0 && '+'}
          {percentage}%
      </span>
        </div>
    </div>
);

interface TopProductsSectionProps {
    data: TopProductItemProps[];
}

const TopProductsSection: React.FC<TopProductsSectionProps> = ({ data }) => {
    const [sortBy, setSortBy] = React.useState('month'); // Default to 'month'

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
        // In a real application, you would trigger data refetching or sorting here
        console.log('Sorting by:', event.target.value);
    };

    return (
        <div className="top-products-section">
            <div className="section-header">
                <span className="section-title">Top Sản Phẩm Sản Xuất Nhiều Nhất</span>
                <div className="filter-dropdown-container">
                    <DateFilterDropdown
                        options={['Hôm nay', 'Tuần này', 'Tháng này', 'Năm']}
                        onSelect={(value) => console.log('Selected:', value)}
                    />
                </div>
            </div>
            <div className="top-products-grid">
                {data.map((item, index) => (
                    <TopProductItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default TopProductsSection;