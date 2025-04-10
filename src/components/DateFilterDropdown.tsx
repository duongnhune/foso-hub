import React from 'react';
import calendarIconUrl from '../assets/icon/CalendarBlank.png'; // Import your PNG file
import './DateFilterDropdown.css';

interface DateFilterDropdownProps {
    defaultValue?: string;
    options: string[];
    onSelect: (value: string) => void;
}

const DateFilterDropdown: React.FC<DateFilterDropdownProps> = ({
                                                                   defaultValue = 'Tháng này',
                                                                   options,
                                                                   onSelect,
                                                               }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(defaultValue);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: string) => {
        setSelectedValue(value);
        onSelect(value);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="date-filter-dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                <img src={calendarIconUrl} alt="Calendar Icon" className="calendar-icon" /> {/* Use the <img> tag */}
                <span>{selectedValue}</span>
                <svg viewBox="0 0 24 24" className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
                    <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </svg>
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option) => (
                        <li
                            key={option}
                            className={`dropdown-option ${option === selectedValue ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DateFilterDropdown;