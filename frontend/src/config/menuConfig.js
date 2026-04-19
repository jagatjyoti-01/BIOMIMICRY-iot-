import {
  LayoutDashboard,
  Users,
  Cpu,
  Building,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

export const menuConfig = {
  SUPERADMIN: [
    { name: "Dashboard", path: "/superadmin/dashboard", icon: LayoutDashboard },
    { name: "Organizations", path: "/superadmin/orgs", icon: Building },
    { name: "Users", path: "/superadmin/users", icon: Users },
    { name: "Devices", path: "/superadmin/devices", icon: Cpu },
    { name: "Analytics", path: "/superadmin/analytics", icon: BarChart3 },
    { name: "Roles & Permissions", path: "/superadmin/analytics", icon: BarChart3 },
  ],

  ADMIN: [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Devices", path: "/admin/devices", icon: Cpu },
    { name: "Alerts", path: "/admin/alerts", icon: AlertTriangle },
  ],

  USER: [
    { name: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
    { name: "My Devices", path: "/user/devices", icon: Cpu },
    { name: "Alerts", path: "/user/alerts", icon: AlertTriangle },
  ],
};