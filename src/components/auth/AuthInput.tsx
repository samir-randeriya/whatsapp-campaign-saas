import type { ComponentProps } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AuthInputProps extends ComponentProps<typeof Input> {
  label: string;
  error?: string;
}

export function AuthInput({ label, error, id, className, ...props }: AuthInputProps) {
  const inputId =
    id ??
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={inputId}
        aria-invalid={!!error}
        className={cn(error && "border-destructive focus-visible:ring-destructive/30", className)}
        {...props}
      />
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
