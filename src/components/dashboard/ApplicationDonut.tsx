import { Cell, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ChartFrame } from "./ChartFrame"
import { applicationUsage } from "@/lib/mock-data"
import { compact, pct } from "@/lib/format"

const PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
]

export function ApplicationDonut() {
  const total = applicationUsage.reduce((s, a) => s + a.sessions, 0)
  // top 6 + 'Other'
  const top = applicationUsage.slice(0, 6)
  const otherSum = applicationUsage.slice(6).reduce((s, a) => s + a.sessions, 0)
  const data = [
    ...top.map((a, i) => ({
      name: a.application,
      value: a.sessions,
      fill: PALETTE[i],
    })),
    {
      name: "Other",
      value: otherSum,
      fill: "var(--muted-foreground)",
    },
  ]

  const config: ChartConfig = data.reduce((acc, d, i) => {
    acc[`s${i}`] = { label: d.name, color: d.fill }
    return acc
  }, {} as ChartConfig)

  const leader = data[0]

  return (
    <ChartFrame
      plate="04"
      title="Application Share"
      caption="% of total sessions"
      meta={<span className="num">{data.length} segments</span>}
      footer={
        <>
          <span>top: <span className="text-foreground">{leader.name}</span></span>
          <span>·</span>
          <span>{pct((leader.value / total) * 100, 1)} share</span>
          <span className="ml-auto">SMART CVT block, PMC validation excluded</span>
        </>
      }
    >
      <div className="flex items-center gap-6 h-[280px]">
        <div className="relative h-full w-[260px] shrink-0">
          <ChartContainer
            config={config}
            className="h-full w-full aspect-auto"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="num"
                    hideLabel
                    formatter={(v, _n, item) => [
                      `${compact(v as number)} (${pct(((v as number) / total) * 100, 1)})`,
                      item?.payload?.name ?? "",
                    ]}
                  />
                }
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={108}
                paddingAngle={1.5}
                stroke="var(--card)"
                strokeWidth={2}
                isAnimationActive
                animationBegin={120}
                animationDuration={900}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* Center hub label */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            <span className="micro text-muted-foreground">TOTAL · YTD</span>
            <span className="num text-2xl tracking-tight mt-1">{compact(total)}</span>
            <span className="micro text-[--vermillion]/80 mt-1">SESSIONS</span>
          </div>
        </div>

        {/* Legend rail */}
        <ul className="flex-1 grid gap-1.5 num text-[11px] min-w-0">
          {data.map((d) => (
            <li
              key={d.name}
              className="grid grid-cols-[10px_1fr_auto_auto] items-center gap-2 hairline rounded-sm px-2 py-1"
            >
              <span
                className="size-2 rounded-sm"
                style={{ background: d.fill }}
              />
              <span className="truncate text-foreground/90">{d.name}</span>
              <span className="text-muted-foreground">
                {compact(d.value)}
              </span>
              <span className="text-muted-foreground/70 w-10 text-right">
                {pct((d.value / total) * 100, 1)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartFrame>
  )
}
