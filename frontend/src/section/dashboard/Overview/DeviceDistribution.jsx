import React, {
  useEffect,
  useState,
} from "react";

import {
  getDevices,
} from "../../../services/services";

const getStatusColor = (status) => {

  switch (status) {

    case "online":
      return "bg-green-500";

    case "offline":
      return "bg-red-500";

    default:
      return "bg-yellow-500";

  }

};

const DeviceDistribution = () => {

  // ================= DEVICES =================

  const [devices, setDevices] =
    useState([]);

  // ================= STATS =================

  const [stats, setStats] =
    useState({

      online: 0,

      offline: 0,

      maintenance: 0,

    });

  // ================= FETCH DEVICES =================

  const fetchDevices =
    async () => {

      try {

        const response =
          await getDevices();

        const data =
          response.data.data;

        // SAVE DEVICES
        setDevices(data);

        // CALCULATE COUNTS
        const online =
          data.filter(
            (item) =>
              item.status === "online"
          ).length;

        const offline =
          data.filter(
            (item) =>
              item.status === "offline"
          ).length;

        const maintenance =
          data.filter(
            (item) =>
              item.status === "maintenance"
          ).length;

        // SAVE STATS
        setStats({

          online,

          offline,

          maintenance,

        });

      } catch (error) {

        console.log(error);

      }

    };

  // ================= useEffect =================

  useEffect(() => {

    fetchDevices();

  }, []);

  return (

    <div className="bg-white rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <h3 className="font-semibold text-gray-800">

          Device Distribution

        </h3>

        <button className="text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 cursor-pointer">

          View All

        </button>

      </div>

      {/* Stats */}
      <div className="flex justify-between text-center mb-4">

        {/* ONLINE */}
        <div>

          <p className="text-gray-500 text-sm">

            Online

          </p>

          <h2 className="font-bold text-xl text-green-600">

            {stats.online}

          </h2>

        </div>

        {/* OFFLINE */}
        <div>

          <p className="text-gray-500 text-sm">

            Offline

          </p>

          <h2 className="font-bold text-xl text-red-600">

            {stats.offline}

          </h2>

        </div>

        {/* MAINTENANCE */}
        <div>

          <p className="text-gray-500 text-sm">

            Maintenance

          </p>

          <h2 className="font-bold text-xl text-yellow-600">

            {stats.maintenance}

          </h2>

        </div>

      </div>

      {/* Device List */}
      <div className="space-y-6">

        {devices.slice(0, 4).map((device, i) => (

          <div
            key={i}
            className="flex items-center justify-between"
          >

            {/* LEFT */}
            <div className="flex items-center gap-3">

              {/* ICON */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs ${getStatusColor(
                  device.status
                )}`}
              >

                {device.deviceId?.slice(-3)}

              </div>

              {/* DETAILS */}
              <div>

                <p className="text-sm font-medium text-gray-800">

                  {device.deviceId}

                </p>

                <p className="text-xs text-gray-500">

                  {device.location || "-"}

                </p>

              </div>

            </div>

            {/* STATUS */}
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">

              {device.status}

            </span>

          </div>

        ))}

      </div>

    </div>

  );

};

export default DeviceDistribution;