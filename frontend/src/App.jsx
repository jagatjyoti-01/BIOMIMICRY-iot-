import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// LOGIN
import Login from "./pages/login";

// LAYOUT
import DashboardLayout from "./layouts/DashboardLayout";

// COMMON PAGES
import Dashboard from "./pages/common/Dashboard";

import Profile from "./pages/common/Profile";

// SUPERADMIN
import Users from "./pages/superadmin/Users";
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import Device from "./pages/superadmin/Device";
import CommonDevice from "./pages/common/Device";

// ADMIN
import AdminDashboard from "./pages/admin/Dashboard";

// USER
import UserDashboard from "./pages/user/Dashboard";

import Permissions from "./pages/superadmin/Permissions";

import LiveDevice from "./pages/superadmin/LiveDevice";
import LiveMonitoring from "./pages/superadmin/LiveMonitoring";

import MyDevices from "./pages/user/MyDevices";

// ================= PROTECTED ROUTE =================

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD LAYOUT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* DASHBOARD HOME */}
          <Route index element={<Dashboard />} />

          {/* PROFILE */}
          <Route path="profile" element={<Profile />} />

          {/* DEVICES */}
          <Route path="devices" element={<Device />} />

          {/* USERS */}
          <Route path="users" element={<Users />} />

          {/* SUPERADMIN DASHBOARD */}
          <Route path="superadmin" element={<SuperAdminDashboard />} />

          {/* ADMIN DASHBOARD */}
          <Route path="admin" element={<AdminDashboard />} />

          {/* USER DASHBOARD */}
          <Route path="user" element={<UserDashboard />} />

          <Route path="permissions" element={<Permissions />} />


          <Route
  path="live-monitoring"
  element={<LiveMonitoring />}
/>

<Route
  path="live-monitoring/:deviceId"
  element={<LiveDevice />}
/>

<Route
  path="user/devices"
  element={<MyDevices />}
/>

{/* 
          <Route
  path="devices"
  element={<CommonDevice />}
/> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
