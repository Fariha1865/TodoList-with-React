import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="flex justify-between p-4 m-5">
      <div>
        <h1 className="text-4xl font-bold mb-2">👋 Welcome to TidyDo</h1>
        <p className="text-gray-600 ml-14">Simplify Your Day, One Task at a Time. 🔒</p>
      </div>
    </div>
  );
};

export default Header;
