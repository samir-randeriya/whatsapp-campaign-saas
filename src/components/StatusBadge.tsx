import { cn } from "@/lib/utils";

type Status = "draft" | "scheduled" | "sent" | "failed";

const statusConfig: Record<Status, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-info/15 text-info",
  },
  sent: {
    label: "Sent",
    className: "bg-success/15 text-success",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/15 text-destructive",
  },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      <span
        className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", {
          "bg-muted-foreground": status === "draft",
          "bg-info": status === "scheduled",
          "bg-success": status === "sent",
          "bg-destructive": status === "failed",
        })}
      />
      {config.label}
    </span>
  );
};

export default StatusBadge;
