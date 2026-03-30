import type { ComponentProps } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SettingsInputProps extends ComponentProps<typeof Input> {
  label: string;
  hint?: string;
}

export function SettingsInput({ label, hint, id, className, ...props }: SettingsInputProps) {
  const inputId =
    id ??
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} className={cn("max-w-lg", className)} {...props} />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
