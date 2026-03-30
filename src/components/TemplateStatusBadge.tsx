import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { TemplateStatus } from "@/data/mockTemplates";

const config: Record<TemplateStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  approved: {
    label: "Approved",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    icon: Clock,
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/10 text-red-600 border-red-500/20",
    icon: XCircle,
  },
};

interface TemplateStatusBadgeProps {
  status: TemplateStatus;
}

const TemplateStatusBadge = ({ status }: TemplateStatusBadgeProps) => {
  const { label, className, icon: Icon } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};

export default TemplateStatusBadge;
