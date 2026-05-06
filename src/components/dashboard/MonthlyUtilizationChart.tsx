import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ChartFrame } from "./ChartFrame"
import { monthlyUsage } from "@/lib/mock-data"
import { compact } from "@/lib/format"

const config = {
  productionSessions: {
    label: "Production",
    color: "var(--chart-1)",
  },
  testSessions: {
    label: "Test",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function MonthlyUtilizationChart() {
  const total = monthlyUsage.reduce((s, p) => s + p.sessions, 0)
  const peak = monthlyUsage.reduce((m, p) => (p.sessions > m.sessions ? p : m))
  const avg = Math.round(total / monthlyUsage.length)

  return (
    <ChartFrame
      plate="03"
      title="Monthly Utilization"
      caption="Production + Test sessions, calendar-year"
      meta={
        <span className="num">
          ↑ peak <span className="text-foreground">{peak.month}</span> ·{" "}
          {compact(peak.sessions)}
        </span>
      }
      footer={
        <>
          <span>N = <span className="text-foreground">{compact(total)}</span> sessions</span>
          <span>·</span>
          <span>μ = {compact(avg)} / mo</span>
          <span className="ml-auto">excl. PMC validation, SMART CVT sub-ops</span>
        </>
      }
    >
      <ChartContainer config={config} className="h-[280px] w-full aspect-auto">
        <AreaChart data={monthlyUsage} margin={{ top: 16, left: 0, right: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="g-prod" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="g-test" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.32} />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="var(--grid-line)"
            strokeDasharray="2 4"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => compact(v)}
            width={40}
          />
          <ReferenceLine
            y={avg}
            stroke="var(--vermillion)"
            strokeDasharray="3 3"
            strokeOpacity={0.5}
            label={{
              value: `μ ${compact(avg)}`,
              position: "right",
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              fill: "var(--vermillion)",
            }}
          />
          <ChartTooltip
            cursor={{ stroke: "var(--vermillion)", strokeWidth: 1, strokeDasharray: "3 3" }}
            content={
              <ChartTooltipContent
                indicator="line"
                className="num"
                formatter={(v, n) => [compact(v as number), n as string]}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="productionSessions"
            stroke="var(--chart-1)"
            strokeWidth={1.75}
            fill="url(#g-prod)"
            isAnimationActive
            animationDuration={900}
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="testSessions"
            stroke="var(--chart-2)"
            strokeWidth={1.25}
            fill="url(#g-test)"
            isAnimationActive
            animationDuration={900}
            stackId="1"
          />
        </AreaChart>
      </ChartContainer>
    </ChartFrame>
  )
}
