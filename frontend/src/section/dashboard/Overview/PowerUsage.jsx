const data = [
  { name: "Device A", dataPoints: 4556, power: "120 kWh" },
  { name: "Device B", dataPoints: 4125, power: "98 kWh" },
  { name: "Device C", dataPoints: 1796, power: "65 kWh" },
  { name: "Device D", dataPoints: 3827, power: "110 kWh" },
  { name: "Device E", dataPoints: 9894, power: "150 kWh" },
];

const PowerUsage = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Power Usage
        </h3>
        <button className="text-sm bg-gray-100 px-3 py-1 rounded-md">
          Weekly
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center">

            {/* Left */}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">
                {item.dataPoints.toLocaleString()} Data Points
              </p>
            </div>

            {/* Right */}
            <p className="font-semibold text-blue-600">
              {item.power}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerUsage;