import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "pH", value: 7.2, color: "#3b82f6" },
  { name: "COD", value: 20, color: "#8b5cf6" },
  { name: "BOD", value: 10, color: "#6366f1" },
];

const WaterQualityChart = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Water Quality Overview
        </h3>
        <button className="text-sm bg-gray-100 px-3 py-1 rounded-md">
          Weekly
        </button>
      </div>

      {/* Chart */}
      <div className="flex justify-center relative">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        {/* Center Text */}
        <div className="absolute top-[70px] text-center">
          <p className="text-sm text-gray-500">Avg Quality</p>
          <h2 className="font-bold text-xl text-gray-800">Good</h2>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-4 text-sm text-gray-600">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: item.color }}
            ></span>
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterQualityChart;