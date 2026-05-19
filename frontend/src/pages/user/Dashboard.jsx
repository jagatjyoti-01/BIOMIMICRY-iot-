
import DashboardHeaderTop from "../../section/dashboard/Overview/DashboardHeaderTop";
import StatsCard from "../../section/dashboard/Overview/StatsGrid";
import DeviceActivity from "../../section/dashboard/Overview/DeviceActivity";
import RecentAlerts from "../../section/dashboard/Overview/RecentAlerts";
import SystemStatusPanel from "../../section/dashboard/Overview/SystemStatusPanel";
import WaterQualityChart from "../../section/dashboard/Overview/WaterQualityChart";
import DeviceDistribution from "../../section/dashboard/Overview/DeviceDistribution";
import PowerUsage from "../../section/dashboard/Overview/PowerUsage";
import DeviceTable from "../../section/dashboard/Overview/DeviceTable";
import UserParameterChart from "../../section/dashboard/User/UserParameterChart";
import DownloadReport from "../../section/dashboard/User/DownloadReport";
import WaterFlowChart from "../../section/dashboard/User/WaterFlowChart";

const UserDashboard = () => {
  return (
   <>
      <div className="p-6 bg-gray-100 min-h-screen">

        {/* Header */}
        <DashboardHeaderTop />

        {/* Stats */}
        <StatsCard />

        {/* Middle */}
        <div className="flex gap-6 mt-6">
          <div className="flex-1">
            <DeviceActivity />
            <RecentAlerts />
          </div>

          <SystemStatusPanel />
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-12 gap-6 mt-6">

  <div className="col-span-12 lg:col-span-6">
    <WaterQualityChart />
  </div>

  <div className="col-span-12 lg:col-span-6">
    <WaterFlowChart />
  </div>

</div>

        {/* Table */}
        <DeviceTable />

      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">

  <div className="col-span-12 lg:col-span-8">
    <UserParameterChart />
  </div>

  <div className="col-span-12 lg:col-span-4">
    <DownloadReport />
  </div>

</div>
    </>
  );
};

export default UserDashboard;