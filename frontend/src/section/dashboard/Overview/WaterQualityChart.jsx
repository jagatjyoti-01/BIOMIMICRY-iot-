import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "pH", value: 7.2, color: "#3b82f6" },
  { name: "COD", value: 20, color: "#8b5cf6" },
  { name: "BOD", value: 10, color: "#6366f1" },
];

const WaterQualityChart = () => {
  return (
    <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-5 shadow-sm">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 md:gap-0 mb-3 md:mb-4">
        <h3 className="font-semibold text-sm md:text-base text-gray-800">
          Water Quality Overview
        </h3>
        <button className="text-xs md:text-sm bg-gray-100 px-2 md:px-3 py-1 rounded-md hover:bg-gray-200">
          Weekly
        </button>
      </div>

      {/* Chart */}
      <div className="flex justify-center relative">
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            innerRadius={45}
            outerRadius={60}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        {/* Center Text */}
        <div className="absolute top-[52px] md:top-[60px] text-center">
          <p className="text-xs text-gray-500">Avg Quality</p>
          <h2 className="font-bold text-base md:text-xl text-gray-800">Good</h2>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 mt-3 md:mt-4 text-xs md:text-sm text-gray-600">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1 justify-center">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: item.color }}
            ></span>
            <span className="truncate">{item.name}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterQualityChart;