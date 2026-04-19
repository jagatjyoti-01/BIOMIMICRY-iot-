import React from "react";

const devices = [
  {
    id: "DEV-001",
    location: "Plant A",
    lastUpdated: "2 mins ago",
    status: "online",
    health: "Good",
  },
  {
    id: "DEV-014",
    location: "Plant B",
    lastUpdated: "10 mins ago",
    status: "offline",
    health: "Critical",
  },
  {
    id: "DEV-022",
    location: "Plant C",
    lastUpdated: "30 mins ago",
    status: "online",
    health: "Warning",
  },
  {
    id: "DEV-030",
    location: "Plant D",
    lastUpdated: "5 mins ago",
    status: "maintenance",
    health: "Maintenance",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "online":
      return "bg-green-100 text-green-600";
    case "offline":
      return "bg-red-100 text-red-600";
    default:
      return "bg-yellow-100 text-yellow-600";
  }
};

const getHealthStyle = (health) => {
  switch (health) {
    case "Good":
      return "text-green-600";
    case "Critical":
      return "text-red-600";
    case "Warning":
      return "text-yellow-600";
    default:
      return "text-blue-600";
  }
};

const DeviceTable = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm mt-4">

      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <h2 className="font-semibold text-lg text-gray-800">
          All Devices
        </h2>

        <button className="text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-5 py-3">Device</th>
              <th className="text-left px-5 py-3">Location</th>
              <th className="text-left px-5 py-3">Last Updated</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Health</th>
            </tr>
          </thead>

          <tbody>
            {devices.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition"
              >
                {/* Device */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-600">
                      {item.id.slice(-3)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        Sensor Unit
                      </p>
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td className="px-5 py-4 text-gray-600">
                  {item.location}
                </td>

                {/* Last Updated */}
                <td className="px-5 py-4 text-gray-500">
                  {item.lastUpdated}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Health */}
                <td className="px-5 py-4">
                  <span className={`font-medium ${getHealthStyle(item.health)}`}>
                    {item.health}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default DeviceTable;