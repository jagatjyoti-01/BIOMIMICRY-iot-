import React, { useState } from "react";
import { Upload } from "lucide-react";
import { importSensorData } from "../../services/services";

const ImportData = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      alert("Please select an Excel file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const result = await importSensorData(formData);

      alert(result.data.message);

      console.log(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Import Sensor Data</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />

        <p className="mt-3 text-gray-500">
          {file ? file.name : "Choose Excel File"}
        </p>
      </div>

      <button
        onClick={handleImport}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
      >
        <Upload size={18} />
        Import Data
      </button>
    </div>
  );
};

export default ImportData;
