import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { getDashboardStats,
  getSensorAnalytics,} from "../../../services/services";

// ================= STATIC CHART DATA =================



const DeviceActivity = () => {

  // ================= STATE =================

  const [stats, setStats] = useState({

    totalDevices: 0,

    onlineDevices: 0,

    offlineDevices: 0,

    activeDevices: 0,

  });


  const [chartData, setChartData] =
  useState([]);


  const fetchAnalytics =
  async () => {

    try {

      const response =
        await getSensorAnalytics();

      // FORMAT DATA
      const formattedData =
        response.data.data.map(
          (item) => ({

            name: new Date(
              item.date
            ).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
              }
            ),

            flow: Number(
              item.flow
            ).toFixed(2),

            volume: Number(
              item.volume
            ).toFixed(2),

          })
        );

      setChartData(
        formattedData
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

  fetchStats();

  fetchAnalytics();

}, []);
  // ================= FETCH DASHBOARD STATS =================

  const fetchStats = async () => {

    try {

      const response =
        await getDashboardStats();

      setStats(response.data.data);

    } catch (error) {

      console.log(error);

    }

  };



  return (

    <div className="bg-white border border-gray-200 rounded-lg md:rounded-xl p-3 md:p-6 mt-3 md:mt-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 md:gap-0 mb-3 md:mb-5">

        <h2 className="text-base md:text-lg font-semibold text-gray-800">
          Device Activity Overview
        </h2>

        <select className="border border-gray-200 rounded-md px-2 md:px-3 py-1 text-xs md:text-sm outline-none">

          <option>
            Monthly
          </option>

        </select>

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">

        {/* ACTIVE DEVICES */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-2 md:p-4">

          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">

            <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />

            Active Devices

          </div>

          <p className="text-xl md:text-2xl font-semibold mt-2">

            {stats.activeDevices}

          </p>

        </div>

        {/* TOTAL DEVICES */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-2 md:p-4">

          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">

            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />

            Total Devices

          </div>

          <p className="text-xl md:text-2xl font-semibold mt-2">

            {stats.totalDevices}

          </p>

        </div>

        {/* OFFLINE DEVICES */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-2 md:p-4">

          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">

            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />

            Offline Devices

          </div>

          <p className="text-xl md:text-2xl font-semibold mt-2">

            {stats.offlineDevices}

          </p>

        </div>

      </div>

      {/* CHART */}
      <ResponsiveContainer
        width="100%"
        height={320}
      >

       <BarChart data={chartData}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

        <Bar
  dataKey="flow"
  fill="#3b82f6"
  radius={[4, 4, 0, 0]}
/>

<Bar
  dataKey="volume"
  fill="#10b981"
  radius={[4, 4, 0, 0]}
/>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
};

export default DeviceActivity;