import React, {
  useEffect,
  useState,
} from "react";

import {

  getMyDevices,

  getDevices,

  downloadSensorReport,

} from "../../services/services";

import { saveAs }
from "file-saver";

const DownloadReport = () => {

  // ================= USER =================

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );

  const role =
    user.role;

  // ================= STATE =================

  const [devices, setDevices] =
    useState([]);

  const [deviceId, setDeviceId] =
    useState("");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= FETCH DEVICES =================

  const fetchDevices =
    async () => {

      try {

        let response;

        // SUPERADMIN
        if (
          role ===
          "superadmin"
        ) {

          response =
            await getDevices();

        }

        // USER
        else {

          response =
            await getMyDevices();

        }

        const deviceList =
          response.data.data || [];

        setDevices(
          deviceList
        );

        // DEFAULT SELECT
        if (
          deviceList.length > 0
        ) {

          setDeviceId(

            deviceList[0]
              .deviceId

          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchDevices();

  }, []);

  // ================= DOWNLOAD REPORT =================

  const handleDownload =
    async () => {

      try {

        // VALIDATION
        if (

          !deviceId ||

          !fromDate ||

          !toDate

        ) {

          alert(
            "Please select all fields"
          );

          return;

        }

        setLoading(true);

        const response =
          await downloadSensorReport({

            deviceId,

            fromDate,

            toDate,

          });

        const reportData =
          response.data.data;

        // NO DATA
        if (
          reportData.length === 0
        ) {

          alert(
            "No report data found"
          );

          return;

        }

        // ================= CSV HEADERS =================

        const headers = [

          "Device ID",

          "Flow",

          "Volume",

          "Cumulative Volume",

          "PH",

          "COD",

          "BOD",

          "Turbidity",

          "Power Consumption",

          "Timestamp",

        ];

        // ================= CSV ROWS =================

        const rows =
          reportData.map(
            (item) => [

              item.deviceId,

              item.flow,

              item.volume,

              item.cumulativeVolume,

              item.ph,

              item.cod,

              item.bod,

              item.turbidity,

              item.powerConsumption,

              new Date(
                item.createdAt
              ).toLocaleString(),

            ]
          );

        // ================= CREATE CSV =================

        const csvContent =

          [

            headers,

            ...rows,

          ]

            .map((e) =>
              e.join(",")
            )

            .join("\n");

        // ================= CREATE FILE =================

        const blob =
          new Blob(

            [csvContent],

            {

              type:
                "text/csv;charset=utf-8;",

            }

          );

        // ================= DOWNLOAD =================

        saveAs(

          blob,

          `${deviceId}-report.csv`

        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="bg-white rounded-xl shadow p-6">

      {/* HEADER */}
      <div className="mb-5">

        <h2 className="text-xl font-semibold text-gray-800">

          Download Sensor Report

        </h2>

        <p className="text-sm text-gray-500 mt-1">

          Export IoT sensor analytics report

        </p>

      </div>

      {/* FORM */}
      <div className="space-y-5">

        {/* DEVICE */}
        <div>

          <label className="block text-sm font-medium mb-2">

            Select Device

          </label>

          <select
            value={deviceId}
            onChange={(e) =>
              setDeviceId(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
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

                    device.user?.name ||

                    "User"

                  }

                  {" - "}

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

        {/* FROM DATE */}
        <div>

          <label className="block text-sm font-medium mb-2">

            From Date

          </label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
          />

        </div>

        {/* TO DATE */}
        <div>

          <label className="block text-sm font-medium mb-2">

            To Date

          </label>

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleDownload}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition cursor-pointer"
        >

          {

            loading

              ? "Downloading..."

              : "Download CSV Report"

          }

        </button>

      </div>

    </div>

  );

};

export default DownloadReport;