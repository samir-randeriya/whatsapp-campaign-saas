import { useRef, useState } from "react";
import { AlertTriangle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader } from "@/modules/dashboard";
import {
  SettingsCard,
  SettingsInput,
  SettingsToggle,
  SettingsTabs,
  SettingsTabList,
  TabsTrigger,
  TabsContent,
  SettingsGroupLabel,
} from "@/components/settings";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function ConnectionStatusBadge({ connected }: { connected: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        connected
          ? "border-success/30 bg-success/10 text-success"
          : "border-destructive/30 bg-destructive/10 text-destructive"
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", connected ? "bg-success" : "bg-destructive")}
      />
      {connected ? "Connected" : "Not connected"}
    </span>
  );
}

const Settings = () => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [workspace, setWorkspace] = useState("Acme Commerce");
  const [timezone, setTimezone] = useState("america-new_york");
  const [language, setLanguage] = useState("en");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [campaignAlerts, setCampaignAlerts] = useState(true);
  const [deliveryAlerts, setDeliveryAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [failureAlerts, setFailureAlerts] = useState(true);
  const [templateApprovalAlerts, setTemplateApprovalAlerts] = useState(true);

  const [readReceipts, setReadReceipts] = useState(true);
  const [deliveryReports, setDeliveryReports] = useState(true);
  const [waConnected] = useState(true);

  const [twoFactor, setTwoFactor] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex max-w-4xl flex-col pb-28"
      >
        <PageHeader
          className="mb-6"
          title="Settings"
          description="Workspace preferences, notifications, and integrations"
        />

        <SettingsTabs defaultValue="general">
          <SettingsTabList>
            <TabsTrigger value="general" className="flex-1 sm:flex-none">
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1 sm:flex-none">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex-1 sm:flex-none">
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="security" className="flex-1 sm:flex-none">
              Security
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="flex-1 text-destructive data-[state=active]:text-destructive sm:flex-none"
            >
              Advanced
            </TabsTrigger>
          </SettingsTabList>

          <TabsContent value="general" className="space-y-6 focus-visible:outline-none">
            <SettingsCard
              title="Workspace"
              description="Information shown across campaigns and customer-facing messages"
            >
              <div className="space-y-6">
                <SettingsInput
                  label="Workspace name"
                  value={workspace}
                  onChange={(e) => setWorkspace(e.target.value)}
                />
                <SettingsInput
                  label="Owner email"
                  type="email"
                  defaultValue="you@company.com"
                  disabled
                  className="bg-muted/50"
                  hint="Contact support to change the account owner email."
                />
                <div className="space-y-2">
                  <Label>Workspace logo</Label>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
                      Logo
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        id="workspace-logo"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => logoInputRef.current?.click()}
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Optional. PNG, JPG, or WebP — max 2MB.
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger id="timezone" className="max-w-lg">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-new_york">Eastern Time (US)</SelectItem>
                        <SelectItem value="america-chicago">Central Time (US)</SelectItem>
                        <SelectItem value="america-denver">Mountain Time (US)</SelectItem>
                        <SelectItem value="america-los_angeles">Pacific Time (US)</SelectItem>
                        <SelectItem value="europe-london">London</SelectItem>
                        <SelectItem value="asia-dubai">Dubai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Default language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language" className="max-w-lg">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </SettingsCard>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 focus-visible:outline-none">
            <SettingsCard
              title="Notifications"
              description="Control email and in-app alerts for your workspace"
            >
              <div className="space-y-2">
                <SettingsGroupLabel>Email & campaigns</SettingsGroupLabel>
                <div className="space-y-5 pt-1">
                  <SettingsToggle
                    id="email-notif"
                    title="Email notifications"
                    description="Important alerts and account updates"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    separatorAfter
                  />
                  <SettingsToggle
                    id="campaign-alerts"
                    title="Campaign alerts"
                    description="When a campaign completes, fails, or is scheduled"
                    checked={campaignAlerts}
                    onCheckedChange={setCampaignAlerts}
                    separatorAfter
                  />
                  <SettingsToggle
                    id="delivery-alerts"
                    title="Delivery alerts"
                    description="Anomalies in delivery or read rates"
                    checked={deliveryAlerts}
                    onCheckedChange={setDeliveryAlerts}
                    separatorAfter
                  />
                  <SettingsToggle
                    id="weekly-digest"
                    title="Weekly digest"
                    description="Summary of sends, templates, and workspace activity"
                    checked={weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                  />
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-6">
                <SettingsGroupLabel>Delivery & templates</SettingsGroupLabel>
                <div className="space-y-5 pt-1">
                  <SettingsToggle
                    id="failure-alerts"
                    title="Failure alerts"
                    description="Immediate notice when messages fail to send"
                    checked={failureAlerts}
                    onCheckedChange={setFailureAlerts}
                    separatorAfter
                  />
                  <SettingsToggle
                    id="template-approval"
                    title="Template approval alerts"
                    description="When a template is approved or rejected by WhatsApp"
                    checked={templateApprovalAlerts}
                    onCheckedChange={setTemplateApprovalAlerts}
                  />
                </div>
              </div>
            </SettingsCard>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-6 focus-visible:outline-none">
            <SettingsCard
              title="WhatsApp Business"
              description="Connected number and messaging preferences"
              headerExtra={<ConnectionStatusBadge connected={waConnected} />}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <SettingsInput
                  label="Business phone"
                  readOnly
                  value="+1 (555) 012-3456"
                  className="bg-muted/50"
                />
                <SettingsInput
                  label="Display name"
                  readOnly
                  value="Acme Commerce"
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2 border-t border-border pt-6">
                <SettingsGroupLabel>Settings</SettingsGroupLabel>
                <div className="space-y-5 pt-1">
                  <SettingsToggle
                    id="read-receipts"
                    title="Read receipts"
                    description="Show when messages are read (where supported)"
                    checked={readReceipts}
                    onCheckedChange={setReadReceipts}
                    separatorAfter
                  />
                  <SettingsToggle
                    id="delivery-reports"
                    title="Delivery reports"
                    description="Track delivery and failure events for outbound messages"
                    checked={deliveryReports}
                    onCheckedChange={setDeliveryReports}
                  />
                </div>
              </div>
              <div className="space-y-2 border-t border-border pt-6">
                <Label htmlFor="rate-limit">Message rate limit</Label>
                <Input
                  id="rate-limit"
                  disabled
                  placeholder="Managed by Meta (e.g. tier-based limits)"
                  className="max-w-lg cursor-not-allowed bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">
                  Future: set custom throttling per workspace. Currently follows WhatsApp Cloud API
                  tier defaults.
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Manage your WhatsApp Business Account in Meta Business Suite. Changes may take a few
                minutes to sync.
              </p>
            </SettingsCard>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 focus-visible:outline-none">
            <SettingsCard
              title="Security"
              description="Authentication and API access for this workspace"
            >
              <div className="space-y-5">
                <SettingsToggle
                  id="2fa"
                  title="Two-factor authentication"
                  description="Require a second step when signing in"
                  checked={twoFactor}
                  onCheckedChange={setTwoFactor}
                />
              </div>
              <div className="space-y-4 border-t border-border pt-6">
                <SettingsGroupLabel>API access</SettingsGroupLabel>
                <p className="text-sm text-muted-foreground">
                  Rotate keys from the developer console when you suspect a leak or offboard an
                  integration.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button type="button" variant="outline" size="sm" disabled>
                    Manage keys
                  </Button>
                  <Button type="button" variant="outline" size="sm">
                    Reset API key
                  </Button>
                </div>
              </div>
              <div className="space-y-3 border-t border-border pt-6">
                <SettingsGroupLabel>Sessions</SettingsGroupLabel>
                <p className="text-sm text-muted-foreground">
                  End active sessions on other devices. Use when you change password or lose a device.
                </p>
                <Button type="button" variant="secondary" size="sm" disabled className="w-fit">
                  Sign out everywhere
                </Button>
              </div>
            </SettingsCard>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6 focus-visible:outline-none">
            <section
              className={cn(
                "rounded-xl border border-destructive/40 bg-destructive/5 p-6 shadow-sm",
                "space-y-6"
              )}
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/15">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div className="min-w-0 space-y-1">
                  <h2 className="font-display text-lg font-semibold text-destructive">
                    Danger zone
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    These actions are destructive. Confirm carefully before continuing.
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-t border-destructive/20 pt-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium">Reset workspace</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Clear campaigns and templates but keep your account and billing. Requires
                      confirmation.
                    </p>
                  </div>
                  <Button type="button" variant="outline" onClick={() => setResetDialogOpen(true)}>
                    Reset workspace
                  </Button>
                </div>
                <div className="flex flex-col justify-between gap-4 border-t border-destructive/20 pt-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium">Delete workspace</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Permanently remove campaigns, templates, contacts, and message history.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete workspace
                  </Button>
                </div>
              </div>
            </section>
          </TabsContent>
        </SettingsTabs>

        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80",
            "lg:left-64"
          )}
        >
          <div className="mx-auto flex max-w-4xl justify-end gap-3">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="button">Save changes</Button>
          </div>
        </div>
      </motion.div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your workspace, including all campaigns, templates,
              contacts, and message history. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Delete workspace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes campaigns and templates from this workspace. Your account, team, and
              billing remain. Continue only if you understand the impact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setResetDialogOpen(false)}>
              Reset workspace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Settings;
