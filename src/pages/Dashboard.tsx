import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  PageHeader,
  DashboardStatCard,
  CampaignPerformanceChart,
} from "@/modules/dashboard";
import { DataTable } from "@/components/common/DataTable";
import { createCampaignTableColumns } from "@/components/common/campaignTableColumns";
import { CampaignRowActions } from "@/components/common/CampaignRowActions";
import {
  getDashboardPrimaryStats,
  type HeaderDateRange,
  type ChartMetricKey,
} from "@/data/mockDashboard";
import { mockCampaigns } from "@/data/mockCampaigns";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [headerRange, setHeaderRange] = useState<HeaderDateRange>("30d");
  const [chartMetric, setChartMetric] = useState<ChartMetricKey>("messages");

  const stats = getDashboardPrimaryStats(headerRange);

  const campaignColumns = useMemo(
    () => createCampaignTableColumns(() => <CampaignRowActions />),
    []
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <PageHeader
          className="mb-0"
          title="Dashboard"
          toolbar={
            <Select
              value={headerRange}
              onValueChange={(v) => setHeaderRange(v as HeaderDateRange)}
            >
              <SelectTrigger className="h-9 w-full min-w-[140px] sm:w-[160px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          }
          action={{ to: "/campaign/create", label: "Create Campaign" }}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <DashboardStatCard key={stat.id} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          <div className="flex h-[420px] min-h-[420px] flex-col overflow-hidden">
            <CampaignPerformanceChart
              metric={chartMetric}
              onMetricChange={setChartMetric}
              range={headerRange}
              fillHeight
              className="h-full min-h-0"
            />
          </div>
          <div className="flex h-[420px] min-h-[420px] flex-col overflow-hidden">
            <DataTable
              className="h-full min-h-0"
              title={
                <h2 className="font-display text-lg font-semibold">Recent Campaigns</h2>
              }
              columns={campaignColumns}
              data={mockCampaigns}
              getRowId={(c) => c.id}
              scrollable
              heightClassName="h-full min-h-0"
            />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
