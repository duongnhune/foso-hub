import React from 'react';
import './Header.css'; // Create this CSS file

function Header() {
    return (
        <div className="header">
            <div className="logo">HRP</div>
            <nav className="navigation">
                <a href="#">Dashboard</a>
                <a href="#">Mua & Nhập hàng</a>
                <a href="#">Bán & Xuất hàng</a>
                <a href="#">Kho & Sản xuất</a>
                <a href="#">Kế hoạch</a>
                <a href="#">Báo cáo & Thống kê</a>
                <a href="#">Tiện ích</a>
            </nav>
            <div className="user-info">
                {/* User profile and settings icons */}
                <input type="text" placeholder="Tìm kiếm..." className="search-input" />
                <div className="icons">
                    {/* Add your icons here (e.g., notifications, user profile) */}
                    <span>Icon 1</span>
                    <span>Icon 2</span>
                </div>
            </div>
        </div>
    );
}

export default Header;