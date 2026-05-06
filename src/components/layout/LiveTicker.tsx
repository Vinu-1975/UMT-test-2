import { tickerEntries } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

/**
 * Stock-ticker style live feed of CAD sessions across the org.
 * The duplicated track + CSS keyframe gives an infinite scroll without
 * JS. Hovering pauses the animation (see ticker-scroll utility).
 */
export function LiveTicker() {
  // Duplicate the entries so the loop seam isn't visible.
  const items = [...tickerEntries, ...tickerEntries]

  return (
    <div
      className={cn(
        "relative h-9 border-b border-border bg-card/40 overflow-hidden",
        "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:z-10 before:pointer-events-none",
        "before:bg-gradient-to-r before:from-background before:to-transparent",
        "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:z-10 after:pointer-events-none",
        "after:bg-gradient-to-l after:from-background after:to-transparent",
      )}
    >
      <div className="absolute left-0 top-0 bottom-0 z-20 px-4 flex items-center gap-2 bg-background border-r border-border">
        <span className="size-1.5 rounded-full bg-[--vermillion] signal-pulse" />
        <span className="micro text-[--vermillion]">LIVE</span>
        <span className="micro text-muted-foreground">/&nbsp; SESSIONS&nbsp;FEED</span>
      </div>

      <div className="flex h-full whitespace-nowrap will-change-transform ticker-scroll pl-44">
        {items.map((it, idx) => (
          <TickerCell key={`${it.id}-${idx}`} entry={it} />
        ))}
      </div>
    </div>
  )
}

function TickerCell({
  entry,
}: {
  entry: typeof tickerEntries[number]
}) {
  const statusColor =
    entry.status === "Success"
      ? "text-emerald-500/90"
      : entry.status === "Failed"
        ? "text-rose-400"
        : entry.status === "Aborted"
          ? "text-amber-400"
          : "text-muted-foreground"

  return (
    <div className="flex items-center gap-3 px-5 num text-[11px] text-muted-foreground">
      <span className="text-[--vermillion]/60">{entry.delta}</span>
      <span className="text-foreground">{entry.id}</span>
      <span className="text-foreground/80">{entry.application}</span>
      <span className="opacity-70">·&nbsp;{entry.cad}</span>
      <span className="opacity-60">u·{entry.user.slice(1)}</span>
      <span className="opacity-60">{entry.region}</span>
      <span className="opacity-60">{entry.duration}m</span>
      <span className={statusColor}>{entry.status.toUpperCase()}</span>
    </div>
  )
}
