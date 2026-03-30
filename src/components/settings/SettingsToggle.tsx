import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface SettingsToggleProps {
  id: string;
  title: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  /** Renders a divider below this row */
  separatorAfter?: boolean;
}

export function SettingsToggle({
  id,
  title,
  description,
  checked,
  onCheckedChange,
  separatorAfter,
}: SettingsToggleProps) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-0.5 pr-2">
          <Label htmlFor={id} className="text-sm font-medium leading-snug">
            {title}
          </Label>
          {description ? (
            <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="mt-0.5 shrink-0"
        />
      </div>
      {separatorAfter ? <Separator className="mt-5" /> : null}
    </div>
  );
}
