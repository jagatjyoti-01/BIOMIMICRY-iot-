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
import MyDevices from "../user/MyDevices";

const UserDashboard = () => {
  return (
    <>
      <div className="p-3 sm:p-4 md:p-6 bg-gray-100">
        {/* Header */}
        <DashboardHeaderTop />
        {/* Stats */}
        <StatsCard />
        {/* Table */}
        <MyDevices />
      </div>

      <div className="mt-4 md:mt-6 px-3 sm:px-4 md:px-6">
        <div>
          <UserParameterChart />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
