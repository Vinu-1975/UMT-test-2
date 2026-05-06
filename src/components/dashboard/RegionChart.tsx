import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
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
import { regionUsage } from "@/lib/mock-data"
import { compact } from "@/lib/format"

const config = {
  sessions: { label: "Sessions", color: "var(--chart-2)" },
} satisfies ChartConfig

export function RegionChart() {
  const data = [...regionUsage].sort((a, b) => b.sessions - a.sessions)
  const total = data.reduce((s, r) => s + r.sessions, 0)

  return (
    <ChartFrame
      plate="08"
      title="Region Distribution"
      caption="Sessions by reporting region"
      meta={<span className="num">{data.length} regions</span>}
      footer={
        <>
          <span>N = <span className="text-foreground">{compact(total)}</span></span>
          <span className="ml-auto">UTC offsets normalized</span>
        </>
      }
    >
      <ChartContainer config={config} className="h-[260px] w-full aspect-auto">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 6, left: 8, right: 36, bottom: 6 }}
        >
          <CartesianGrid stroke="var(--grid-line)" strokeDasharray="2 4" horizontal={false} />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => compact(v)}
          />
          <YAxis
            type="category"
            dataKey="regionLabel"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}
            width={108}
          />
          <ChartTooltip
            cursor={{ fill: "var(--accent)" }}
            content={
              <ChartTooltipContent
                className="num"
                formatter={(v) => [compact(v as number), "Sessions"]}
              />
            }
          />
          <Bar
            dataKey="sessions"
            fill="var(--chart-2)"
            radius={[0, 3, 3, 0]}
            barSize={20}
          >
            <LabelList
              dataKey="sessions"
              position="right"
              fontSize={10}
              fontFamily="var(--font-mono)"
              fill="var(--foreground)"
              formatter={(v) => compact(Number(v))}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  )
}
