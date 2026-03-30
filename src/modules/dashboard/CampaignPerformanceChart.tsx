import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/modules/dashboard/ChartCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChartMetricKey, HeaderDateRange } from "@/data/mockDashboard";
import { chartData7d, chartData30d } from "@/data/mockDashboard";

interface CampaignPerformanceChartProps {
  metric: ChartMetricKey;
  onMetricChange: (m: ChartMetricKey) => void;
  /** Synced with header date range (7d / 30d). */
  range: HeaderDateRange;
  /** Fill parent height (e.g. h-[420px] dashboard column). */
  fillHeight?: boolean;
  className?: string;
}

const metricButtons: { key: ChartMetricKey; label: string }[] = [
  { key: "messages", label: "Messages Sent" },
  { key: "delivery", label: "Delivery Rate" },
];

export function CampaignPerformanceChart({
  metric,
  onMetricChange,
  range,
  fillHeight = false,
  className,
}: CampaignPerformanceChartProps) {
  const raw = range === "7d" ? chartData7d : chartData30d;

  const data = useMemo(
    () =>
      raw.map((d) => ({
        label: d.label,
        value: metric === "messages" ? d.messages : d.delivery,
      })),
    [raw, metric]
  );

  const chartConfig = useMemo(() => {
    const labels: Record<ChartMetricKey, string> = {
      messages: "Messages sent",
      delivery: "Delivery rate (%)",
    };
    return {
      value: {
        label: labels[metric],
        color: "hsl(var(--primary))",
      },
    } satisfies ChartConfig;
  }, [metric]);

  const formatY = (v: number) => {
    if (metric === "messages") {
      if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
      return String(v);
    }
    return `${v}%`;
  };

  return (
    <ChartCard
      title="Campaign Performance"
      className={cn(
        fillHeight && "flex h-full min-h-0 flex-col overflow-hidden",
        className
      )}
      bodyClassName={fillHeight ? "flex min-h-0 flex-1 flex-col" : undefined}
      actions={
        <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-1">
          {metricButtons.map(({ key, label }) => (
            <Button
              key={key}
              type="button"
              variant={metric === key ? "default" : "ghost"}
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => onMetricChange(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      }
    >
      <ChartContainer
        config={chartConfig}
        className={cn(
          "w-full min-w-0",
          fillHeight ? "min-h-[200px] flex-1" : "h-[260px] sm:h-[300px]"
        )}
      >
        <LineChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/50" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="text-xs"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={44}
            tickFormatter={formatY}
            className="text-xs"
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(val) => (
                  <span className="font-mono tabular-nums">
                    {metric === "delivery" ? `${val}%` : (val as number).toLocaleString()}
                  </span>
                )}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ChartContainer>
    </ChartCard>
  );
}
