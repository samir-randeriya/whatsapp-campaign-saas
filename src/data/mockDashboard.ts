export type HeaderDateRange = "7d" | "30d";

export type ChartMetricKey = "messages" | "delivery";

export type DashboardCampaignRowStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "completed"
  | "failed";

export interface DashboardStatDefinition {
  id: string;
  title: string;
  value: string;
  changePercent: number;
  trend: "up" | "down";
  icon: "megaphone" | "file" | "send" | "percent" | "zap" | "alert" | "eye" | "mouse";
}

export interface ChartPoint {
  date: string;
  label: string;
  campaigns: number;
  messages: number;
  delivery: number;
}

export interface ActivityItem {
  id: string;
  kind: "campaign_created" | "template_approved" | "campaign_completed" | "contacts_imported";
  title: string;
  subtitle: string;
  timeLabel: string;
}

export interface WhatsAppConnection {
  connected: boolean;
  phone: string;
  businessName: string;
  lastSync: string;
}

const statsByHeaderRange: Record<HeaderDateRange, DashboardStatDefinition[]> = {
  "7d": [
    {
      id: "campaigns",
      title: "Campaigns",
      value: "24",
      changePercent: 4.2,
      trend: "up",
      icon: "megaphone",
    },
    {
      id: "templates",
      title: "Templates",
      value: "18",
      changePercent: 2.1,
      trend: "up",
      icon: "file",
    },
    {
      id: "messages",
      title: "Messages Sent",
      value: "12.4K",
      changePercent: 8.4,
      trend: "up",
      icon: "send",
    },
    {
      id: "delivery",
      title: "Delivery Rate",
      value: "96.4%",
      changePercent: 0.8,
      trend: "up",
      icon: "percent",
    },
    {
      id: "active",
      title: "Active Campaigns",
      value: "3",
      changePercent: 12.0,
      trend: "up",
      icon: "zap",
    },
    {
      id: "failed",
      title: "Failed Messages",
      value: "142",
      changePercent: 3.2,
      trend: "down",
      icon: "alert",
    },
    {
      id: "open",
      title: "Open Rate",
      value: "72.1%",
      changePercent: 1.4,
      trend: "up",
      icon: "eye",
    },
    {
      id: "click",
      title: "Click Rate",
      value: "18.6%",
      changePercent: 0.9,
      trend: "down",
      icon: "mouse",
    },
  ],
  "30d": [
    {
      id: "campaigns",
      title: "Campaigns",
      value: "24",
      changePercent: 11.0,
      trend: "up",
      icon: "megaphone",
    },
    {
      id: "templates",
      title: "Templates",
      value: "18",
      changePercent: 5.5,
      trend: "up",
      icon: "file",
    },
    {
      id: "messages",
      title: "Messages Sent",
      value: "48.2K",
      changePercent: 12.0,
      trend: "up",
      icon: "send",
    },
    {
      id: "delivery",
      title: "Delivery Rate",
      value: "96.4%",
      changePercent: 0.8,
      trend: "up",
      icon: "percent",
    },
    {
      id: "active",
      title: "Active Campaigns",
      value: "3",
      changePercent: 0,
      trend: "up",
      icon: "zap",
    },
    {
      id: "failed",
      title: "Failed Messages",
      value: "612",
      changePercent: 2.1,
      trend: "down",
      icon: "alert",
    },
    {
      id: "open",
      title: "Open Rate",
      value: "71.2%",
      changePercent: 2.8,
      trend: "up",
      icon: "eye",
    },
    {
      id: "click",
      title: "Click Rate",
      value: "17.9%",
      changePercent: 1.2,
      trend: "up",
      icon: "mouse",
    },
  ],
};

export const chartData7d: ChartPoint[] = [
  { date: "2026-03-22", label: "Mon", campaigns: 2, messages: 4200, delivery: 94.2 },
  { date: "2026-03-23", label: "Tue", campaigns: 3, messages: 5100, delivery: 95.1 },
  { date: "2026-03-24", label: "Wed", campaigns: 2, messages: 4800, delivery: 95.8 },
  { date: "2026-03-25", label: "Thu", campaigns: 4, messages: 6200, delivery: 96.0 },
  { date: "2026-03-26", label: "Fri", campaigns: 3, messages: 5900, delivery: 96.4 },
  { date: "2026-03-27", label: "Sat", campaigns: 1, messages: 2100, delivery: 97.1 },
  { date: "2026-03-28", label: "Sun", campaigns: 2, messages: 3400, delivery: 96.8 },
];

export const chartData30d: ChartPoint[] = [
  { date: "2026-03-01", label: "1", campaigns: 1, messages: 2800, delivery: 93.5 },
  { date: "2026-03-04", label: "4", campaigns: 2, messages: 4100, delivery: 94.8 },
  { date: "2026-03-07", label: "7", campaigns: 2, messages: 3900, delivery: 95.2 },
  { date: "2026-03-10", label: "10", campaigns: 3, messages: 5200, delivery: 95.6 },
  { date: "2026-03-13", label: "13", campaigns: 2, messages: 4600, delivery: 96.0 },
  { date: "2026-03-16", label: "16", campaigns: 4, messages: 7100, delivery: 96.2 },
  { date: "2026-03-19", label: "19", campaigns: 3, messages: 5800, delivery: 96.5 },
  { date: "2026-03-22", label: "22", campaigns: 3, messages: 5400, delivery: 96.4 },
  { date: "2026-03-25", label: "25", campaigns: 4, messages: 6800, delivery: 96.7 },
  { date: "2026-03-28", label: "28", campaigns: 3, messages: 6100, delivery: 96.4 },
];

export const templateActivity = {
  created: 18,
  pendingApproval: 4,
  approved: 12,
  rejected: 2,
};

export const activityFeed: ActivityItem[] = [
  {
    id: "a1",
    kind: "campaign_completed",
    title: "Campaign completed",
    subtitle: "Spring Sale Announcement finished sending",
    timeLabel: "2h ago",
  },
  {
    id: "a2",
    kind: "template_approved",
    title: "Template approved",
    subtitle: "Order Confirmation is live",
    timeLabel: "5h ago",
  },
  {
    id: "a3",
    kind: "campaign_created",
    title: "Campaign created",
    subtitle: "Flash Friday draft saved",
    timeLabel: "Yesterday",
  },
  {
    id: "a4",
    kind: "contacts_imported",
    title: "Contacts imported",
    subtitle: "1,240 contacts added from CSV",
    timeLabel: "Yesterday",
  },
  {
    id: "a5",
    kind: "template_approved",
    title: "Template approved",
    subtitle: "Welcome Message passed review",
    timeLabel: "2 days ago",
  },
];

export const whatsAppConnection: WhatsAppConnection = {
  connected: true,
  phone: "+1 (555) 012-3456",
  businessName: "Acme Commerce",
  lastSync: "Mar 28, 2026 · 10:42 AM",
};

const primaryMetricIds = ["messages", "delivery", "open", "active"] as const;

export function getDashboardPrimaryStats(
  range: HeaderDateRange
): DashboardStatDefinition[] {
  const all = statsByHeaderRange[range];
  return primaryMetricIds.map((id) => all.find((s) => s.id === id)!);
}
