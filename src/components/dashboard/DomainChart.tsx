import { ChartFrame } from "./ChartFrame"
import { domainUsage } from "@/lib/mock-data"
import { compact, pct } from "@/lib/format"

/**
 * DomainChart — intentionally NOT a recharts component.
 * It's a hand-built horizontal lollipop / hairline-bar chart.
 * The variety helps the page rhythm — too many bar charts of the same
 * style start feeling repetitive.
 */
export function DomainChart() {
  const data = [...domainUsage].sort((a, b) => b.sessions - a.sessions)
  const max = Math.max(...data.map((d) => d.sessions))
  const total = data.reduce((s, d) => s + d.sessions, 0)

  return (
    <ChartFrame
      plate="09"
      title="Domain Distribution"
      caption="Corporate group · normalized"
      meta={<span className="num">{data.length} groups</span>}
      footer={
        <>
          <span>top: <span className="text-foreground">{data[0].domain}</span></span>
          <span>·</span>
          <span>{pct((data[0].sessions / total) * 100, 1)} share</span>
          <span className="ml-auto">multi-domain → single corporate group</span>
        </>
      }
    >
      <ul className="space-y-3 py-3">
        {data.map((d, i) => {
          const ratio = d.sessions / max
          return (
            <li
              key={d.domain}
              className="grid grid-cols-[3rem_10rem_1fr_5rem_3.5rem] items-center gap-3 text-[12px]"
            >
              <span className="num text-[10px] text-muted-foreground/70">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <span className="num text-foreground/90 truncate">
                {d.domain}
              </span>
              <div className="relative h-2 hairline rounded-sm overflow-hidden bg-card">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[--vermillion] to-[--vermillion]/40"
                  style={{ width: `${ratio * 100}%` }}
                />
                {/* tick mark for this row's value */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 size-2 rotate-45 bg-foreground"
                  style={{ left: `calc(${ratio * 100}% - 4px)` }}
                />
              </div>
              <span className="num text-foreground/90 tabular-nums text-right">
                {compact(d.sessions)}
              </span>
              <span className="micro text-muted-foreground/80 text-right">
                {d.corporateGroup}
              </span>
            </li>
          )
        })}
      </ul>
    </ChartFrame>
  )
}
