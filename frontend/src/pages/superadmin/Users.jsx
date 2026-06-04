import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  createUser,
  getUsers,
  getPermissions,
   updateUser,
  deleteUser,
} from "../../services/services";

import {
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

function Users() {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });


  const [openEdit, setOpenEdit] = useState(false);

const [editData, setEditData] = useState({
  id: "",
  name: "",
  email: "",
  password: "",
  role: "",
  permissions: [],
});

const handleEdit = (user) => {

  setEditData({
    id: user.id,
    name: user.name,
    email: user.email,
    password: "",
    role: user.role,
    permissions: user.permissions || [],
  });

  setOpenEdit(true);
};

const handleEditChange = (e) => {

  setEditData({
    ...editData,
    [e.target.name]: e.target.value,
  });

};



const handlePermissionChange = (
  event,
  values
) => {

  setEditData({
    ...editData,
    permissions: values.map(
      (item) => item.id
    ),
  });

};


const handleUpdateUser = async () => {

  try {

    await updateUser(
      editData.id,
      editData
    );

    alert("User updated successfully");

    setOpenEdit(false);

    fetchUsers();

  } catch (error) {

    console.log(error);

  }

};

const handleDeleteUser = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await deleteUser(id);

    alert("User deleted successfully");

    fetchUsers();

  } catch (error) {
    console.log(error);
  }
};

  // ================= FETCH USERS =================

  const fetchUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.data.data);

    } catch (error) {
      console.log(error);
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

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= CREATE USER =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(formData);

      alert("User created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= GET PERMISSION NAMES =================

  const getPermissionNames = (permissionIds) => {
    if (!permissionIds) return "";

    return permissionIds
      .map((id) => {
        const permission = permissions.find(
          (item) => item.id === id
        );

        return permission ? permission.name : "";
      })
      .join(", ");
  };

  // ================= EDIT USER =================

 

  // ================= DATAGRID COLUMNS =================

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

    // ================= PERMISSIONS =================

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

    // ================= ACTION =================

   {
  field: "actions",
  headerName: "Actions",
  width: 120,

  renderCell: (params) => (
    <div className="flex gap-2">
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded text-xs mt-2"
        onClick={() => handleEdit(params.row)}
      >
        Edit
      </button>

      <button
        className="bg-red-600 text-white px-3 py-1 rounded text-xs mt-2"
        onClick={() => handleDeleteUser(params.row.id)}
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
            User / Organisation Management
          </h1>

        </div>

        {/* CREATE USER SECTION */}
        <div className="bg-white border border-gray-200 p-4 mb-5">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >

            {/* NAME */}
            <TextField
              label="Name"
              name="name"
              size="small"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />

            {/* EMAIL */}
            <TextField
              label="Email"
              name="email"
              size="small"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />

            {/* PASSWORD */}
            <TextField
              label="Password"
              name="password"
              type="password"
              size="small"
              value={formData.password}
              onChange={handleChange}
              fullWidth
            />

            {/* ROLE */}
            <TextField
              select
              label="Role"
              name="role"
              size="small"
              value={formData.role}
              onChange={handleChange}
              fullWidth
            >

              <MenuItem value="user">
                User
              </MenuItem>

              <MenuItem value="admin">
                Admin
              </MenuItem>

            </TextField>

            {/* BUTTON */}
            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: "#1565c0",
                height: "40px",

                "&:hover": {
                  backgroundColor: "#0d47a1",
                },
              }}
            >
              CREATE USER
            </Button>

          </form>

        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200">

          {/* TABLE TOP */}
          <div className="px-4 py-3 border-b flex items-center justify-between">

            <h2 className="font-medium text-gray-700">
              All Users
            </h2>

            <span className="text-sm text-gray-500">
              Total: {users.length}
            </span>

          </div>

          {/* DATAGRID */}
          <div style={{ height: 550, width: "100%" }}>

            <DataGrid
              rows={users}
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

        </div>




        <Dialog
  open={openEdit}
  onClose={() => setOpenEdit(false)}
  maxWidth="sm"
  fullWidth
>

  <DialogTitle>
    Edit User
  </DialogTitle>

  <DialogContent>

    <div className="grid grid-cols-1 gap-4 mt-2">

      {/* NAME */}
      <TextField
        label="Name"
        name="name"
        size="small"
        value={editData.name}
        onChange={handleEditChange}
        fullWidth
      />

      {/* EMAIL */}
      <TextField
        label="Email"
        value={editData.email}
        size="small"
        disabled
        fullWidth
      />

      {/* PASSWORD */}
      <TextField
        label="New Password"
        name="password"
        type="password"
        size="small"
        value={editData.password}
        onChange={handleEditChange}
        fullWidth
      />

      {/* ROLE */}
      <TextField
        select
        label="Role"
        name="role"
        size="small"
        value={editData.role}
        onChange={handleEditChange}
        fullWidth
      >

        <MenuItem value="admin">
          Admin
        </MenuItem>

        <MenuItem value="user">
          User
        </MenuItem>

      </TextField>

      {/* PERMISSIONS */}
      <Autocomplete
        multiple
        options={permissions}
        getOptionLabel={(option) =>
          option.name
        }

        value={permissions.filter((item) =>
          editData.permissions.includes(
            item.id
          )
        )}

        onChange={handlePermissionChange}

        renderInput={(params) => (
          <TextField
            {...params}
            label="Permissions"
            size="small"
          />
        )}
      />

    </div>

  </DialogContent>

  <DialogActions>

    <Button
      onClick={() => setOpenEdit(false)}
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={handleUpdateUser}
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

export default Users;