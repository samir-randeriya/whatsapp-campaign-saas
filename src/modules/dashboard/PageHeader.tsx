import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Date filters, etc. — rendered before the primary action. */
  toolbar?: ReactNode;
  action?: {
    to: string;
    label: string;
    icon?: LucideIcon;
  };
  className?: string;
}

export function PageHeader({
  title,
  description,
  toolbar,
  action,
  className,
}: PageHeaderProps) {
  const ActionIcon = action?.icon;

  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
        {toolbar}
        {action && (
          <Link to={action.to} className="w-full sm:w-auto">
            <Button className={cn("w-full sm:w-auto", ActionIcon && "gap-2")}>
              {ActionIcon ? <ActionIcon className="h-4 w-4" /> : null}
              {action.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
