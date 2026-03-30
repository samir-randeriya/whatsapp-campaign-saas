import type { ReactNode } from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthHeaderProps {
  /** Main heading (e.g. Sign in, Create account) */
  title: string;
  description?: string;
  /** Shown under logo; defaults to WA Campaign when logo is shown */
  appName?: string;
  showLogo?: boolean;
  children?: ReactNode;
  className?: string;
}

export function AuthHeader({
  title,
  description,
  appName = "WA Campaign",
  showLogo = true,
  children,
  className,
}: AuthHeaderProps) {
  return (
    <div className={cn("mb-6 text-center", className)}>
      {showLogo ? (
        <div className="mb-4 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-sm">
            <MessageSquare className="h-6 w-6 text-primary-foreground" />
          </div>
          {appName ? (
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              {appName}
            </span>
          ) : null}
        </div>
      ) : null}
      {children}
      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      {description ? (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
