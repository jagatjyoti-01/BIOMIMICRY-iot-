import React from "react";
import StatsCard from "./StatsCard";
import {
  Building,
  Cpu,
  Activity,
  AlertTriangle,
  Users,
} from "lucide-react";

const StatsGrid = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "user";

  // 🔥 ROLE BASED DATA
  const statsData = {
    superadmin: [
      {
        title: "Organizations",
        value: "25",
        percentage: "+12%",
        icon: <Building size={18} />,
        iconBg: "#3b82f6",
        graphType: "bar",
        bg: "bg-01.svg",
      },
      {
        title: "Total Devices",
        value: "320",
        percentage: "+8%",
        icon: <Cpu size={18} />,
        iconBg: "#6366f1",
        graphType: "line",
        bg: "bg-02.svg",
      },
      {
        title: "Active Devices",
        value: "290",
        percentage: "+5%",
        icon: <Activity size={18} />,
        iconBg: "#10b981",
        graphType: "wave",
        bg: "bg-03.svg",
      },
      {
        title: "Alerts",
        value: "18",
        percentage: "-2%",
        icon: <AlertTriangle size={18} />,
        iconBg: "#ef4444",
        graphType: "area",
        bg: "bg-04.svg",
      },
    ],

    admin: [
      {
        title: "Total Users",
        value: "120",
        percentage: "+10%",
        icon: <Users size={18} />,
        iconBg: "#3b82f6",
        graphType: "bar",
        bg: "bg-01.svg",
      },
      {
        title: "Total Devices",
        value: "80",
        percentage: "+5%",
        icon: <Cpu size={18} />,
        iconBg: "#6366f1",
        graphType: "line",
        bg: "bg-02.svg",
      },
      {
        title: "Active Devices",
        value: "70",
        percentage: "+3%",
        icon: <Activity size={18} />,
        iconBg: "#10b981",
        graphType: "wave",
        bg: "bg-03.svg",
      },
      {
        title: "Alerts",
        value: "6",
        percentage: "-1%",
        icon: <AlertTriangle size={18} />,
        iconBg: "#ef4444",
        graphType: "area",
        bg: "bg-04.svg",
      },
    ],

    user: [
      {
        title: "My Devices",
        value: "5",
        percentage: "+1%",
        icon: <Cpu size={18} />,
        iconBg: "#6366f1",
        graphType: "bar",
        bg: "bg-01.svg",
      },
      {
        title: "Active Devices",
        value: "4",
        percentage: "+2%",
        icon: <Activity size={18} />,
        iconBg: "#10b981",
        graphType: "line",
        bg: "bg-02.svg",
      },
      {
        title: "Alerts",
        value: "1",
        percentage: "-1%",
        icon: <AlertTriangle size={18} />,
        iconBg: "#ef4444",
        graphType: "wave",
        bg: "bg-03.svg",
      },
       {
    title: "Water Quality",
    value: "Good",
    percentage: "+5%",
    icon: "💧",
    iconBg: "#3b82f6",
    graphType: "area",
    bg: "bg-04.svg",
  },
    ],
  };

  const cards = statsData[role] || statsData.user;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      {cards.map((item, i) => (
        <StatsCard key={i} {...item} />
      ))}
    </div>
  );
};

export default StatsGrid;