import { Cell, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ChartFrame } from "./ChartFrame"
import { compact, pct } from "@/lib/format"

/**
 * Reusable two-segment donut (VDI vs Non-VDI, Production vs Test).
 * Charts 5.8 and 5.9 share enough structure that we render one component.
 */
export function SplitDonut({
  plate,
  title,
  caption,
  data,
  colors,
  hint,
}: {
  plate: string
  title: string
  caption: string
  data: { name: string; value: number }[]
  colors: [string, string]
  hint?: string
}) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const config: ChartConfig = {
    a: { label: data[0].name, color: colors[0] },
    b: { label: data[1].name, color: colors[1] },
  }

  return (
    <ChartFrame
      plate={plate}
      title={title}
      caption={caption}
      meta={<span className="num">N = {compact(total)}</span>}
      footer={hint ? <span>{hint}</span> : undefined}
    >
      <div className="flex items-center gap-5 h-[200px]">
        <div className="relative h-full w-[160px] shrink-0">
          <ChartContainer config={config} className="h-full w-full aspect-auto">
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
                innerRadius={48}
                outerRadius={76}
                paddingAngle={2}
                stroke="var(--card)"
                strokeWidth={2}
                isAnimationActive
                animationDuration={900}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((d, i) => (
                  <Cell key={d.name} fill={colors[i]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            <span className="micro text-muted-foreground">SHARE</span>
            <span className="num text-xl tracking-tight mt-0.5">
              {pct((data[0].value / total) * 100, 1)}
            </span>
            <span className="micro text-[--vermillion]/80 mt-0.5">{data[0].name.toUpperCase()}</span>
          </div>
        </div>

        {/* Two-row legend with totals */}
        <ul className="flex-1 grid grid-cols-1 gap-2 num text-[12px]">
          {data.map((d, i) => (
            <li key={d.name} className="hairline rounded-sm px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-sm"
                    style={{ background: colors[i] }}
                  />
                  <span className="micro">{d.name}</span>
                </span>
                <span className="text-muted-foreground/80">
                  {pct((d.value / total) * 100, 1)}
                </span>
              </div>
              <div className="num text-foreground text-base">{compact(d.value)}</div>
            </li>
          ))}
        </ul>
      </div>
    </ChartFrame>
  )
}
