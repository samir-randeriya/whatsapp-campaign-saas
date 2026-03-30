import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsCardProps {
  title?: string;
  description?: string;
  /** Optional icon or badge next to the title row */
  headerExtra?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SettingsCard({
  title,
  description,
  headerExtra,
  children,
  className,
}: SettingsCardProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      {(title || description || headerExtra) && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            {title ? (
              <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
            ) : null}
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {headerExtra ? <div className="shrink-0">{headerExtra}</div> : null}
        </div>
      )}
      <div className="space-y-6">{children}</div>
    </section>
  );
}
