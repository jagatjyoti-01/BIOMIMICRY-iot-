import React, {
  useEffect,
  useState,
} from "react";

import {
  getDevices,
} from "../../services/services";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

const LiveMonitoring = () => {

  const [devices, setDevices] =
    useState([]);

  const navigate =
    useNavigate();

  // ================= FETCH DEVICES =================

  const fetchDevices =
    async () => {

      try {

        const response =
  await getDevices();

        setDevices(
          response.data.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchDevices();

  }, []);

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold">

          Live Monitoring

        </h1>

        <p className="text-gray-500 mt-1">

          Monitor all live IoT devices

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
                  Status
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {devices.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">

                    {item.deviceId}

                  </td>

                  <td className="p-3">

                    {item.deviceName}

                  </td>

                  <td className="p-3">

                    {item.location}

                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs

                      ${
                        item.isActive

                          ? "bg-green-100 text-green-700"

                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {item.isActive ? "Active" : "Inactive"}

                    </span>

                  </td>

                  {/* ACTION */}
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

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default LiveMonitoring;