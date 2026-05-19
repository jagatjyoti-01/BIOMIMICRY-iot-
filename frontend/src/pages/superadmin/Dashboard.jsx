
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

      <div className="flex gap-6 mt-6">
        <div className="flex-1">
          <DeviceActivity /> {/* instead of AppointmentStats */}
          <RecentAlerts /> {/* instead of PopularDoctors */}
        </div>
        <SystemStatusPanel /> {/* instead of RightPanel */}
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6 mb-4">
        <div className="col-span-12 lg:col-span-4">
          <WaterQualityChart />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <DeviceDistribution />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <PowerUsage />
        </div>
      </div>
      <DeviceTable />
    </>
  );
};

export default SuperAdminDashboard;
