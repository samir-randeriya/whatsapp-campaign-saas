import type { ReactNode } from "react";
import { FileText, type LucideIcon } from "lucide-react";
import type { DataTableColumn } from "@/components/common/DataTable";
import TemplateStatusBadge from "@/components/TemplateStatusBadge";
import type { Template } from "@/data/mockTemplates";

export function createTemplateTableColumns(
  typeIcons: Record<string, LucideIcon>,
  renderActions: (template: Template) => ReactNode
): DataTableColumn<Template>[] {
  return [
    {
      id: "name",
      header: "Template Name",
      cell: (t) => <span className="font-medium">{t.name}</span>,
    },
    {
      id: "category",
      header: "Category",
      cell: (t) => (
        <span className="capitalize text-muted-foreground">{t.category}</span>
      ),
    },
    {
      id: "type",
      header: "Type",
      headerClassName: "hidden md:table-cell",
      className: "hidden md:table-cell",
      cell: (t) => {
        const TypeIcon = typeIcons[t.type] ?? FileText;
        return (
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <TypeIcon className="h-3.5 w-3.5" />
            <span className="capitalize">{t.type}</span>
          </span>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      cell: (t) => <TemplateStatusBadge status={t.status} />,
    },
    {
      id: "language",
      header: "Language",
      headerClassName: "hidden lg:table-cell",
      className: "hidden text-muted-foreground lg:table-cell",
      cell: (t) => <span>{t.language}</span>,
    },
    {
      id: "created",
      header: "Created",
      headerClassName: "hidden md:table-cell",
      className: "hidden text-muted-foreground md:table-cell",
      cell: (t) => (
        <span>
          {new Date(t.createdDate).toLocaleDateString("en-US", {
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
      cell: (t) => renderActions(t),
    },
  ];
}
