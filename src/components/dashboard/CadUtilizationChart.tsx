import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ChartFrame } from "./ChartFrame"
import { cadUsage } from "@/lib/mock-data"
import { compact, pct } from "@/lib/format"

const config = {
  sessions: { label: "Sessions", color: "var(--chart-1)" },
} satisfies ChartConfig

export function CadUtilizationChart() {
  const total = cadUsage.reduce((s, c) => s + c.sessions, 0)
  const data = cadUsage.map((c) => ({
    cad: c.cad,
    sessions: c.sessions,
    share: c.share,
  }))
  const leader = data[0]

  return (
    <ChartFrame
      plate="06"
      title="CAD Platform Utilization"
      caption="Sessions grouped by CAD"
      meta={<span className="num">{data.length} platforms · YTD</span>}
      footer={
        <>
          <span>leader: <span className="text-foreground">{leader.cad}</span></span>
          <span>·</span>
          <span>{pct(leader.share * 100, 1)} of total</span>
          <span className="ml-auto">internal block ops excluded</span>
        </>
      }
    >
      <ChartContainer config={config} className="h-[260px] w-full aspect-auto">
        <BarChart
          data={data}
          margin={{ top: 24, left: 0, right: 8, bottom: 8 }}
        >
          <CartesianGrid stroke="var(--grid-line)" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="cad"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}
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
                formatter={(v) => [compact(v as number), "Sessions"]}
              />
            }
          />
          <Bar
            dataKey="sessions"
            fill="var(--chart-1)"
            radius={[3, 3, 0, 0]}
            barSize={42}
          >
            <LabelList
              dataKey="sessions"
              position="top"
              fontSize={10}
              fontFamily="var(--font-mono)"
              fill="var(--foreground)"
              formatter={(v) => {
                const n = Number(v)
                return `${compact(n)} · ${pct((n / total) * 100, 1)}`
              }}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  )
}
