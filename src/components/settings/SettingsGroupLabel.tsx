import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsGroupLabelProps {
  children: ReactNode;
  className?: string;
}

/** Uppercase section label inside a card for toggle groups */
export function SettingsGroupLabel({ children, className }: SettingsGroupLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}
