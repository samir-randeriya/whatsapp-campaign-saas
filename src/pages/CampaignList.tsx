import { useMemo, useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader, StatCard, type StatCardItem } from "@/modules/dashboard";
import { DataTable } from "@/components/common/DataTable";
import { createCampaignTableColumns } from "@/components/common/campaignTableColumns";
import { CampaignRowActions } from "@/components/common/CampaignRowActions";
import { mockCampaigns } from "@/data/mockCampaigns";
import { motion } from "framer-motion";

const campaignStats: StatCardItem[] = [
  { label: "Total Campaigns", value: "24", change: "+3 this week" },
  { label: "Messages Sent", value: "48.2K", change: "+12% vs last month" },
  { label: "Delivery Rate", value: "96.4%", change: "+0.8%" },
  { label: "Active Now", value: "3", change: "2 scheduled" },
];

const CampaignList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockCampaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = useMemo(
    () => createCampaignTableColumns(() => <CampaignRowActions />),
    []
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PageHeader
          title="Campaigns"
          description="Manage and track your WhatsApp campaigns"
          action={{ to: "/campaign/create", label: "Create Campaign", icon: Plus }}
        />

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {campaignStats.map((stat) => (
            <StatCard key={stat.label} item={stat} />
          ))}
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          getRowId={(c) => c.id}
          emptyState="No campaigns found"
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default CampaignList;
