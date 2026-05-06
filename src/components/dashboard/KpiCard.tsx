import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

import { cn } from "@/lib/utils"
import { compact, signed } from "@/lib/format"
import type { KpiPoint } from "@/lib/types"

/**
 * KPI card — the "vault stamp" of the dashboard.
 *
 * Layout: micro-label + plate number on top, oversized monospace numeral
 * as the hero, a delta arrow + sparkline at the bottom. The plate number
 * (01, 02, ...) reinforces the architectural section motif.
 */
export function KpiCard({
  point,
  index,
  delay = 0,
}: {
  point: KpiPoint
  index: number
  delay?: number
}) {
  const positive = point.delta > 0
  const negative = point.delta < 0
  const Arrow = positive ? ArrowUpRight : negative ? ArrowDownRight : Minus

  const series = point.spark.map((v, i) => ({ i, v }))
  const sparkColor = positive
    ? "var(--chart-3)"
    : negative
      ? "var(--vermillion)"
      : "var(--muted-foreground)"
  const sparkId = `spark-${index}`

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden rounded-md border border-border bg-card",
        "p-5 hover:border-foreground/30 transition-colors",
        "reveal",
      )}
      style={{ ["--reveal-delay" as never]: `${delay}ms` }}
    >
      {/* faint paper grain */}
      <div className="absolute inset-0 paper-grain opacity-30 pointer-events-none" />

      <div className="relative flex items-center justify-between">
        <span className="micro text-muted-foreground">{point.label}</span>
        <span className="num text-[10px] text-muted-foreground/70">
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex items-baseline gap-2 counter-in"
           style={{ ["--reveal-delay" as never]: `${delay + 120}ms` }}>
        <span className="num text-[2.6rem] leading-none tracking-tight font-medium">
          {compact(point.value)}
        </span>
        {point.unit && (
          <span className="num text-base text-muted-foreground">{point.unit}</span>
        )}
      </div>

      {point.hint && (
        <div className="text-[12px] text-muted-foreground -mt-1.5 leading-snug">
          {point.hint}
        </div>
      )}

      <div className="relative mt-1 flex items-center justify-between gap-3">
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 num text-[11px]",
            positive && "bg-emerald-500/10 text-emerald-500",
            negative && "bg-[--vermillion]/10 text-[--vermillion]",
            !positive && !negative && "bg-muted text-muted-foreground",
          )}
        >
          <Arrow size={12} strokeWidth={1.75} />
          {signed(point.delta)}
          <span className="text-muted-foreground/70 ml-1">vs prior</span>
        </div>

        <div className="h-7 flex-1 max-w-[60%]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <defs>
                <linearGradient id={sparkId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sparkColor} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={sparkColor}
                strokeWidth={1.25}
                fill={`url(#${sparkId})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* corner tick — like a survey marker */}
      <span
        className="absolute top-3 right-3 size-1.5 rounded-full bg-[--vermillion]/0 group-hover:bg-[--vermillion] transition-colors"
        aria-hidden
      />
    </div>
  )
}
