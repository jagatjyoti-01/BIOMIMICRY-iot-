import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", active: 150, dataFlow: 400, alerts: 30 },
  { name: "Feb", active: 180, dataFlow: 500, alerts: 40 },
  { name: "Mar", active: 230, dataFlow: 700, alerts: 35 },
  { name: "Apr", active: 240, dataFlow: 600, alerts: 25 },
  { name: "May", active: 260, dataFlow: 900, alerts: 50 },
  { name: "Jun", active: 120, dataFlow: 400, alerts: 20 },
  { name: "Jul", active: 170, dataFlow: 500, alerts: 30 },
  { name: "Aug", active: 200, dataFlow: 600, alerts: 28 },
  { name: "Sep", active: 280, dataFlow: 900, alerts: 60 },
  { name: "Oct", active: 270, dataFlow: 800, alerts: 55 },
  { name: "Nov", active: 220, dataFlow: 700, alerts: 40 },
  { name: "Dec", active: 210, dataFlow: 600, alerts: 35 },
];

const DeviceActivity = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Device Activity Overview
        </h2>

        <select className="border border-gray-200 rounded-md px-3 py-1 text-sm">
          <option>Monthly</option>
        </select>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Active Devices
          </div>
          <p className="text-xl font-semibold mt-1">290</p>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Data Flow
          </div>
          <p className="text-xl font-semibold mt-1">1200/s</p>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Alerts
          </div>
          <p className="text-xl font-semibold mt-1">18</p>
        </div>

      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="active" stackId="a" fill="#22c55e" />
          <Bar dataKey="dataFlow" stackId="a" fill="#3b82f6" />
          <Bar dataKey="alerts" stackId="a" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default DeviceActivity;