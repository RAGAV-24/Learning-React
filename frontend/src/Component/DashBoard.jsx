import React from "react";
import SideBar from "./SideBar";

const DashBoard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Our Page
        </h1>

        <iframe
          src="https://my.spline.design/untitled-b1927c46f06837617082b4d8800411ca/"
          frameBorder="0"
          className="w-[80%] h-[500px] rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default DashBoard;
