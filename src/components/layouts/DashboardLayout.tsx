import React from 'react';
import './DashboardLayout.css';
import DataItem from '../DataItem';
import BarChartItem from '../BarChartItem';
import PieChart from '../PieChart';
import HorizontalBarChartItem from '../HorizontalBarChartItem';
import ProgressItem from '../ProgressItem';
import InventoryItem from '../InventoryItem';
import TopProductsSection from '../TopProductsSection';
// Import your types
import { DataItemProps } from 'types/DataItems';
import { PieChartData } from '/types/PieChartData';
import { HorizontalBarChartItemProps } from '/types/HorizontalBarChartItem';
import { ProgressItemProps } from '/types/ProgressItem';
import { InventoryItemProps } from '/types/InventoryItem.ts';


interface ProductionPlanItem {
    label: string;
    planned: number;
    actual: number;
}

const DashboardLayout: React.FC = () => {
    // Sample Data - Replace with your actual data fetching logic
    const topProductsData: DataItemProps[] = [
        { value: 48, label: 'Áo sơ mi dài tay', percentage: 8.2 },
        { value: 18, label: 'Quần tây', percentage: 5 },
        { value: 40, label: 'Áo hoodie', percentage: 12 },
        { value: 23, label: 'Đầm maxi', percentage: 3.5 },
        { value: 48, label: 'Áo thun cổ tròn', percentage: 4.7 },
    ];

    const productionPlanData: ProductionPlanItem[] = [
        { label: 'Tháng 1', planned: 50, actual: 40 },
        { label: 'Tháng 2', planned: 60, actual: 55 },
        { label: 'Tháng 3', planned: 75, actual: 85 },
        { label: 'Tháng 4', planned: 65, actual: 60 },
        { label: 'Tháng 5', planned: 45, actual: 35 },
        { label: 'Tháng 6', planned: 70, actual: 78 },
    ];

    const topCustomersData: HorizontalBarChartItemProps[] = [
        { label: 'Công ty thời trang XYZ', value: 1500, maxValue: 1500 },
        { label: 'Cửa hàng ABC', value: 1200, maxValue: 1500 },
        { label: 'Doanh nghiệp thời trang LMN', value: 900, maxValue: 1500 },
        { label: 'Shop quần áo PQR (Freelancer)', value: 1100, maxValue: 1500 },
        { label: 'Tổng kho thời trang STU', value: 1300, maxValue: 1500 },
    ].map(item => ({ ...item, maxValue: Math.max(...[1500, 1200, 900, 1100, 1300]) }));

    const productionStatusData: PieChartData[] = [
        { value: 35, color: '#FFC107', label: 'Chưa hoàn thành' },
        { value: 40, color: '#2196F3', label: 'Đang sản xuất' },
        { value: 25, color: '#4CAF50', label: 'Hoàn thành' },
    ];

    const productionProgressData: ProgressItemProps[] = [
        { label: 'Áo sơ mi dài tay', value: 523, total: 600 },
        { label: 'Áo sơ mi cộc tay', value: 321, total: 400 },
        { label: 'Quần baggy', value: 237, total: 300 },
        { label: 'Quần tây', value: 598, total: 700 },
        { label: 'Đầm maxi', value: 876, total: 1000 },
        { label: 'Áo hoodie', value: 765, total: 900 },
        { label: 'Áo khoác bomber', value: 543, total: 650 },
    ];

    const inventoryData: InventoryItemProps[] = [
        { stt: 1, maVatTu: 'VT001', tenVatTu: 'Chỉ cotton', donVi: 'Cuộn', soLuong: 150 },
        { stt: 2, maVatTu: 'VT002', tenVatTu: 'Vải lụa', donVi: 'Mét', soLuong: 200 },
        { stt: 3, maVatTu: 'VT003', tenVatTu: 'Vải thun', donVi: 'Mét', soLuong: 180 },
        { stt: 4, maVatTu: 'VT004', tenVatTu: 'Vải chống thấm', donVi: 'Mét', soLuong: 120 },
        { stt: 5, maVatTu: 'VT005', tenVatTu: 'Nút áo', donVi: 'Hạt', soLuong: 500 },
    ];

    return (
        <div className="dashboard-container">
            {/* Top Section */}
            <div className="top-section">
                {/*<div className="top-products-section">*/}
                {/*    <div className="section-header">Top Sản Phẩm Sản Xuất Nhiều Nhất</div>*/}
                {/*    <div className="data-items-grid">*/}
                {/*        {topProductsData.map((item, index) => (*/}
                {/*            <DataItem key={index} {...item} />*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="top-products-section-wrapper"> {/* Optional wrapper for layout */}
                    <TopProductsSection data={topProductsData} />
                </div>

                <div className="production-plan-section">
                    <div className="section-header">Kế Hoạch Sản Xuất</div>
                    <div className="bar-chart">
                        {productionPlanData.map((item, index) => (
                            <BarChartItem key={index} {...item} maxValue={Math.max(...productionPlanData.flatMap(p => [p.planned, p.actual]))} />
                        ))}
                        <div className="legend">
                            <div className="legend-item">
                                <div className="legend-color planned"></div>
                                <span>Kế hoạch</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color actual"></div>
                                <span>Thực hiện</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="top-customers-section">
                    <div className="section-header">Top 5 Khách Hàng Có Sản Lượng Nhiều Nhất</div>
                    <div className="horizontal-bar-chart">
                        {topCustomersData.map((item, index) => (
                            <HorizontalBarChartItem key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bottom-section">
                <div className="production-status-section">
                    <div className="section-header">Tình Hình Sản Xuất</div>
                    <PieChart data={productionStatusData} centerText={productionStatusData.reduce((sum, item) => sum + item.value, 0)} />
                </div>

                <div className="production-progress-section">
                    <div className="section-header">Tiến Độ Sản Xuất Theo Nhóm</div>
                    <div className="progress-list">
                        {productionProgressData.map((item, index) => (
                            <ProgressItem key={index} {...item} />
                        ))}
                    </div>
                </div>

                <div className="inventory-status-section">
                    <div className="section-header">Nguyên Vật Liệu Cần Mua</div>
                    <div className="inventory-list">
                        <div className="inventory-header">
                            <div className="stt">STT</div>
                            <div className="ma-vat-tu">Mã vật tư</div>
                            <div className="ten-vat-tu">Tên vật tư</div>
                            <div className="don-vi">Đơn vị</div>
                            <div className="so-luong">Số lượng</div>
                        </div>
                        {inventoryData.map((item, index) => (
                            <InventoryItem key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;