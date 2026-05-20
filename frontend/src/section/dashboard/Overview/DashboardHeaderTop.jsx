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
            <button onClick={()=>navigate("/dashboard/users")} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium">
              + Add User
            </button>

            <button onClick={()=>navigate("/dashboard/devices")} className="border cursor-pointer border-gray-300 px-4 py-2 rounded-md text-sm font-medium">
              + Add Device
            </button>
          </>
        );

      case "admin":
        return (
          <>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              + Add User
            </button>

            <button className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium">
              + Assign Device
            </button>
          </>
        );

      case "user":
        return (
          <>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              View Devices
            </button>

            <button className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium">
              Download Report
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          {getTitle()}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Monitor system , devices and analytics
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        {getActions()}
      </div>

    </div>
  );
};

export default DashboardHeaderTop;