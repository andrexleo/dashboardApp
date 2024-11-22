import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sliderbar from "../components/sliderbar/Sliderbar";
import Header from "../components/header/Header";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-row bg-white h-screen w-screen left-0 gap-2">
      {/* Pasar el valor correcto de isSidebarOpen */}
      
      <Sliderbar isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-col flex-1">
        {/* Pasar toggleSidebar como prop */}
        <Header toggleSidebar={toggleSidebar} />
        <div className=" flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
