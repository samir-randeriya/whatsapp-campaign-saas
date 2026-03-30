import {
  Megaphone,
  FileText,
  Send,
  Percent,
  Zap,
  AlertTriangle,
  Eye,
  MousePointerClick,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardStatDefinition } from "@/data/mockDashboard";

const iconMap: Record<DashboardStatDefinition["icon"], LucideIcon> = {
  megaphone: Megaphone,
  file: FileText,
  send: Send,
  percent: Percent,
  zap: Zap,
  alert: AlertTriangle,
  eye: Eye,
  mouse: MousePointerClick,
};

interface DashboardStatCardProps {
  stat: DashboardStatDefinition;
  className?: string;
}

export function DashboardStatCard({ stat, className }: DashboardStatCardProps) {
  const Icon = iconMap[stat.icon];
  const isPositive = stat.trend === "up";
  const changeNeutral = stat.changePercent === 0;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <p className="mt-2 font-display text-2xl font-bold tabular-nums">{stat.value}</p>
      <div className="mt-2 flex items-center gap-1 text-xs font-medium">
        {!changeNeutral && (
          <span
            className={cn(
              "tabular-nums",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(stat.changePercent)}%
          </span>
        )}
        {changeNeutral && (
          <span className="text-muted-foreground tabular-nums">— 0%</span>
        )}
        <span className="font-normal text-muted-foreground">vs prior period</span>
      </div>
    </div>
  );
}
