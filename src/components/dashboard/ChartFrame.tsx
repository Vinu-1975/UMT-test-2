import { cn } from "@/lib/utils"

/**
 * ChartFrame — every chart gets the same architectural plate frame:
 *   ┌─ PLATE 03 / MONTHLY UTILIZATION ────────── 12-MONTH ROLLING ──┐
 *   │                                                               │
 *   │  [chart body]                                                 │
 *   │                                                               │
 *   └─ N=104,310 sessions ───────────────────────────────── ◉ live ─┘
 *
 * This is the single most repeated visual element of the dashboard, so
 * it sets the tone. We use hairline borders, monospace plate numbers,
 * and a subtle blueprint grid behind the chart body.
 */
export function ChartFrame({
  plate,
  title,
  caption,
  meta,
  footer,
  className,
  children,
  bodyClassName,
  delay = 0,
}: {
  plate: string
  title: string
  caption?: string
  meta?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
  bodyClassName?: string
  delay?: number
}) {
  return (
    <section
      className={cn(
        "group relative flex flex-col rounded-md border border-border bg-card overflow-hidden",
        "reveal",
        className,
      )}
      style={{ ["--reveal-delay" as never]: `${delay}ms` }}
    >
      {/* HEADER PLATE */}
      <header className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card">
        <span className="num text-[10px] tracking-wider text-muted-foreground">
          PLATE&nbsp;{plate}
        </span>
        <span className="text-muted-foreground/60">/</span>
        <h3 className="text-[13px] font-medium tracking-tight">{title}</h3>
        {caption && (
          <span className="micro text-muted-foreground/80 hidden md:inline">
            · {caption}
          </span>
        )}
        <span className="flex-1" />
        {meta && <span className="micro text-muted-foreground">{meta}</span>}
      </header>

      {/* BODY */}
      <div
        className={cn(
          "relative flex-1 px-4 py-4 blueprint-grid-fine",
          bodyClassName,
        )}
        style={{
          backgroundColor: "transparent",
        }}
      >
        {children}
      </div>

      {/* FOOTER PLATE */}
      {footer && (
        <footer className="flex items-center gap-3 px-4 py-2 border-t border-border micro text-muted-foreground">
          {footer}
        </footer>
      )}
    </section>
  )
}
