import React from 'react';
import './InventoryItem.css';
import { InventoryItemProps } from '../types/InventoryItem';

const InventoryItem: React.FC<InventoryItemProps> = ({ stt, maVatTu, tenVatTu, donVi, soLuong }) => (
    <div className="inventory-item">
            <div className="stt">{stt}</div>
            <div className="ma-vat-tu">{maVatTu}</div>
            <div className="ten-vat-tu">{tenVatTu}</div>
            <div className="don-vi">{donVi}</div>
            <div className="so-luong">{soLuong}</div>
    </div>
);

export default InventoryItem;