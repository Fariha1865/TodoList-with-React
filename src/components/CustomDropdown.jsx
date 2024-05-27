import React, { useState } from 'react';
import { FaHome, FaBriefcase, FaUser, FaHeartbeat, FaGraduationCap, FaPlus } from 'react-icons/fa';

const defaultCategories = [
    { value: 'home', label: 'Home', icon: <FaHome />, color: 'bg-red-100' },
    { value: 'work', label: 'Work', icon: <FaBriefcase />, color: 'bg-blue-100' },
    { value: 'personal', label: 'Personal', icon: <FaUser />, color: 'bg-green-100' },
    { value: 'health', label: 'Health', icon: <FaHeartbeat />, color: 'bg-yellow-100' },
    { value: 'education', label: 'Education', icon: <FaGraduationCap />, color: 'bg-purple-100' },
];

const CustomDropdown = ({ selectedCategories, setSelectedCategories, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (optionValue) => {
        const updatedCategories = selectedCategories.includes(optionValue)
            ? selectedCategories.filter(cat => cat !== optionValue)
            : [...selectedCategories, optionValue];

        if (updatedCategories.length <= 3) {
            setSelectedCategories(updatedCategories);
        }
    };

    const selectedOptions = options.filter(option => selectedCategories.includes(option.value));

    return (
        <div className="relative">
            <div
                className="py-2 px-3 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center">
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map(option => (
                            <span key={option.value} className="mr-2 flex items-center">
                                {option.icon}
                                <span className="ml-1">{option.label}</span>
                            </span>
                        ))
                    ) : (
                        <span>Select categories</span>
                    )}
                </span>
                <span>&#x25BC;</span>
            </div>
            {isOpen && (
                <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`py-2 px-3 cursor-pointer hover:bg-gray-200 ${option.color} flex items-center ${selectedCategories.length >= 3 && !selectedCategories.includes(option.value) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => selectedCategories.length < 3 || selectedCategories.includes(option.value) ? handleOptionClick(option.value) : null}
                        >
                            <span className="mr-2">{option.icon}</span>
                            <span className="font-bold">{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
            {selectedCategories.length >= 3 && (
                <div className="text-red-500 text-sm mt-1">*Max 3 can be selected</div>
            )}
        </div>
    );
};

export default CustomDropdown;
