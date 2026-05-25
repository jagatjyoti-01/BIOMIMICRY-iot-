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

    <div className="p-6 bg-gray-100 ">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold">

          My Devices

        </h1>

        <p className="text-gray-500 mt-1">

          View your assigned devices

        </p>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-3 text-left">
                  Device ID
                </th>

                <th className="p-3 text-left">
                  Device Name
                </th>

                <th className="p-3 text-left">
                  Location
                </th>

                <th className="p-3 text-left">
                  Live Status
                </th>

                <th className="p-3 text-left">
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
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">

                      {
                        item.deviceId
                      }

                    </td>

                    <td className="p-3">

                      {
                        item.deviceName
                      }

                    </td>

                    <td className="p-3">

                      {
                        item.location
                      }

                    </td>

                    {/* STATUS */}
                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium

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
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 cursor-pointer"
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