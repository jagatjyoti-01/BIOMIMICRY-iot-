import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers, getPermissions } from "../../services/services";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH USERS (READ-ONLY) =================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH PERMISSIONS =================
  const fetchPermissions = async () => {
    try {
      const response = await getPermissions();
      setPermissions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPermissions();
  }, []);

  // ================= DATAGRID COLUMNS (NO EDIT/DELETE BUTTONS) =================
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => (
        <span className="capitalize">
          {params.row.role}
        </span>
      ),
    },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 1.5,
      renderCell: (params) => (
        <div className="flex flex-wrap gap-1 mt-2">
          {params.row.permissions?.map((id) => {
            const permission = permissions.find(
              (item) => item.id === id
            );
            return (
              <span
                key={id}
                className="border border-blue-500 text-blue-600 px-2 py-1 rounded-full text-xs"
              >
                {permission?.name}
              </span>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      {/* TITLE */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          User / Organisation Management
        </h1>
        <p className="text-sm text-gray-600 mt-1">View Only - Read Access Only</p>
      </div>

      {/* TABLE */}
      <Paper elevation={0} className="">
        {/* HEADER */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="font-medium text-gray-700">All Users</h2>
          <span className="text-sm text-gray-500">Total: {users.length}</span>
        </div>

        {/* DATAGRID */}
        <div style={{ height: 550, width: "100%" }}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600">Loading users...</p>
            </div>
          ) : (
            <DataGrid
              rows={users}
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

export default AdminUsers;
