import React, {
  useEffect,
  useState,
} from "react";

import StatsCard from "./StatsCard";

import {

  getDashboardStats,

  getUserDashboardStats,

} from "../../../services/services";

import {
  Cpu,
  Activity,
  AlertTriangle,
  Users,
} from "lucide-react";

const StatsGrid = () => {

  // ================= USER =================

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );

  const role =
    user.role || "user";

  // ================= STATE =================

  const [stats, setStats] =
    useState({

      totalUsers: 0,

      totalDevices: 0,

      onlineDevices: 0,

      offlineDevices: 0,

      activeDevices: 0,

    });

  // ================= FETCH STATS =================

  const fetchStats =
    async () => {

      try {

        let response;

        // SUPERADMIN
        if (
          role ===
          "superadmin"
        ) {

          response =
            await getDashboardStats();

        }

        // USER
        else if (
          role === "user"
        ) {

          response =
            await getUserDashboardStats();

        }

        setStats(
          response.data.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ================= AUTO REFRESH =================

  useEffect(() => {

    fetchStats();

    const interval =
      setInterval(() => {

        fetchStats();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  // ================= ROLE BASED CARDS =================

  const statsData = {

    // ================= SUPERADMIN =================

    superadmin: [

      {
        title:
          "Total Users",

        value:
          stats.totalUsers,

        percentage:
          "+12%",

        icon:
          <Users size={18} />,

        iconBg:
          "#3b82f6",

        graphType:
          "bar",

        bg:
          "bg-01.svg",
      },

      {
        title:
          "Total Devices",

        value:
          stats.totalDevices,

        percentage:
          "+8%",

        icon:
          <Cpu size={18} />,

        iconBg:
          "#6366f1",

        graphType:
          "line",

        bg:
          "bg-02.svg",
      },

      {
        title:
          "Online Devices",

        value:
          stats.onlineDevices,

        percentage:
          "+5%",

        icon:
          <Activity size={18} />,

        iconBg:
          "#10b981",

        graphType:
          "wave",

        bg:
          "bg-03.svg",
      },

      {
        title:
          "Offline Devices",

        value:
          stats.offlineDevices,

        percentage:
          "-2%",

        icon:
          <AlertTriangle size={18} />,

        iconBg:
          "#ef4444",

        graphType:
          "area",

        bg:
          "bg-04.svg",
      },

    ],

    // ================= USER =================

    user: [

      {
        title:
          "My Devices",

        value:
          stats.totalDevices,

        percentage:
          "+1%",

        icon:
          <Cpu size={18} />,

        iconBg:
          "#6366f1",

        graphType:
          "bar",

        bg:
          "bg-01.svg",
      },

      {
        title:
          "Active Devices",

        value:
          stats.activeDevices,

        percentage:
          "+2%",

        icon:
          <Activity size={18} />,

        iconBg:
          "#10b981",

        graphType:
          "line",

        bg:
          "bg-02.svg",
      },

      {
        title:
          "Online Devices",

        value:
          stats.onlineDevices,

        percentage:
          "+3%",

        icon:
          <Activity size={18} />,

        iconBg:
          "#22c55e",

        graphType:
          "wave",

        bg:
          "bg-03.svg",
      },

      {
        title:
          "Offline Devices",

        value:
          stats.offlineDevices,

        percentage:
          "-1%",

        icon:
          <AlertTriangle size={18} />,

        iconBg:
          "#ef4444",

        graphType:
          "area",

        bg:
          "bg-04.svg",
      },

    ],

  };

  // ================= CARDS =================

  const cards =
    statsData[role] ||
    statsData.user;

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

      {cards.map(
        (item, i) => (

          <StatsCard
            key={i}
            {...item}
          />

        )
      )}

    </div>

  );

};

export default StatsGrid;