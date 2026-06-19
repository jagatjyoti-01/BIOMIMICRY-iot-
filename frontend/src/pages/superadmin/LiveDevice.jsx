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
  Legend,
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

  const [activeChart, setActiveChart] =
    useState("all");

  // ================= SENSOR CONFIG =================

  const sensorFields = [

     {
      key: "volume",
      label: "Volume",
        unit: "KL",
      color: "#16a34a",
    },
      {
      key: "cumulativeVolume",
      label: "Cumulative Volume",
       unit: "KL",  
      color: "#9333ea",
    },

  {
      key: "powerConsumption",
      label: "Power",
       unit: "Kw",
      color: "#ea580c",
    },

    {
      key: "flow",
      label: "cumulative Power",
       unit: "Kwh",
      color: "#2563eb",
    },

   

  

    {
      key: "ph",
      label: "PH",
       unit: "",
      color: "#f59e0b",
    },

    {
      key: "cod",
      label: "COD",
       unit: "mg/L",
      color: "#dc2626",
    },

    {
      key: "bod",
      label: "BOD",
       unit: "mg/L",
      color: "#0891b2",
    },

    {
      key: "turbidity",
      label: "Turbidity",
      unit: "NTU",
      color: "#7c3aed",
    },

  

  ];

  // ================= FETCH DATA =================

  const fetchData =
    async () => {

      try {

        const response =
          await getSensorDataByDeviceId(
            deviceId
          );

        console.log(response);

        const sensorData =
          response?.data?.data || [];

        const latest20 =
          sensorData.slice(0, 20);

        setData(latest20);

        if (
          latest20.length > 0
        ) {

          const latestData =
            latest20[0];

          setLatest(
            latestData
          );

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

          setDeviceStatus(

            diffSeconds <= 10

              ? "online"

              : "offline"

          );

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

        flow:
          item.flow,

        volume:
          item.volume,

        cumulativeVolume:
          item.cumulativeVolume,

        ph:
          item.ph,

        cod:
          item.cod,

        bod:
          item.bod,

        turbidity:
          item.turbidity,

        powerConsumption:
          item.powerConsumption,

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

      {/* SENSOR CARDS */}

      {latest && (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">

          {sensorFields.map(
            (field) => (

              <div
                key={field.key}
                className="bg-white rounded-xl p-5 shadow"
              >

                <p className="text-gray-500 text-sm">

                  {field.label}

                </p>

                <h2
                  className="text-2xl font-bold mt-2"
                  style={{
                    color:
                      field.color,
                  }}
                >
{latest?.[field.key] ?? "-"} {field.unit}

                </h2>

              </div>

            )
          )}

        </div>

      )}

      {/* GRAPH */}

      <div className="bg-white rounded-xl p-5 shadow mb-6">

        <div className="flex justify-between items-center mb-5 flex-wrap gap-3">

          <h2 className="font-semibold text-lg">

            Live Sensor Analytics

          </h2>

          {/* FILTER BUTTONS */}

          <div className="flex gap-3 flex-wrap">

            <button
              onClick={() =>
                setActiveChart(
                  "all"
                )
              }
              className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer

              ${
                activeChart ===
                "all"

                  ? "bg-black text-white"

                  : "bg-gray-200"
              }`}
            >

              All

            </button>

            {sensorFields.map(
              (field) => (

                <button
                  key={field.key}
                  onClick={() =>
                    setActiveChart(
                      field.key
                    )
                  }
                  className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer

                  ${
                    activeChart ===
                    field.key

                      ? "text-white"

                      : "bg-gray-200"
                  }`}
                  style={{

                    backgroundColor:

                      activeChart ===
                      field.key

                        ? field.color

                        : "",

                  }}
                >

                 {field.label} {field.unit && `(${field.unit})`}

                </button>

              )
            )}

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={400}
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

            <Legend />

            {

              activeChart ===
              "all"

                ? (

                  sensorFields.map(
                    (field) => (

                     <Line
  key={field.key}
  type="monotone"
  dataKey={field.key}
  name={field.label}
  stroke={field.color}
  strokeWidth={2}
  dot={false}
/>

                    )
                  )

                )

                : (

                  <Line
                    type="monotone"
                    dataKey={
                      activeChart
                    }
                    stroke={
                      sensorFields.find(
                        (f) =>
                          f.key ===
                          activeChart
                      )?.color
                    }
                    strokeWidth={3}
                    dot={false}
                  />

                )

            }

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

                  Timestamp

                </th>

                {

                  sensorFields.map(
                    (field) => (

                      <th
                        key={
                          field.key
                        }
                        className="p-3 text-left"
                      >

                        {field.label} {field.unit && `(${field.unit})`}

                      </th>

                    )
                  )

                }

                

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={
                      sensorFields.length + 2
                    }
                    className="p-4 text-center"
                  >

                    Loading...

                  </td>

                </tr>

              ) : data.length > 0 ? (

                data.map(
                  (
                    item,
                    index
                  ) => (

                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3">

                        {item.deviceId}

                      </td>

                       <td className="p-3">

                        {new Date(
                          item.createdAt
                        ).toLocaleString()}

                      </td>


                      {

                        sensorFields.map(
                          (
                            field
                          ) => (

                            <td
                              key={
                                field.key
                              }
                              className="p-3"
                            >

                              {
                                item[
                                  field.key
                                ]
                              }

                            </td>

                          )
                        )

                      }

                     
                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan={
                      sensorFields.length + 2
                    }
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