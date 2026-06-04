import { useEffect, useState } from "react";

import {
  TextField,
  Button,
  Paper,
  Autocomplete,
  MenuItem,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import {
  createDevice,
  getDevices,
  getUsers,
  updateDevice,
  deleteDevice,
} from "../../services/services";

function Device() {
  const [devices, setDevices] = useState([]);

  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    deviceId: "",
    deviceName: "",
    status: "active",
     location: "",
  });

  const [openEdit, setOpenEdit] = useState(false);

  const [editData, setEditData] = useState({
    id: "",
    deviceId: "",
    deviceName: "",
    userId: "",
    status: "",
    location: "",
    isActive: "",
  });

  // ================= FETCH USERS =================

  const handleEdit = (device) => {
    setEditData({
      id: device.id,
      deviceId: device.deviceId,
      deviceName: device.deviceName,
      userId: device.userId,
      status: device.status,
      location: device.location,
      isActive: device.isActive,
    });

    setOpenEdit(true);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateDevice(editData.id, editData);

      alert("Device updated successfully");

      setOpenEdit(false);

      fetchDevices();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDevice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this device?")) return;

    try {
      await deleteDevice(id);
      alert("Device deleted successfully");
      fetchDevices();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH DEVICES =================

  const fetchDevices = async () => {
    try {
      const response = await getDevices();

      setDevices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDevices();
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= CREATE DEVICE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDevice({
        ...formData,
        userId: selectedUser?.id,
      });

      alert("Device created successfully");

      // reset
      setFormData({
        deviceId: "",
        deviceName: "",
        status: "active",
         location: "",
      });

      setSelectedUser(null);

      fetchDevices();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DATAGRID COLUMNS =================

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
      field: "Location",
      headerName: "Location",
      flex: 1,

      renderCell: (params) => <span>{params.row.location || "-"}</span>,
    },

    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,

    //   renderCell: (params) => (
    //     <span
    //       className={`px-3 py-1 rounded-full text-xs capitalize mt-2 inline-block
    //       ${
    //         params.row.status === "active"
    //           ? "bg-green-100 text-green-700"
    //           : "bg-red-100 text-red-700"
    //       }`}
    //     >
    //       {params.row.status}
    //     </span>
    //   ),
    // },

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
          className={`px-3 py-1 rounded-full text-xs mt-2 inline-block

      ${
        params.row.isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
        >
          {params.row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,

      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-3 py-1 cursor-pointer rounded text-xs mt-2"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </button>

          <button
            className="bg-red-600 text-white px-3 py-1 cursor-pointer rounded text-xs mt-2"
            onClick={() => handleDeleteDevice(params.row.id)}
          >
            Delete
          </button>
        </div>
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
      </div>

      {/* CREATE DEVICE */}
      <Paper elevation={0} className="p-4  mb-5">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          {/* DEVICE ID */}
          <TextField
            label="Device ID"
            name="deviceId"
            size="small"
            value={formData.deviceId}
            onChange={handleChange}
            fullWidth
          />

          {/* DEVICE NAME */}
          <TextField
            label="Device Name"
            name="deviceName"
            size="small"
            value={formData.deviceName}
            onChange={handleChange}
            fullWidth
          />

          {/* ASSIGN USER */}
          <Autocomplete
            options={users}
            value={selectedUser}
            onChange={(event, newValue) => setSelectedUser(newValue)}
            getOptionLabel={(option) => option.name || ""}
            renderInput={(params) => (
              <TextField {...params} label="Assign User" size="small" />
            )}
          />

          {/* STATUS */}
          <TextField
            select
            label="Status"
            name="status"
            size="small"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="active">Active</MenuItem>

            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>

        <TextField
  label="Location"
  name="location"
  size="small"
  value={formData.location}
  onChange={handleChange}
  fullWidth
/>

          {/* BUTTON */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1565c0",
              height: "40px",

              "&:hover": {
                backgroundColor: "#0d47a1",
              },
            }}
          >
            CREATE DEVICE
          </Button>
        </form>
      </Paper>

      {/* TABLE */}
      <Paper elevation={0} className="">
        {/* HEADER */}
        <div className="px-4 py-3  flex items-center justify-between">
          <h2 className="font-medium text-gray-700">All Devices</h2>

          <span className="text-sm text-gray-500">Total: {devices.length}</span>
        </div>

        {/* DATAGRID */}
        <div style={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={devices}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableRowSelectionOnClick
            headerHeight={40}
            sx={{
              border: 0,

              // HEADER
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1565c0 !important",
                color: "#fff !important",
              },

              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#1565c0 !important",
                color: "#fff !important",
              },

              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#fff !important",
              },

              // FOOTER
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#1565c0 !important",
                color: "#fff !important",
              },

              "& .MuiTablePagination-root": {
                color: "#fff !important",
              },
            }}
          />
        </div>
      </Paper>

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Device</DialogTitle>

        <DialogContent>
          <div className="grid grid-cols-1 gap-4 mt-2">
            {/* DEVICE ID */}
            <TextField
              label="Device ID"
              name="deviceId"
              size="small"
              value={editData.deviceId}
              onChange={handleEditChange}
              fullWidth
            />

            {/* DEVICE NAME */}
            <TextField
              label="Device Name"
              name="deviceName"
              size="small"
              value={editData.deviceName}
              onChange={handleEditChange}
              fullWidth
            />

            {/* LOCATION */}
            <TextField
              label="Location"
              name="location"
              size="small"
              value={editData.location}
              onChange={handleEditChange}
              fullWidth
            />

            {/* STATUS */}
            <TextField
              select
              label="Status"
              name="status"
              size="small"
              value={editData.status}
              onChange={handleEditChange}
              fullWidth
            >
              <MenuItem value="online">Online</MenuItem>

              <MenuItem value="offline">Offline</MenuItem>
            </TextField>

            {/* HEALTH STATUS */}
            <TextField
              select
              label="Health Status"
              name="isActive"
              size="small"
              value={editData.isActive}
              onChange={handleEditChange}
              fullWidth
            >
              <MenuItem value={true}>Active</MenuItem>

              <MenuItem value={false}>Inactive</MenuItem>
            </TextField>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: "#1565c0",
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Device;
