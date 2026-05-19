import React, {
  useEffect,
  useState,
} from "react";

import {
  getDevices,
} from "../../../services/services";

// ================= STATUS STYLE =================

const getStatusStyle = (status) => {

  switch (status) {

    case "online":

      return "bg-green-100 text-green-600";

    case "offline":

      return "bg-red-100 text-red-600";

    default:

      return "bg-yellow-100 text-yellow-600";

  }

};

// ================= HEALTH STYLE =================

const getHealthStyle = (isActive) => {

  return isActive

    ? "text-green-600"

    : "text-red-600";

};

const DeviceTable = () => {

  // ================= STATE =================

  const [devices, setDevices] =
    useState([]);

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

  // ================= useEffect =================

  useEffect(() => {

    fetchDevices();

  }, []);

  return (

    <div className="bg-white rounded-xl overflow-hidden shadow-sm mt-4 border border-gray-200">

      {/* HEADER */}
      <div className="flex justify-between items-center p-5">

        <div>

          <h2 className="font-semibold text-lg text-gray-800">

            All Devices

          </h2>

          <p className="text-sm text-gray-500 mt-1">

            Real-time device monitoring overview

          </p>

        </div>

        <button className="text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 cursor-pointer">

          View All

        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          {/* TABLE HEADER */}
          <thead className="bg-gray-50 text-gray-600 border-y border-gray-200">

            <tr>

              <th className="text-left px-5 py-3">
                Device
              </th>

              <th className="text-left px-5 py-3">
                Location
              </th>

              <th className="text-left px-5 py-3">
                Last Updated
              </th>

              <th className="text-left px-5 py-3">
                Status
              </th>

              <th className="text-left px-5 py-3">
                Health
              </th>

            </tr>

          </thead>

          {/* TABLE BODY */}
          <tbody>

            {devices.map((item, index) => (

              <tr
                key={index}
                className="hover:bg-gray-50 transition border-b border-gray-100"
              >

                {/* DEVICE */}
                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    {/* ICON */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-600">

                      {item.deviceId?.slice(-3)}

                    </div>

                    {/* DETAILS */}
                    <div>

                      <p className="font-medium text-gray-800">

                        {item.deviceId}

                      </p>

                      <p className="text-xs text-gray-500">

                        {item.deviceName}

                      </p>

                    </div>

                  </div>

                </td>

                {/* LOCATION */}
                <td className="px-5 py-4 text-gray-600">

                  {item.location || "-"}

                </td>

                {/* LAST UPDATED */}
                <td className="px-5 py-4 text-gray-500">

                  {new Date(
                    item.updatedAt
                  ).toLocaleString()}

                </td>

                {/* STATUS */}
                <td className="px-5 py-4">

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusStyle(
                      item.status
                    )}`}
                  >

                    {item.status}

                  </span>

                </td>

                {/* HEALTH */}
                <td className="px-5 py-4">

                  <span
                    className={`font-medium ${getHealthStyle(
                      item.isActive
                    )}`}
                  >

                    {item.isActive
                      ? "Good"
                      : "Critical"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default DeviceTable;