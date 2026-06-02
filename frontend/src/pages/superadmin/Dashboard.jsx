
import DashboardHeaderTop from "../../section/dashboard/Overview/DashboardHeaderTop";
import StatsCard from "../../section/dashboard/Overview/StatsGrid";
import DeviceActivity from "../../section/dashboard/Overview/DeviceActivity";
import RecentAlerts from "../../section/dashboard/Overview/RecentAlerts";
import SystemStatusPanel from "../../section/dashboard/Overview/SystemStatusPanel";
import WaterQualityChart from "../../section/dashboard/Overview/WaterQualityChart";
import DeviceDistribution from "../../section/dashboard/Overview/DeviceDistribution";
import PowerUsage from "../../section/dashboard/Overview/PowerUsage";
import DeviceTable from "../../section/dashboard/Overview/DeviceTable";

const SuperAdminDashboard = () => {
  return (
    <>
      <DashboardHeaderTop />
      <StatsCard />

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mt-4 md:mt-6">
        <div className="flex-1">
          <DeviceActivity /> {/* instead of AppointmentStats */}
          <RecentAlerts /> {/* instead of PopularDoctors */}
        </div>
        <div className="w-full lg:w-auto">
          <SystemStatusPanel /> {/* instead of RightPanel */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6 mb-4">
        <div>
          <WaterQualityChart />
        </div>

        <div>
          <DeviceDistribution />
        </div>

        <div>
          <PowerUsage />
        </div>
      </div>
      <DeviceTable />
    </>
  );
};

export default SuperAdminDashboard;
