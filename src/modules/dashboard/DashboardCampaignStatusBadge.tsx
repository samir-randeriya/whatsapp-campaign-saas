import { cn } from "@/lib/utils";
import type { DashboardCampaignRowStatus } from "@/data/mockDashboard";

const config: Record<
  DashboardCampaignRowStatus,
  { label: string; className: string; dot: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-info/15 text-info",
    dot: "bg-info",
  },
  sending: {
    label: "Sending",
    className: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  completed: {
    label: "Completed",
    className: "bg-success/15 text-success",
    dot: "bg-success",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/15 text-destructive",
    dot: "bg-destructive",
  },
};

interface DashboardCampaignStatusBadgeProps {
  status: DashboardCampaignRowStatus;
  className?: string;
}

export function DashboardCampaignStatusBadge({
  status,
  className,
}: DashboardCampaignStatusBadgeProps) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        c.className,
        className
      )}
    >
      <span className={cn("mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}
