import { useEffect, useState } from "react";

import {
  TextField,
  Button,
  Paper,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
  getPermissions,
  createPermission,
} from "../../services/services";

function Permissions() {

  const [permissions, setPermissions] =
    useState([]);

  const [name, setName] = useState("");

  // ================= FETCH =================

  const fetchPermissions = async () => {

    try {

      const response =
        await getPermissions();

      setPermissions(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchPermissions();

  }, []);

  // ================= CREATE =================

  const handleCreate = async () => {

    try {

      await createPermission({
        name,
      });

      alert(
        "Permission created successfully"
      );

      setName("");

      fetchPermissions();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= TABLE =================

 const columns = [

  {
    field: "id",
    headerName: "ID",
    width: 100,
  },

  {
    field: "name",
    headerName: "Permission Name",
    flex: 1,
  },

  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,

    renderCell: (params) => {

      return new Date(
        params.row.createdAt
      ).toLocaleString();

    },
  },

  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 1,

    renderCell: (params) => {

      return new Date(
        params.row.updatedAt
      ).toLocaleString();

    },
  },

];

  return (
    <div className="p-4">

      {/* TITLE */}
      <div className="mb-4">

        <h1 className="text-xl font-semibold">
          Permissions Management
        </h1>

      </div>

      {/* CREATE */}
      <Paper
        elevation={0}
        className="p-4  mb-5"
      >

        <div className="flex gap-4">

          <TextField
            label="Permission Name"
            size="small"
            fullWidth
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              backgroundColor: "#1565c0",

              "&:hover": {
                backgroundColor: "#0d47a1",
              },
            }}
          >
            Create
          </Button>

        </div>

      </Paper>

      {/* TABLE */}
      <Paper
        elevation={0}
        className=""
      >

        <div
          style={{
            height: 500,
            width: "100%",
          }}
        >

          <DataGrid
            rows={permissions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[
              10,
              20,
            ]}
            disableRowSelectionOnClick
            headerHeight={40}
            sx={{
              border: 0,

              // HEADER
              "& .MuiDataGrid-columnHeaders":
                {
                  backgroundColor:
                    "#1565c0 !important",

                  color:
                    "#fff !important",
                },

              "& .MuiDataGrid-columnHeader":
                {
                  backgroundColor:
                    "#1565c0 !important",

                  color:
                    "#fff !important",
                },

              "& .MuiDataGrid-columnHeaderTitle":
                {
                  color:
                    "#fff !important",
                },

              // FOOTER
              "& .MuiDataGrid-footerContainer":
                {
                  backgroundColor:
                    "#1565c0 !important",

                  color:
                    "#fff !important",
                },

              "& .MuiTablePagination-root":
                {
                  color:
                    "#fff !important",
                },
            }}
          />

        </div>

      </Paper>

    </div>
  );
}

export default Permissions;