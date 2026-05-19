import { useEffect, useState } from "react";



import {
  getProfile,
  updateProfile,
} from "../../services/services";

import {
  TextField,
  Button,
} from "@mui/material";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  // ================= FETCH PROFILE =================

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      const user = response.data.data;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        password: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE PROFILE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        name: formData.name,
        password: formData.password,
      });

      alert("Profile updated successfully");

      setFormData({
        ...formData,
        password: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
   

      <div className="p-4">

        {/* TITLE */}
        <div className="mb-5">

          <h1 className="text-xl font-semibold text-gray-800">
            My Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your account details
          </p>

        </div>

        {/* PROFILE FORM */}
        <div className="bg-white border border-gray-200 p-5">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
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
              fullWidth
              disabled
            />

            {/* ROLE */}
            <TextField
              label="Role"
              name="role"
              size="small"
              value={formData.role}
              fullWidth
              disabled
            />

            {/* PASSWORD */}
            <TextField
              label="New Password"
              name="password"
              type="password"
              size="small"
              value={formData.password}
              onChange={handleChange}
              fullWidth
            />

            {/* BUTTON */}
            <div className="md:col-span-2">

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#1565c0",

                  "&:hover": {
                    backgroundColor: "#0d47a1",
                  },
                }}
              >
                UPDATE PROFILE
              </Button>

            </div>

          </form>

        </div>

      </div>

   
  );
}

export default Profile;