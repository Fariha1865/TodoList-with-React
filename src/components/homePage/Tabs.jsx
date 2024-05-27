import React from 'react';

const Tabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex justify-center mb-4">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`mx-2 px-4 py-2 rounded ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
