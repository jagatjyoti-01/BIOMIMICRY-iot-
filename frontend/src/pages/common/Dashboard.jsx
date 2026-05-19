import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../component/cards/StatsCard";
import { Cpu, Activity, AlertTriangle, Zap } from "lucide-react";

const Dashboard = () => {
  return (
   

      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-gray-800">
          Overview
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatsCard
            title="Total Devices"
            value="120"
            percentage="+12%"
            icon={<Cpu size={20} />}
            iconBg="#3b82f6"
            graphType="bar"
          />

          <StatsCard
            title="Active Sensors"
            value="98"
            percentage="+5%"
            icon={<Activity size={20} />}
            iconBg="#10b981"
            graphType="line"
          />

          <StatsCard
            title="Alerts"
            value="12"
            percentage="-2%"
            icon={<AlertTriangle size={20} />}
            iconBg="#ef4444"
            graphType="wave"
          />

          <StatsCard
            title="Power Usage"
            value="75%"
            percentage="+8%"
            icon={<Zap size={20} />}
            iconBg="#f59e0b"
            graphType="area"
          />

        </div>

      </div>

    
  );
};

export default Dashboard;