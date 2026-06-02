import React from "react";

import {useNavigate} from "react-router-dom";

const DashboardHeaderTop = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = userData.role || "admin";

  const navigate = useNavigate();

  // TITLE
  const getTitle = () => {
    switch (userRole) {
      case "superadmin":
        return "Super Admin Dashboard";
      case "admin":
        return "Organization Dashboard";
      case "user":
        return "My Devices";
      default:
        return "Dashboard";
    }
  };

  // ACTION BUTTONS (IMPORTANT)
  const getActions = () => {
    switch (userRole) {

      case "superadmin":
        return (
          <>
            <button onClick={()=>navigate("/dashboard/users")} className="w-full sm:w-auto bg-blue-600 cursor-pointer text-white px-3 md:px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
              + Add User
            </button>

            <button onClick={()=>navigate("/dashboard/devices")} className="w-full sm:w-auto border cursor-pointer border-gray-300 px-3 md:px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition">
              + Add Device
            </button>
          </>
        );

      case "admin":
        return (
          <>
            <button className="w-full sm:w-auto bg-blue-600 text-white px-3 md:px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
              + Add User
            </button>

            <button className="w-full sm:w-auto border border-gray-300 px-3 md:px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition">
              + Assign Device
            </button>
          </>
        );

      case "user":
        return (
          <>
            <button onClick={()=>navigate("/dashboard/user/devices")} className="w-full sm:w-auto bg-blue-600 cursor-pointer text-white px-3 md:px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
              View Devices
            </button>

            <button onClick={()=>navigate("/dashboard/download-report")} className="w-full sm:w-auto border cursor-pointer border-gray-300 px-3 md:px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition">
             Download Report
            </button>
          </>
         
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">

      {/* TITLE */}
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          {getTitle()}
        </h1>

        <p className="text-xs md:text-sm text-gray-500 mt-1">
          Monitor system , devices and analytics
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        {getActions()}
      </div>

    </div>
  );
};

export default DashboardHeaderTop;