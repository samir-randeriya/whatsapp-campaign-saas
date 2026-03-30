export interface Campaign {
  id: string;
  name: string;
  audience: string;
  template: string;
  status: "draft" | "scheduled" | "sent" | "failed";
  sentCount: number;
  delivered: number;
  createdDate: string;
}

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Spring Sale Announcement",
    audience: "All Customers",
    template: "Promotional Offer",
    status: "sent",
    sentCount: 12450,
    delivered: 11980,
    createdDate: "2026-03-15",
  },
  {
    id: "2",
    name: "New Product Launch",
    audience: "Premium Users",
    template: "Product Update",
    status: "scheduled",
    sentCount: 0,
    delivered: 0,
    createdDate: "2026-03-20",
  },
  {
    id: "3",
    name: "Weekly Newsletter",
    audience: "Newsletter Subscribers",
    template: "Newsletter v2",
    status: "draft",
    sentCount: 0,
    delivered: 0,
    createdDate: "2026-03-22",
  },
  {
    id: "4",
    name: "Payment Reminder",
    audience: "Overdue Accounts",
    template: "Payment Notice",
    status: "failed",
    sentCount: 3200,
    delivered: 890,
    createdDate: "2026-03-10",
  },
  {
    id: "5",
    name: "Welcome Message",
    audience: "New Signups",
    template: "Welcome Template",
    status: "sent",
    sentCount: 5600,
    delivered: 5520,
    createdDate: "2026-03-18",
  },
  {
    id: "6",
    name: "Feature Update Alert",
    audience: "Active Users",
    template: "Feature Announcement",
    status: "scheduled",
    sentCount: 0,
    delivered: 0,
    createdDate: "2026-03-25",
  },
];
