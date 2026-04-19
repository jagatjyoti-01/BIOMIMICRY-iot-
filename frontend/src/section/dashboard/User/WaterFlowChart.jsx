import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const generateData = () => {
  const now = new Date();

  return Array.from({ length: 10 }).map((_, i) => ({
    time: new Date(now.getTime() - (9 - i) * 60000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    flow: +(20 + Math.sin(i / 2) * 5 + Math.random() * 3).toFixed(1), // L/min
  }));
};

const WaterFlowChart = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      const newPoint = {
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        flow: +(20 + Math.sin(i / 2) * 5 + Math.random() * 3).toFixed(1),
      };

      setData((prev) => [...prev.slice(1), newPoint]);
      i++;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Water Flow Rate
          </h2>
          <p className="text-xs text-gray-400">
            Live flow (L/min)
          </p>
        </div>

        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-3 rounded-full">
          ● Running
        </span>
      </div>

      {/* CURRENT VALUE */}
      <h3 className="text-2xl font-bold text-blue-600 mb-3">
        {data[data.length - 1]?.flow} L/min
      </h3>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={170}>
        <LineChart data={data}>

          <XAxis dataKey="time" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="flow"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default WaterFlowChart;