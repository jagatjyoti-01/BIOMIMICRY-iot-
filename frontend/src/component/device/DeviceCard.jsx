const DeviceCard = ({ device }) => {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{device.id}</h3>

        <span
          className={`text-xs px-2 py-1 rounded ${
            device.status === "online"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {device.status}
        </span>
      </div>

      {/* Info */}
      <p className="text-xs text-gray-500">
        Last updated: {device.lastUpdated}
      </p>

    </div>
  );
};

export default DeviceCard;