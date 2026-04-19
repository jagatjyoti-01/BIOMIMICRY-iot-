import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

// 🔥 Generate Zig-Zag Data
const generateData = () => {
  const now = new Date();

  return Array.from({ length: 12 }).map((_, i) => {
    const base = Math.sin(i / 2) * 10;

    return {
      time: new Date(now.getTime() - (11 - i) * 60000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      ph: +(7 + Math.sin(i / 2) * 0.3 + Math.random() * 0.2).toFixed(2),
      tds: Math.floor(300 + base * 5 + Math.random() * 20),
      turbidity: +(2 + Math.sin(i / 1.5) * 1.5 + Math.random()).toFixed(1),
      chlorine: +(0.5 + Math.sin(i / 2) * 0.2 + Math.random() * 0.1).toFixed(2),
      power: +(10 + Math.sin(i / 1.8) * 3 + Math.random()).toFixed(1),
    };
  });
};

const UserParameterChart = () => {
  const [data, setData] = useState(generateData());

  const [visible, setVisible] = useState({
    ph: true,
    tds: false,
    turbidity: true,
    chlorine: true,
    power: true,
  });

  const status = "active";

  // 🔥 Live Update
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      const base = Math.sin(i / 2) * 10;

      const newPoint = {
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),

        ph: +(7 + Math.sin(i / 2) * 0.3 + Math.random() * 0.2).toFixed(2),
        tds: Math.floor(300 + base * 5 + Math.random() * 20),
        turbidity: +(2 + Math.sin(i / 1.5) * 1.5 + Math.random()).toFixed(1),
        chlorine: +(0.5 + Math.sin(i / 2) * 0.2 + Math.random() * 0.1).toFixed(2),
        power: +(10 + Math.sin(i / 1.8) * 3 + Math.random()).toFixed(1),
      };

      setData((prev) => [...prev.slice(1), newPoint]);
      i++;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggle = (key) => {
    setVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      {/* 🔥 TOP SECTION */}
      <div className="flex justify-between items-center mb-5">

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Device: DEV-001
          </h2>

          <div className="flex items-center gap-3 mt-1">

            {/* STATUS */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  status === "active"
                    ? "bg-green-500 animate-pulse"
                    : "bg-red-500"
                }`}
              />
              <span className="text-xs text-gray-500">
                {status === "active" ? "Active" : "Offline"}
              </span>
            </div>

            {/* DATE */}
            <span className="text-xs text-gray-400">
              {new Date().toLocaleString()}
            </span>

          </div>
        </div>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-md">
          Live
        </span>
      </div>

      {/* 🔥 TOGGLE BUTTONS */}
      <div className="flex gap-2 mb-4 flex-wrap">

        {[
          { key: "ph", label: "pH", color: "bg-blue-500" },
          { key: "tds", label: "TDS", color: "bg-yellow-500" },
          { key: "turbidity", label: "Turbidity", color: "bg-red-500" },
          { key: "chlorine", label: "Chlorine", color: "bg-indigo-500" },
          { key: "power", label: "Power", color: "bg-green-500" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => toggle(item.key)}
            className={`text-xs px-3 py-1 rounded-full flex items-center gap-2 transition ${
              visible[item.key]
                ? `${item.color} text-white`
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <span className="w-2 h-2 bg-white rounded-full" />
            {item.label}
          </button>
        ))}

      </div>

      {/* 🔥 GRAPH */}
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>

          {/* Gradients */}
          <defs>
            <linearGradient id="ph" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="tds" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="turbidity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="chlorine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="power" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <XAxis dataKey="time" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />

          <Tooltip />

          {visible.ph && <Area dataKey="ph" stroke="#3b82f6" fill="url(#ph)" />}
          {visible.tds && <Area dataKey="tds" stroke="#f59e0b" fill="url(#tds)" />}
          {visible.turbidity && <Area dataKey="turbidity" stroke="#ef4444" fill="url(#turbidity)" />}
          {visible.chlorine && <Area dataKey="chlorine" stroke="#6366f1" fill="url(#chlorine)" />}
          {visible.power && <Area dataKey="power" stroke="#10b981" fill="url(#power)" />}

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
};

export default UserParameterChart;