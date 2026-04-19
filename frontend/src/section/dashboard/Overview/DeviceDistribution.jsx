const devices = [
  { id: "DEV-001", location: "Device A", status: "online" },
  { id: "DEV-014", location: "Device B", status: "offline" },
  { id: "DEV-022", location: "Device C", status: "maintenance" },
 
];

const getStatusColor = (status) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "offline":
      return "bg-red-500";
    default:
      return "bg-yellow-500";
  }
};

const DeviceDistribution = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Device Distribution
        </h3>
        <button className="text-sm bg-gray-100 px-3 py-1 rounded-md">
          View All
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-center mb-4">
        <div>
          <p className="text-gray-500 text-sm">Online</p>
          <h2 className="font-bold text-xl text-green-600">290</h2>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Offline</p>
          <h2 className="font-bold text-xl text-red-600">30</h2>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Maintenance</p>
          <h2 className="font-bold text-xl text-yellow-600">12</h2>
        </div>
      </div>

      {/* Device List */}
      <div className="space-y-6">
        {devices.map((device, i) => (
          <div key={i} className="flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs ${getStatusColor(
                  device.status
                )}`}
              >
                {device.id.slice(-3)}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  {device.id}
                </p>
                <p className="text-xs text-gray-500">
                  {device.location}
                </p>
              </div>
            </div>

            {/* Status */}
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
              {device.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceDistribution;