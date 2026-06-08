import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getDevices } from "../../services/services";

function AdminDevice() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DEVICES (READ-ONLY) =================
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await getDevices();
      setDevices(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // ================= DATAGRID COLUMNS (NO EDIT/DELETE BUTTONS) =================
  const columns = [
    {
      field: "deviceId",
      headerName: "Device ID",
      flex: 1,
    },
    {
      field: "deviceName",
      headerName: "Device Name",
      flex: 1,
    },
    {
      field: "user",
      headerName: "Assigned User",
      flex: 1,
      renderCell: (params) => <span>{params.row.user?.name || "N/A"}</span>,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      renderCell: (params) => <span>{params.row.location || "-"}</span>,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => {
        return new Date(params.row.createdAt).toLocaleString();
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      renderCell: (params) => {
        return new Date(params.row.updatedAt).toLocaleString();
      },
    },
    {
      field: "isActive",
      headerName: "Health Status",
      width: 160,
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs mt-2 inline-block ${
            params.row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {params.row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4">
      {/* TITLE */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Device Management
        </h1>
        <p className="text-sm text-gray-600 mt-1">View Only - Read Access Only</p>
      </div>

      {/* TABLE */}
      <Paper elevation={0} className="">
        {/* HEADER */}
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-medium text-gray-700">All Devices</h2>
          <span className="text-sm text-gray-500">Total: {devices.length}</span>
        </div>

        {/* DATAGRID */}
        <div style={{ height: 550, width: "100%" }}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600">Loading devices...</p>
            </div>
          ) : (
            <DataGrid
              rows={devices}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              disableRowSelectionOnClick
              headerHeight={40}
              sx={{
                border: 0,
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1565c0 !important",
                  color: "#fff !important",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#1565c0 !important",
                  color: "#fff !important",
                },
                "& .MuiDataGrid-cell:hover": {
                  backgroundColor: "transparent",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f5f5f5 !important",
                },
              }}
            />
          )}
        </div>
      </Paper>
    </div>
  );
}

export default AdminDevice;
