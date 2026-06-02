import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getMyDevices,
  getSensorDataByDeviceId,
} from "../../services/services";

const MyDevices = () => {

  const [devices, setDevices] =
    useState([]);

  const navigate =
    useNavigate();

  // ================= FETCH DEVICES =================

  const fetchDevices =
    async () => {

      try {

        const response =
          await getMyDevices();

        const allDevices =
          response.data.data;

        // LIVE STATUS
        const updatedDevices =
          await Promise.all(

            allDevices.map(
              async (device) => {

                try {

                  const sensorResponse =
                    await getSensorDataByDeviceId(
                      device.deviceId
                    );

                  const sensorData =
                    sensorResponse
                      ?.data
                      ?.data || [];

                  const latest =
                    sensorData[0];

                  let liveStatus =
                    "offline";

                  if (
                    latest &&
                    latest.createdAt
                  ) {

                    const currentTime =
                      new Date();

                    const lastDataTime =
                      new Date(
                        latest.createdAt
                      );

                    const diffSeconds =
                      (
                        currentTime -
                        lastDataTime
                      ) / 1000;

                    if (
                      diffSeconds <=
                      10
                    ) {

                      liveStatus =
                        "online";

                    }

                  }

                  return {

                    ...device,

                    liveStatus,

                  };

                } catch {

                  return {

                    ...device,

                    liveStatus:
                      "offline",

                  };

                }

              }
            )

          );

        setDevices(
          updatedDevices
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchDevices();

    const interval =
      setInterval(() => {

        fetchDevices();

      }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="p-3 sm:p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="mb-4 md:mb-6">

        <h1 className="text-xl md:text-2xl font-bold">

          My Devices

        </h1>

        <p className="text-xs md:text-sm text-gray-500 mt-1">

          View your assigned devices

        </p>

      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-3">
        {devices.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500">Device ID</p>
                <p className="font-semibold text-sm text-gray-800">{item.deviceId}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  item.liveStatus === "online"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.liveStatus}
              </span>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Device Name</p>
              <p className="font-medium text-sm text-gray-800">{item.deviceName}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-sm text-gray-800">{item.location}</p>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/dashboard/live-monitoring/${item.deviceId}`
                )
              }
              className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-xs md:text-sm hover:bg-blue-700 cursor-pointer transition"
            >
              Live Monitoring
            </button>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-3 text-left text-sm font-medium">
                  Device ID
                </th>

                <th className="p-3 text-left text-sm font-medium">
                  Device Name
                </th>

                <th className="p-3 text-left text-sm font-medium">
                  Location
                </th>

                <th className="p-3 text-left text-sm font-medium">
                  Live Status
                </th>

                <th className="p-3 text-left text-sm font-medium">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {devices.map(
                (
                  item,
                  index
                ) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-3 text-sm">

                      {
                        item.deviceId
                      }

                    </td>

                    <td className="p-3 text-sm">

                      {
                        item.deviceName
                      }

                    </td>

                    <td className="p-3 text-sm">

                      {
                        item.location
                      }

                    </td>

                    {/* STATUS */}
                    <td className="p-3">

                      <span
                        className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium

                        ${
                          item.liveStatus ===
                          "online"

                            ? "bg-green-100 text-green-700"

                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {
                          item.liveStatus
                        }

                      </span>

                    </td>

                    {/* BUTTON */}
                    <td className="p-3">

                      <button
                        onClick={() =>
                          navigate(

                            `/dashboard/live-monitoring/${item.deviceId}`

                          )
                        }
                        className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-md text-xs md:text-sm hover:bg-blue-700 cursor-pointer transition"
                      >

                        Live Monitoring

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default MyDevices;