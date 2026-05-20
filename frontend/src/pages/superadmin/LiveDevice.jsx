import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  getSensorDataByDeviceId,
} from "../../services/services";

const LiveDevice = () => {

  const { deviceId } =
    useParams();

  // ================= STATE =================

  const [data, setData] =
    useState([]);

  const [latest, setLatest] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [deviceStatus, setDeviceStatus] =
    useState("offline");

  // GRAPH FILTER
 const [activeChart, setActiveChart] =
  useState("both");

  // ================= FETCH DATA =================

  const fetchData =
    async () => {

      try {

        const response =
          await getSensorDataByDeviceId(
            deviceId
          );

        const sensorData =
          response.data.data || [];

        // ONLY LAST 20 ROWS
        const latest20 =
          sensorData.slice(0, 20);

        setData(latest20);

        // LATEST DATA
        if (
          latest20.length > 0
        ) {

          const latestData =
            latest20[0];

          setLatest(
            latestData
          );

          // ================= STATUS CHECK =================

          const currentTime =
            new Date();

          const lastDataTime =
            new Date(
              latestData.createdAt
            );

          const diffSeconds =
            (
              currentTime -
              lastDataTime
            ) / 1000;

          // IF DATA WITHIN 10 SEC
          if (
            diffSeconds <= 10
          ) {

            setDeviceStatus(
              "online"
            );

          } else {

            setDeviceStatus(
              "offline"
            );

          }

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  // ================= AUTO REFRESH =================

  useEffect(() => {

    fetchData();

    const interval =
      setInterval(() => {

        fetchData();

      }, 1000);

    return () =>
      clearInterval(interval);

  }, [deviceId]);

  // ================= GRAPH DATA =================

  const chartData =
    [...data]
      .reverse()
      .map((item) => ({

        time:
          new Date(
            item.createdAt
          ).toLocaleTimeString(),

        flow: item.flow,

        volume:
          item.volume,

      }));

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-2xl font-bold">

            Live Device Monitoring

          </h1>

          <p className="text-gray-500 mt-1">

            Device ID:
            {" "}
            {deviceId}

          </p>

        </div>

        {/* STATUS */}
        <div
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2

          ${
            deviceStatus ===
            "online"

              ? "bg-green-100 text-green-700"

              : "bg-red-100 text-red-700"
          }`}
        >

          <span
            className={`w-2 h-2 rounded-full animate-pulse

            ${
              deviceStatus ===
              "online"

                ? "bg-green-500"

                : "bg-red-500"
            }`}
          />

          {deviceStatus}

        </div>

      </div>

      {/* TOP CARDS */}
      {latest && (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          {/* FLOW */}
          <div className="bg-white rounded-xl p-5 shadow">

            <p className="text-gray-500 text-sm">

              Current Flow

            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-600">

              {latest.flow}

            </h2>

          </div>

          {/* VOLUME */}
          <div className="bg-white rounded-xl p-5 shadow">

            <p className="text-gray-500 text-sm">

              Current Volume

            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">

              {latest.volume}

            </h2>

          </div>

          {/* STATUS */}
          <div className="bg-white rounded-xl p-5 shadow">

            <p className="text-gray-500 text-sm">

              Device Status

            </p>

            <h2
              className={`text-3xl font-bold mt-2

              ${
                deviceStatus ===
                "online"

                  ? "text-green-600"

                  : "text-red-600"
              }`}
            >

              {deviceStatus}

            </h2>

          </div>

        </div>

      )}

      {/* GRAPH */}
      <div className="bg-white rounded-xl p-5 shadow mb-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="font-semibold text-lg">

            Live Sensor Analytics

          </h2>

          {/* FILTER BUTTONS */}
         {/* FILTER BUTTONS */}
<div className="flex gap-3">

  {/* BOTH */}
  <button
    onClick={() =>
      setActiveChart(
        "both"
      )
    }
    className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer

    ${
      activeChart ===
      "both"

        ? "bg-purple-600 text-white"

        : "bg-gray-100 text-gray-700"
    }`}
  >

    Both

  </button>

  {/* FLOW */}
  <button
    onClick={() =>
      setActiveChart(
        "flow"
      )
    }
    className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer

    ${
      activeChart ===
      "flow"

        ? "bg-blue-600 text-white"

        : "bg-gray-100 text-gray-700"
    }`}
  >

    Flow

  </button>

  {/* VOLUME */}
  <button
    onClick={() =>
      setActiveChart(
        "volume"
      )
    }
    className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer

    ${
      activeChart ===
      "volume"

        ? "bg-green-600 text-white"

        : "bg-gray-100 text-gray-700"
    }`}
  >

    Volume

  </button>

</div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={chartData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
            />

            <YAxis />

            <Tooltip />

            {/* FLOW */}
            {activeChart ===
              "flow" && (

              <Line
                type="monotone"
                dataKey="flow"
                stroke="#2563eb"
                strokeWidth={2}
              />

            )}

            {/* VOLUME */}
            {activeChart ===
              "volume" && (

              <Line
                type="monotone"
                dataKey="volume"
                stroke="#16a34a"
                strokeWidth={2}
              />

            )}


            {/* BOTH */}
{activeChart ===
  "both" && (

  <>

    <Line
      type="monotone"
      dataKey="flow"
      stroke="#2563eb"
      strokeWidth={2}
    />

    <Line
      type="monotone"
      dataKey="volume"
      stroke="#16a34a"
      strokeWidth={2}
    />

  </>

)}

{/* FLOW */}
{activeChart ===
  "flow" && (

  <Line
    type="monotone"
    dataKey="flow"
    stroke="#2563eb"
    strokeWidth={2}
  />

)}

{/* VOLUME */}
{activeChart ===
  "volume" && (

  <Line
    type="monotone"
    dataKey="volume"
    stroke="#16a34a"
    strokeWidth={2}
  />

)}

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-5 border-b">

          <h2 className="font-semibold text-lg">

            Latest Sensor Data

          </h2>

          <p className="text-sm text-gray-500 mt-1">

            Showing latest 20 records

          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-3 text-left">
                  Device ID
                </th>

                <th className="p-3 text-left">
                  Flow
                </th>

                <th className="p-3 text-left">
                  Volume
                </th>

                <th className="p-3 text-left">
                  Timestamp
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="4"
                    className="p-4 text-center"
                  >

                    Loading...

                  </td>

                </tr>

              ) : data.length > 0 ? (

                data.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">

                      {item.deviceId}

                    </td>

                    <td className="p-3">

                      {item.flow}

                    </td>

                    <td className="p-3">

                      {item.volume}

                    </td>

                    <td className="p-3">

                      {new Date(
                        item.createdAt
                      ).toLocaleString()}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="p-4 text-center"
                  >

                    No data found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default LiveDevice;