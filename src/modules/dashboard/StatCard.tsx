export interface StatCardItem {
  label: string;
  value: string;
  change?: string;
}

interface StatCardProps {
  item: StatCardItem;
}

export function StatCard({ item }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
      <p className="mt-1 font-display text-2xl font-bold">{item.value}</p>
      {item.change != null && item.change !== "" && (
        <p className="mt-1 text-xs text-muted-foreground">{item.change}</p>
      )}
    </div>
  );
}
