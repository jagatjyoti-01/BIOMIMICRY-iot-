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
    <div className="bg-white rounded-xl p-6 mt-6 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-lg text-gray-800">
          Recent Alerts
        </h2>

        <select className="bg-gray-100 px-3 py-1 rounded-md text-sm outline-none">
          <option>Latest</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">

        {alerts.map((alert, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition"
          >
            {/* LEFT STRIP */}
            <div className="flex items-center gap-3">

              <div
                className={`w-1 h-10 rounded ${getSeverityColor(alert.severity)}`}
              />

              <div>
                <p className="text-sm font-medium text-gray-800">
                  {alert.device}
                </p>
                <p className="text-xs text-gray-500">
                  {alert.type}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {alert.time}
                </p>
              </div>
            </div>

            {/* BADGE */}
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${getSeverityBadge(
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