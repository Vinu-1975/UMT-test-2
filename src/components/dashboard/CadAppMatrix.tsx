import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
import { cadAppMatrix, cadUsage } from "@/lib/mock-data"
import { compact } from "@/lib/format"

const PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export function CadAppMatrix() {
  const cads = cadUsage.map((c) => c.cad)

  const config = cads.reduce((acc, cad, i) => {
    acc[cad] = { label: cad, color: PALETTE[i % PALETTE.length] }
    return acc
  }, {} as ChartConfig)

  return (
    <ChartFrame
      plate="07"
      title="CAD × Application Matrix"
      caption="Grouped bars · top 6 applications by CAD"
      meta={<span className="num">{cads.length} CADs × 6 apps</span>}
      footer={
        <>
          {cads.map((c, i) => (
            <span key={c} className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-sm"
                style={{ background: PALETTE[i % PALETTE.length] }}
              />
              {c}
            </span>
          ))}
          <span className="ml-auto">aggregated, normalized labels</span>
        </>
      }
    >
      <ChartContainer config={config} className="h-[300px] w-full aspect-auto">
        <BarChart
          data={cadAppMatrix}
          margin={{ top: 16, left: 0, right: 8, bottom: 32 }}
        >
          <CartesianGrid stroke="var(--grid-line)" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="application"
            tickLine={false}
            axisLine={false}
            angle={-15}
            textAnchor="end"
            interval={0}
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
          <Legend
            iconSize={8}
            wrapperStyle={{
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              paddingBottom: 8,
            }}
          />
          {cads.map((cad, i) => (
            <Bar
              key={cad}
              dataKey={cad}
              fill={PALETTE[i % PALETTE.length]}
              radius={[2, 2, 0, 0]}
              maxBarSize={22}
            />
          ))}
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  )
}
