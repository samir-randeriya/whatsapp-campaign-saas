import { useMemo, useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader, StatCard, type StatCardItem } from "@/modules/dashboard";
import { DataTable, type DataTableColumn } from "@/components/common/DataTable";
import { cn } from "@/lib/utils";
import { mockMessages, type MessageLog, type MessageStatus } from "@/data/mockMessages";
import { motion } from "framer-motion";

const directionLabel: Record<MessageLog["direction"], string> = {
  inbound: "Inbound",
  outbound: "Outbound",
};

function MessageStatusBadge({ status }: { status: MessageStatus }) {
  const config: Record<MessageStatus, string> = {
    read: "bg-info/15 text-info",
    delivered: "bg-success/15 text-success",
    sent: "bg-muted text-muted-foreground",
    failed: "bg-destructive/15 text-destructive",
  };
  const labels: Record<MessageStatus, string> = {
    read: "Read",
    delivered: "Delivered",
    sent: "Sent",
    failed: "Failed",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        config[status]
      )}
    >
      {labels[status]}
    </span>
  );
}

const messageStats: StatCardItem[] = [
  { label: "Today", value: String(mockMessages.length), change: "6 threads" },
  { label: "Inbound", value: "3", change: "Last 24h" },
  { label: "Outbound", value: "3", change: "Last 24h" },
  { label: "Failed", value: "1", change: "Needs review" },
];

const Messages = () => {
  const [directionFilter, setDirectionFilter] = useState<"all" | "inbound" | "outbound">(
    "all"
  );

  const filtered = useMemo(() => {
    if (directionFilter === "all") return mockMessages;
    return mockMessages.filter((m) => m.direction === directionFilter);
  }, [directionFilter]);

  const columns: DataTableColumn<MessageLog>[] = useMemo(
    () => [
      {
        id: "contact",
        header: "Contact",
        cell: (m) => <span className="font-medium">{m.contact}</span>,
      },
      {
        id: "phone",
        header: "Phone",
        headerClassName: "hidden md:table-cell",
        className: "hidden text-muted-foreground md:table-cell",
        cell: (m) => <span>{m.phone}</span>,
      },
      {
        id: "direction",
        header: "Direction",
        cell: (m) => (
          <span className="text-muted-foreground">{directionLabel[m.direction]}</span>
        ),
      },
      {
        id: "preview",
        header: "Message",
        cell: (m) => (
          <span className="line-clamp-2 max-w-[280px] text-muted-foreground">
            {m.preview}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: (m) => <MessageStatusBadge status={m.status} />,
      },
      {
        id: "time",
        header: "Time",
        headerClassName: "hidden lg:table-cell whitespace-nowrap",
        className: "hidden whitespace-nowrap text-muted-foreground lg:table-cell",
        cell: (m) => (
          <span>
            {new Date(m.time).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        ),
      },
    ],
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
          title="Messages"
          description="Inbound and outbound WhatsApp conversations"
          toolbar={
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
              <Select
                value={directionFilter}
                onValueChange={(v) =>
                  setDirectionFilter(v as "all" | "inbound" | "outbound")
                }
              >
                <SelectTrigger className="h-9 w-full min-w-[140px] sm:w-[160px]">
                  <SelectValue placeholder="Direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All messages</SelectItem>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" className="gap-2">
                <MessageSquarePlus className="h-4 w-4" />
                New message
              </Button>
            </div>
          }
        />

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {messageStats.map((s) => (
            <StatCard key={s.label} item={s} />
          ))}
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          getRowId={(m) => m.id}
          emptyState="No messages match your filters."
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default Messages;
