import React from "react";
import CalendarCard from "./CalendarCard";

const systemStats = [
  { label: "Total Devices", value: "320", color: "bg-blue-50" },
  { label: "Active Devices", value: "290", color: "bg-green-50" },
  { label: "Offline Devices", value: "30", color: "bg-red-50" },
];

const quickAlerts = [
  { msg: "DEV-022 Offline", time: "2 mins ago" },
  { msg: "High pH (DEV-014)", time: "10 mins ago" },
  { msg: "Turbidity Spike (DEV-008)", time: "20 mins ago" },
];

const SystemStatusPanel = () => {
  return (
    <div className="w-[320px]">

      {/* Calendar */}
      <CalendarCard />

      {/* System Stats */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4">

        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          System Status
        </h3>

        <div className="space-y-3">
          {systemStats.map((item, i) => (
            <div
              key={i}
              className={`${item.color} rounded-lg p-3 flex justify-between`}
            >
              <span className="text-sm text-gray-600">
                {item.label}
              </span>
              <span className="font-semibold text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Quick Alerts */}
     {/* Quick Alerts */}
<div className="bg-white rounded-xl p-5 mt-4 shadow-sm">

  <h3 className="text-sm font-semibold text-gray-700 mb-4">
    Quick Alerts
  </h3>

  <div className="space-y-3">

    {quickAlerts.map((item, i) => (
      <div
        key={i}
        className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition"
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* Indicator */}
          <div className="w-1 h-8 bg-red-500 rounded" />

          <div>
            <p className="text-sm text-gray-800 font-medium">
              {item.msg}
            </p>
            <p className="text-xs text-gray-400">
              {item.time}
            </p>
          </div>

        </div>

        {/* Status dot */}
        <div className="w-2 h-2 bg-red-500 rounded-full" />
      </div>
    ))}

  </div>

  <button className="w-full text-sm text-blue-600 mt-4 font-medium hover:underline">
    View All Alerts
  </button>

</div>

      {/* Floating Settings Button */}
      <button className="fixed right-6 bottom-20 bg-blue-600 text-white w-12 h-12 rounded-md shadow-md hover:scale-105 transition">
        ⚙️
      </button>

    </div>
  );
};

export default SystemStatusPanel;