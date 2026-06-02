import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeaderTop from "../../section/dashboard/Overview/DashboardHeaderTop";
import StatsCard from "../../section/dashboard/Overview/StatsGrid";
import DeviceActivity from "../../section/dashboard/Overview/DeviceActivity";
import RecentAlerts from "../../section/dashboard/Overview/RecentAlerts";
import SystemStatusPanel from "../../section/dashboard/Overview/SystemStatusPanel";
import WaterQualityChart from "../../section/dashboard/Overview/WaterQualityChart";
import DeviceDistribution from "../../section/dashboard/Overview/DeviceDistribution";
import PowerUsage from "../../section/dashboard/Overview/PowerUsage";
import DeviceTable from "../../section/dashboard/Overview/DeviceTable";

const AdminDashboard = () => {
  return (
    
      <div className="p-3 sm:p-4 md:p-6 bg-gray-100 min-h-screen">

        {/* Header */}
        <DashboardHeaderTop />

        {/* Stats */}
        <StatsCard />

        {/* Middle */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mt-4 md:mt-6">
          <div className="flex-1">
            <DeviceActivity />
            <RecentAlerts />
          </div>

          <div className="w-full lg:w-auto">
            <SystemStatusPanel />
          </div>
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">

          <div>
            <WaterQualityChart />
          </div>

          <div>
            <DeviceDistribution />
          </div>

        </div>

        {/* Table */}
        <DeviceTable />

      </div>
    
  );
};

export default AdminDashboard;