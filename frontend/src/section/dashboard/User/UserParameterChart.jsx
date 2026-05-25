import React, {
  useEffect,
  useState,
} from "react";

import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

  Legend,

} from "recharts";

import {

  getMyDevices,

  getSensorDataByDeviceId,

} from "../../../services/services";

const UserParameterChart = () => {

  // ================= STATE =================

  const [devices, setDevices] =
    useState([]);

  const [selectedDevice, setSelectedDevice] =
    useState("");

  const [chartData, setChartData] =
    useState([]);

  const [latest, setLatest] =
    useState(null);

  const [status, setStatus] =
    useState("offline");

  // ================= SENSOR FIELDS =================

  const sensorFields = [

    {
      key: "flow",
      label: "Flow",
      color: "#2563eb",
    },

    {
      key: "volume",
      label: "Volume",
      color: "#16a34a",
    },

    {
      key: "cumulativeVolume",
      label:
        "Cumulative Volume",
      color: "#9333ea",
    },

    {
      key: "ph",
      label: "PH",
      color: "#f59e0b",
    },

    {
      key: "cod",
      label: "COD",
      color: "#dc2626",
    },

    {
      key: "bod",
      label: "BOD",
      color: "#0891b2",
    },

    {
      key: "turbidity",
      label:
        "Turbidity",
      color: "#7c3aed",
    },

    {
      key:
        "powerConsumption",
      label: "Power",
      color: "#ea580c",
    },

  ];

  // ================= FETCH DEVICES =================

  const fetchDevices =
    async () => {

      try {

        const response =
          await getMyDevices();

        const deviceList =
          response.data.data || [];

        setDevices(
          deviceList
        );

        // DEFAULT DEVICE
        if (
          deviceList.length > 0
        ) {

          setSelectedDevice(

            deviceList[0]
              .deviceId

          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  // ================= FETCH SENSOR DATA =================

  const fetchSensorData =
    async () => {

      try {

        if (
          !selectedDevice
        ) return;

        const response =
          await getSensorDataByDeviceId(
            selectedDevice
          );

        const sensorData =
          response.data.data || [];

        const latest20 =
          sensorData
            .slice(0, 20)
            .reverse();

        // GRAPH DATA
        const formatted =
          latest20.map(
            (item) => ({

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

            })
          );

        setChartData(
          formatted
        );

        // LATEST DATA
        if (
          sensorData.length > 0
        ) {

          const latestData =
            sensorData[0];

          setLatest(
            latestData
          );

          // STATUS
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

          setStatus(

            diffSeconds <= 10

              ? "online"

              : "offline"

          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  // ================= LOAD =================

  useEffect(() => {

    fetchDevices();

  }, []);

  // ================= AUTO REFRESH =================

  useEffect(() => {

    fetchSensorData();

    const interval =
      setInterval(() => {

        fetchSensorData();

      }, 3000);

    return () =>
      clearInterval(interval);

  }, [selectedDevice]);

  return (

    <div className="space-y-6">

      {/* SELECT DEVICE */}
      <div className="bg-white rounded-xl p-5 shadow">

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div>

            <h2 className="text-lg font-semibold">

              My Device Monitoring

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              Select device for realtime analytics

            </p>

          </div>

          {/* DROPDOWN */}
          <select
            value={
              selectedDevice
            }
            onChange={(e) =>
              setSelectedDevice(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
          >

            {devices.map(
              (device) => (

                <option
                  key={
                    device.id
                  }
                  value={
                    device.deviceId
                  }
                >

                  {
                    device.deviceName
                  }
                  {" - "}
                  {
                    device.deviceId
                  }

                </option>

              )
            )}

          </select>

        </div>

      </div>

      {/* STATUS */}
      <div className="flex items-center gap-3">

        <span
          className={`w-3 h-3 rounded-full

          ${
            status ===
            "online"

              ? "bg-green-500 animate-pulse"

              : "bg-red-500"
          }`}
        />

        <span className="font-medium capitalize">

          {status}

        </span>

      </div>

      {/* LIVE CARDS */}
      {latest && (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {sensorFields.map(
            (field) => (

              <div
                key={field.key}
                className="bg-white rounded-xl p-5 shadow"
              >

                <p className="text-sm text-gray-500">

                  {field.label}

                </p>

                <h2
                  className="text-2xl font-bold mt-2"
                  style={{
                    color:
                      field.color,
                  }}
                >

                  {latest[
                    field.key
                  ] ?? "-"}

                </h2>

              </div>

            )
          )}

        </div>

      )}

      {/* GRAPH */}
      <div className="bg-white rounded-xl p-5 shadow">

        <h2 className="font-semibold text-lg mb-5">

          Live Analytics

        </h2>

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

            {sensorFields.map(
              (field) => (

                <Line
                  key={field.key}
                  type="monotone"
                  dataKey={
                    field.key
                  }
                  stroke={
                    field.color
                  }
                  strokeWidth={2}
                  dot={false}
                />

              )
            )}

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default UserParameterChart;