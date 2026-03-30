import type { ComponentProps } from "react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function SettingsTabs({ className, ...props }: ComponentProps<typeof Tabs>) {
  return <Tabs className={cn("w-full space-y-6", className)} {...props} />;
}

export function SettingsTabList({ className, ...props }: ComponentProps<typeof TabsList>) {
  return (
    <TabsList
      className={cn(
        "flex h-auto w-full flex-wrap justify-start gap-1 rounded-lg bg-muted p-1 sm:inline-flex sm:w-auto",
        className
      )}
      {...props}
    />
  );
}

export { TabsTrigger, TabsContent } from "@/components/ui/tabs";
