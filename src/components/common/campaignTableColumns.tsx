import type { ReactNode } from "react";
import StatusBadge from "@/components/StatusBadge";
import type { DataTableColumn } from "@/components/common/DataTable";
import type { Campaign } from "@/data/mockCampaigns";

export function createCampaignTableColumns(
  renderActions: (campaign: Campaign) => ReactNode
): DataTableColumn<Campaign>[] {
  return [
    {
      id: "name",
      header: "Campaign Name",
      cell: (c) => <span className="font-medium">{c.name}</span>,
    },
    {
      id: "audience",
      header: "Audience",
      cell: (c) => <span className="text-muted-foreground">{c.audience}</span>,
    },
    {
      id: "template",
      header: "Template",
      headerClassName: "hidden md:table-cell",
      className: "hidden text-muted-foreground md:table-cell",
      cell: (c) => <span>{c.template}</span>,
    },
    {
      id: "status",
      header: "Status",
      cell: (c) => <StatusBadge status={c.status} />,
    },
    {
      id: "sent",
      header: "Sent",
      headerClassName: "hidden lg:table-cell",
      className: "hidden lg:table-cell",
      cell: (c) => <span>{c.sentCount.toLocaleString()}</span>,
    },
    {
      id: "delivered",
      header: "Delivered",
      headerClassName: "hidden lg:table-cell",
      className: "hidden lg:table-cell",
      cell: (c) => <span>{c.delivered.toLocaleString()}</span>,
    },
    {
      id: "created",
      header: "Created",
      headerClassName: "hidden md:table-cell",
      className: "hidden text-muted-foreground md:table-cell",
      cell: (c) => (
        <span>
          {new Date(c.createdDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      headerClassName: "w-12",
      className: "w-12",
      cell: (c) => renderActions(c),
    },
  ];
}
