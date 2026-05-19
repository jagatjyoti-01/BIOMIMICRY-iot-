import {
  LayoutDashboard,
  Building,
  Users,
  Cpu,
  AlertTriangle,
  BarChart3,
  Settings,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const [openDashboard, setOpenDashboard] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // ✅ GET ROLE
  const user = JSON.parse(localStorage.getItem("user") || "{}");
 const role = user.role?.toLowerCase() || "user";

  // ✅ ROLE-BASED MENU CONFIG
  const menuConfig = {
    superadmin: {
      label: "System Admin",
      subLabel: "Global Access",
      dashboard: "/dashboard/superadmin",
      management: [
 //d       { name: "Organizations", icon: Building, path: "/dashboard/orgs" },
        { name: "Users", icon: Users, path: "/dashboard/users" },
        { name: "Roles & Permissions", icon: Users, path: "/dashboard/permissions" },
        { name: "Devices", icon: Cpu, path: "/dashboard/devices" },
      ],
      monitoring: [
        { name: "Live Monitoring", icon: Cpu, path: "/dashboard/live" },
        { name: "Alerts", icon: AlertTriangle, path: "/dashboard/alerts" },
        { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
        { name: "Reports", icon: FileText, path: "/dashboard/reports" },
      ],
    },

    admin: {
      label: "Organization Admin",
      subLabel: "Manage Users & Devices",
      dashboard: "/admin/dashboard",
      management: [
        { name: "Users", icon: Users, path: "/admin/users" },
        { name: "Devices", icon: Cpu, path: "/admin/devices" },
      ],
      monitoring: [
        { name: "Live Monitoring", icon: Cpu, path: "/admin/live" },
        { name: "Alerts", icon: AlertTriangle, path: "/admin/alerts" },
        { name: "Reports", icon: FileText, path: "/admin/reports" },
      ],
    },

    user: {
      label: "User Panel",
      subLabel: "My Devices",
      dashboard: "/user/dashboard",
      management: [],
      monitoring: [
        { name: "My Devices", icon: Cpu, path: "/user/devices" },
        { name: "Alerts", icon: AlertTriangle, path: "/user/alerts" },
      ],
    },
  };

  const config = menuConfig[role];

  return (
    <div
      className={`h-full bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* TOP */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <h2 className="font-bold text-lg">Bioindicators</h2>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* ROLE CARD */}
      {!collapsed && (
        <div className="p-4">
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full" />
            <div>
              <p className="text-sm font-semibold">{config.label}</p>
              <p className="text-xs text-gray-500">{config.subLabel}</p>
            </div>
          </div>
        </div>
      )}

      {/* MENU */}
      <div className="px-3">

        {/* MAIN MENU */}
        {!collapsed && (
          <p className="text-xs text-gray-400 mt-3 mb-2">MAIN MENU</p>
        )}

        {/* DASHBOARD */}
        <div
          onClick={() => setOpenDashboard(!openDashboard)}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </div>

          {!collapsed &&
            (openDashboard ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            ))}
        </div>

        {/* SUBMENU */}
        {openDashboard && !collapsed && (
          <div className="ml-7 mt-2 space-y-2 border-l pl-3">

            <div
              onClick={() => navigate(config.dashboard)}
              className={`flex items-center gap-2 cursor-pointer ${
                isActive(config.dashboard)
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isActive(config.dashboard)
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              />
              <span className="text-sm">Overview</span>
            </div>

          </div>
        )}

        {/* MANAGEMENT */}
        {config.management.length > 0 && !collapsed && (
          <p className="text-xs text-gray-400 mt-5 mb-2">MANAGEMENT</p>
        )}

        {config.management.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                {!collapsed && <span>{item.name}</span>}
              </div>

              {!collapsed && <ChevronRight size={14} />}
            </div>
          );
        })}

        {/* MONITORING */}
        {config.monitoring.length > 0 && !collapsed && (
          <p className="text-xs text-gray-400 mt-5 mb-2">MONITORING</p>
        )}

        {config.monitoring.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                {!collapsed && <span>{item.name}</span>}
              </div>

              {!collapsed && <ChevronRight size={14} />}
            </div>
          );
        })}

        {/* SYSTEM */}
        {!collapsed && (
          <p className="text-xs text-gray-400 mt-5 mb-2">SYSTEM</p>
        )}

       <Link to="/devices">
  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-3">
      <Settings size={18} />
      {!collapsed && <span>Device</span>}
    </div>
  </div>
</Link>

        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <div className="flex items-center gap-3">
            <Settings size={18} />
            {!collapsed && <span>Settings</span>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;