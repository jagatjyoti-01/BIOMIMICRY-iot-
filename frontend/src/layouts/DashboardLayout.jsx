import Sidebar from "../component/sidebar/Sidebar";
import Header from "../component/header/Header";

import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 text-black md:flex md:items-stretch">

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        isMobileOpen={mobileSidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={() => setMobileSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-0">

        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4">

          <Outlet />

        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;