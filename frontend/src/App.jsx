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
import AdminDevice from "./pages/admin/Device";
import AdminUsers from "./pages/admin/Users";

// USER
import UserDashboard from "./pages/user/Dashboard";

import Permissions from "./pages/superadmin/Permissions";

import LiveDevice from "./pages/superadmin/LiveDevice";
import LiveMonitoring from "./pages/superadmin/LiveMonitoring";

import MyDevices from "./pages/user/MyDevices";

import DownloadReport from "./pages/common/DownloadReport";

// ================= PROTECTED ROUTE =================

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? children : <Navigate to="/" />;
};

// ================= ROLE-AWARE DEVICE PAGE =================
const UnauthorizedPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-gray-800">Unauthorized</h1>
      <p className="mt-2 text-gray-600">
        You do not have permission to view this page.
      </p>
    </div>
  );
};

const DevicesPageRouter = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role?.toLowerCase() || "user";

  if (role === "admin") {
    return <AdminDevice />;
  }

  if (role === "superadmin") {
    return <Device />;
  }

  return <UnauthorizedPage />;
};

// ================= ROLE-AWARE USERS PAGE =================
const UsersPageRouter = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role?.toLowerCase() || "user";

  if (role === "admin") {
    return <AdminUsers />;
  }

  if (role === "superadmin") {
    return <Users />;
  }

  return <UnauthorizedPage />;
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
          <Route path="devices" element={<DevicesPageRouter />} />

          {/* USERS */}
          <Route path="users" element={<UsersPageRouter />} />

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

<Route
path="download-report"
element={<DownloadReport />}
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
