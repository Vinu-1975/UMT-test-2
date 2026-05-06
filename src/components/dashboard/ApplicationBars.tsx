import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ChartFrame } from "./ChartFrame"
import { applicationUsage } from "@/lib/mock-data"
import { compact } from "@/lib/format"

const config = {
  validation: { label: "Validation",     color: "var(--chart-2)" },
  execution: { label: "Execution",       color: "var(--chart-1)" },
  blockCreation: { label: "Block Creation", color: "var(--chart-4)" },
  viewOps: { label: "View Ops",          color: "var(--chart-3)" },
} satisfies ChartConfig

export function ApplicationBars() {
  // Top 8 applications, sorted desc.
  const data = applicationUsage.slice(0, 8).map((a) => ({
    name: a.application,
    short: a.application.replace(/^.*? /, ""),
    validation: a.validation,
    execution: a.execution,
    blockCreation: a.blockCreation,
    viewOps: a.viewOps,
    total: a.sessions,
  }))

  return (
    <ChartFrame
      plate="05"
      title="Application Utilization Matrix"
      caption="Function-level breakdown · top 8 applications"
      meta={<span className="num">{data.length} applications · stacked</span>}
      footer={
        <>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-sm" style={{ background: "var(--chart-2)" }} /> Validation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-sm" style={{ background: "var(--chart-1)" }} /> Execution
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-sm" style={{ background: "var(--chart-4)" }} /> Block
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-sm" style={{ background: "var(--chart-3)" }} /> View
          </span>
          <span className="ml-auto">tooltip → per-function counts</span>
        </>
      }
    >
      <ChartContainer config={config} className="h-[320px] w-full aspect-auto">
        <BarChart data={data} margin={{ top: 28, left: 0, right: 8, bottom: 32 }}>
          <CartesianGrid stroke="var(--grid-line)" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="short"
            interval={0}
            tickLine={false}
            axisLine={false}
            angle={-22}
            textAnchor="end"
            tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
            height={42}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => compact(v)}
            width={36}
          />
          <ChartTooltip
            cursor={{ fill: "var(--accent)" }}
            content={
              <ChartTooltipContent
                className="num"
                formatter={(v, n) => [compact(v as number), n as string]}
              />
            }
          />
          <Bar dataKey="validation"     stackId="a" fill="var(--chart-2)" />
          <Bar dataKey="execution"      stackId="a" fill="var(--chart-1)" />
          <Bar dataKey="blockCreation"  stackId="a" fill="var(--chart-4)" />
          <Bar dataKey="viewOps"        stackId="a" fill="var(--chart-3)" radius={[3, 3, 0, 0]}>
            <LabelList
              dataKey="total"
              position="top"
              fontSize={9}
              fontFamily="var(--font-mono)"
              fill="var(--muted-foreground)"
              formatter={(v) => compact(Number(v))}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  )
}
