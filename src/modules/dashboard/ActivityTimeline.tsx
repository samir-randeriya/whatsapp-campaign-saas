import {
  CheckCircle2,
  FileCheck,
  Megaphone,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActivityItem } from "@/data/mockDashboard";

const kindIcon: Record<ActivityItem["kind"], LucideIcon> = {
  campaign_created: Megaphone,
  template_approved: FileCheck,
  campaign_completed: CheckCircle2,
  contacts_imported: Upload,
};

interface ActivityTimelineProps {
  items: ActivityItem[];
  className?: string;
}

export function ActivityTimeline({ items, className }: ActivityTimelineProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
    >
      <h2 className="font-display text-lg font-semibold">Recent Activity</h2>
      <p className="mt-1 text-sm text-muted-foreground">Latest updates across your workspace</p>
      <ul className="relative mt-6 space-y-0">
        {items.map((item, index) => {
          const Icon = kindIcon[item.kind];
          const isLast = index === items.length - 1;
          return (
            <li key={item.id} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className="absolute left-4 top-9 h-[calc(100%-0.5rem)] w-px bg-border"
                  aria-hidden
                />
              )}
              <div className="relative z-[1] flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-muted/60">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium leading-tight">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.subtitle}</p>
                <p className="mt-1.5 text-xs font-medium text-muted-foreground/80">
                  {item.timeLabel}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
