import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  id: string;
  header: ReactNode;
  headerClassName?: string;
  className?: string;
  cell: (row: T, rowIndex: number) => ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId?: (row: T, index: number) => string;
  loading?: boolean;
  emptyState?: ReactNode;
  scrollable?: boolean;
  /** Scroll area classes. With titled + fixed-height parent use `h-full`. Default: `max-h-[420px]` */
  heightClassName?: string;
  className?: string;
  title?: ReactNode;
  /** Renders below the table inside the same card (e.g. pagination) */
  footer?: ReactNode;
  compact?: boolean;
}

const defaultHeaderCell =
  "text-left align-middle font-semibold text-muted-foreground whitespace-nowrap border-b border-border bg-card";

const skeletonPulse = "animate-pulse rounded-md bg-muted";

export function DataTable<T>({
  columns,
  data,
  getRowId = (_, i) => String(i),
  loading = false,
  emptyState,
  scrollable = false,
  heightClassName,
  className,
  title,
  footer,
  compact = true,
}: DataTableProps<T>) {
  const cellPad = compact ? "px-3 py-2 text-sm" : "px-4 py-3 text-sm";
  const headPad = compact ? "h-9 px-3 py-2 text-xs" : "h-12 px-4 py-3 text-sm";

  const table = (
    <table className="w-full caption-bottom border-collapse text-sm">
      <thead
        className={cn(
          scrollable && "sticky top-0 z-[1] shadow-[inset_0_-1px_0_0_hsl(var(--border))]"
        )}
      >
        <tr className="border-b border-border hover:bg-transparent">
          {columns.map((col) => (
            <th
              key={col.id}
              scope="col"
              className={cn(defaultHeaderCell, headPad, col.headerClassName)}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">
        {loading ? (
          Array.from({ length: 5 }).map((_, si) => (
            <tr key={`sk-${si}`} className="border-b border-border">
              {columns.map((col) => (
                <td key={col.id} className={cn(cellPad, col.className)}>
                  <div className={cn(skeletonPulse, "h-4 w-full max-w-[8rem]")} />
                </td>
              ))}
            </tr>
          ))
        ) : data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className={cn(cellPad, "py-10 text-center text-muted-foreground")}
            >
              {emptyState ?? "No results."}
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr
              key={getRowId(row, rowIndex)}
              className="border-b border-border transition-colors hover:bg-muted/50"
            >
              {columns.map((col) => (
                <td key={col.id} className={cn(cellPad, "align-middle", col.className)}>
                  {col.cell(row, rowIndex)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const scrollInnerClass = cn(
    "scrollbar-y-dashboard overflow-x-auto overflow-y-auto",
    heightClassName ?? (title ? "h-full" : "max-h-[420px]")
  );

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      {title ? (
        <div className="flex-shrink-0 border-b border-border px-5 py-3">{title}</div>
      ) : null}
      {scrollable ? (
        <div
          className={cn(
            title && "flex min-h-0 flex-1 flex-col overflow-hidden"
          )}
        >
          <div className={cn(scrollInnerClass, title && "min-h-0 flex-1")}>{table}</div>
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-dashboard">{table}</div>
      )}
      {footer ? (
        <div className="flex-shrink-0 border-t border-border">{footer}</div>
      ) : null}
    </div>
  );
}
