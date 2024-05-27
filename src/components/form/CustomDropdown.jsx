import React, { useState } from 'react';

const CustomDropdown = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(option => option.value === value);

    return (
        <div className="relative">
            <div
                className="py-2 px-3 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center">
                   
                    <span className="font-bold">{selectedOption.label}</span>
                </span>
                <span>&#x25BC;</span>
            </div>
            {isOpen && (
                <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`py-2 px-3 cursor-pointer hover:bg-gray-200 ${option.color} flex items-center`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                           
                            <span className="font-bold">{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
