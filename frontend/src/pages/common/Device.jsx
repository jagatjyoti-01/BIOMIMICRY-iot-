import React, { useEffect, useState } from "react";
import axios from "axios";

function Device() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://10.76.78.23:5000/api/v1/data/latest"
      );

      setData(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // auto refresh every 5 sec
    const interval = setInterval(() => {
      fetchData();
    },1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Device Data</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Device ID</th>
                <th className="p-3 text-left">Flow</th>
                <th className="p-3 text-left">Volume</th>
                <th className="p-3 text-left">Timestamp</th>
              </tr>
            </thead>

           <tbody>
  {data ? (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{data.deviceId}</td>
      <td className="p-3">{data.flow}</td>
      <td className="p-3">{data.volume}</td>
      <td className="p-3">
        {new Date(data.timestamp).toLocaleString()}
      </td>
    </tr>
  ) : (
    <tr>
      <td colSpan="4" className="p-3 text-center">
        No data found
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Device;