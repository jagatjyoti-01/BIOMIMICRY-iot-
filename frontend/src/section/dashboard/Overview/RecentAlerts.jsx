import React from "react";

const alerts = [
  {
    device: "DEV-001",
    type: "High pH Level",
    severity: "High",
    time: "2 mins ago",
  },
  {
    device: "DEV-014",
    type: "Turbidity Spike",
    severity: "Medium",
    time: "10 mins ago",
  },
  {
    device: "DEV-022",
    type: "Device Offline",
    severity: "High",
    time: "30 mins ago",
  },
];

const getSeverityColor = (severity) => {
  switch (severity) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
};

const getSeverityBadge = (severity) => {
  switch (severity) {
    case "High":
      return "bg-red-100 text-red-600";
    case "Medium":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-green-100 text-green-600";
  }
};

const RecentAlerts = () => {
  return (
    <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 mt-3 md:mt-6 shadow-sm">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 md:gap-0 mb-3 md:mb-5">
        <h2 className="font-semibold text-base md:text-lg text-gray-800">
          Recent Alerts
        </h2>

        <select className="bg-gray-100 px-2 md:px-3 py-1 rounded-md text-xs md:text-sm outline-none">
          <option>Latest</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-2 md:space-y-3">

        {alerts.map((alert, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-50 rounded-lg p-2 md:p-4 hover:bg-gray-100 transition gap-2"
          >
            {/* LEFT STRIP */}
            <div className="flex items-center gap-2 md:gap-3 min-w-0">

              <div
                className={`w-1 h-8 md:h-10 rounded flex-shrink-0 ${getSeverityColor(alert.severity)}`}
              />

              <div className="min-w-0">
                <p className="text-xs md:text-sm font-medium text-gray-800 truncate">
                  {alert.device}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {alert.type}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {alert.time}
                </p>
              </div>
            </div>

            {/* BADGE */}
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${getSeverityBadge(
                alert.severity
              )}`}
            >
              {alert.severity}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
};

export default RecentAlerts;