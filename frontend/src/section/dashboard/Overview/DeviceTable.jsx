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

    <div className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm mt-3 md:mt-4 border border-gray-200">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 md:p-5">

        <div>

          <h2 className="font-semibold text-base md:text-lg text-gray-800">

            All Devices

          </h2>

          <p className="text-xs md:text-sm text-gray-500 mt-1">

            Real-time device monitoring overview

          </p>

        </div>

        <button className="text-xs md:text-sm bg-gray-100 px-2 md:px-3 py-1 rounded-md hover:bg-gray-200 cursor-pointer">

          View All

        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full text-xs md:text-sm">

          {/* TABLE HEADER */}
          <thead className="bg-gray-50 text-gray-600 border-y border-gray-200">

            <tr>

              <th className="text-left px-2 md:px-5 py-2 md:py-3">
                Device
              </th>

              <th className="text-left px-2 md:px-5 py-2 md:py-3 hidden sm:table-cell">
                Location
              </th>

              <th className="text-left px-2 md:px-5 py-2 md:py-3 hidden md:table-cell">
                Last Updated
              </th>

              <th className="text-left px-2 md:px-5 py-2 md:py-3">
                Status
              </th>

              <th className="text-left px-2 md:px-5 py-2 md:py-3 hidden sm:table-cell">
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
                <td className="px-2 md:px-5 py-2 md:py-4">

                  <div className="flex items-center gap-2 md:gap-3">

                    {/* ICON */}
                    <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-600 flex-shrink-0">

                      {item.deviceId?.slice(-3)}

                    </div>

                    {/* DETAILS */}
                    <div className="min-w-0">

                      <p className="font-medium text-gray-800 truncate text-xs md:text-sm">

                        {item.deviceId}

                      </p>

                      <p className="text-xs text-gray-500 truncate">

                        {item.deviceName}

                      </p>

                    </div>

                  </div>

                </td>

                {/* LOCATION */}
                <td className="px-2 md:px-5 py-2 md:py-4 text-gray-600 hidden sm:table-cell text-xs md:text-sm">

                  {item.location || "-"}

                </td>

                {/* LAST UPDATED */}
                <td className="px-2 md:px-5 py-2 md:py-4 text-gray-500 hidden md:table-cell text-xs md:text-sm">

                  {new Date(
                    item.updatedAt
                  ).toLocaleString()}

                </td>

                {/* STATUS */}
                <td className="px-2 md:px-5 py-2 md:py-4">

                  <span
                    className={`text-xs px-2 md:px-3 py-1 rounded-full font-medium capitalize ${getStatusStyle(
                      item.status
                    )}`}
                  >

                    {item.status}

                  </span>

                </td>

                {/* HEALTH */}
                <td className="px-2 md:px-5 py-2 md:py-4 hidden sm:table-cell">

                  <span
                    className={`font-medium text-sm ${getHealthStyle(
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