import { useState } from "react";

const DownloadReport = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleDownload = (type) => {
    alert(`Downloading ${type} report from ${from} to ${to}`);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mt-6">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Download Report
      </h2>

      {/* Date Range */}
      <div className="flex gap-3 mb-4">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="bg-gray-100 px-3 py-2 rounded-md text-sm"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="bg-gray-100 px-3 py-2 rounded-md text-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => handleDownload("CSV")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Download CSV
        </button>

        <button
          onClick={() => handleDownload("PDF")}
          className="bg-gray-200 px-4 py-2 rounded-md text-sm"
        >
          Download PDF
        </button>
      </div>

    </div>
  );
};

export default DownloadReport;