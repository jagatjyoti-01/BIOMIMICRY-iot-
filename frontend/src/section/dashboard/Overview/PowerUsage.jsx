const data = [
  { name: "Device A", dataPoints: 4556, power: "120 kWh" },
  { name: "Device B", dataPoints: 4125, power: "98 kWh" },
  { name: "Device C", dataPoints: 1796, power: "65 kWh" },
  { name: "Device D", dataPoints: 3827, power: "110 kWh" },
  { name: "Device E", dataPoints: 9894, power: "150 kWh" },
];

const PowerUsage = () => {
  return (
    <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-5 shadow-sm">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 md:gap-0 mb-3 md:mb-4">
        <h3 className="font-semibold text-sm md:text-base text-gray-800">
          Power Usage
        </h3>
        <button className="text-xs md:text-sm bg-gray-100 px-2 md:px-3 py-1 rounded-md hover:bg-gray-200">
          Weekly
        </button>
      </div>

      {/* List */}
      <div className="space-y-2 md:space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center gap-2">

            {/* Left */}
            <div className="min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-800 truncate">
                {item.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {item.dataPoints.toLocaleString()} Data Points
              </p>
            </div>

            {/* Right */}
            <p className="font-semibold text-blue-600 text-xs md:text-sm flex-shrink-0">
              {item.power}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerUsage;