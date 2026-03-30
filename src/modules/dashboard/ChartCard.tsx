import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Wraps chart/content (e.g. flex-1 min-h-0 for fixed-height charts) */
  bodyClassName?: string;
}

export function ChartCard({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
    >
      <div className="mb-4 flex flex-shrink-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-shrink-0 flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
      <div className={cn(bodyClassName)}>{children}</div>
    </div>
  );
}
