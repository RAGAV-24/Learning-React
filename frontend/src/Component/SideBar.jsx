import React, { useState } from 'react';
import { HiArrowCircleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();
  return (
    <div className="relative h-screen flex">
      {/* Sidebar Toggle Button (Always Visible at Center Left) */}
      {!isOpen && (
        <button
          className="fixed left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-md hover:bg-gray-700"
          onClick={() => setIsOpen(true)}
        >
          <HiArrowCircleRight />
        </button>
      )}

      {/* Sidebar (Shows when isOpen is true) */}
      {isOpen && (
        <div className="w-64 h-full bg-gray-800 text-white transition-all duration-300 p-4 flex flex-col justify-between shadow-lg">
          {/* Close Button */}
          <button
            className="mb-4 text-lg font-bold ml-45"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>

          {/* Navigation Items */}
          <nav className="space-y-4">
            <div className="p-3 hover:bg-gray-700 rounded-md cursor-pointer">Profile</div>
            <div className="p-3 hover:bg-gray-700 rounded-md cursor-pointer" onClick={() => navigate("/upload")} >Upload</div>
            <div className="p-3 hover:bg-gray-700 rounded-md cursor-pointer">View</div>
          </nav>

          {/* Logout Button at Bottom */}
          <div className="mt-auto">
            <div className="p-3 hover:bg-red-600 rounded-md cursor-pointer text-center" >Logout</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
