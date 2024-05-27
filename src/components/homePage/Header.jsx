import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="flex justify-between p-4">
      <div>
        <h1 className="text-4xl font-bold mb-2">👋 Good evening</h1>
        <p className="text-gray-600">Unlock your productivity potential. 🔒</p>
      </div>
      <div className="flex items-center">
        <FaUserCircle size={40} className="text-gray-600" />
      </div>
    </div>
  );
};

export default Header;
