import Sidebar from "../component/sidebar/Sidebar";
import Header from "../component/header/Header";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 text-black">

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed(!collapsed)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header toggleSidebar={() => setCollapsed(!collapsed)} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2">
          {children}
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;