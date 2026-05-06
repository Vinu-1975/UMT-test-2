import { cn } from "@/lib/utils"

/**
 * Architectural section divider:  ◉── 01 / OVERVIEW ─────────── ●
 *
 * Inspired by drafting / engineering drawings where each plate is
 * labeled in the gutter. Plays a structural role in the page rhythm.
 */
export function SectionMarker({
  index,
  title,
  caption,
  className,
  trailing,
}: {
  index: string
  title: string
  caption?: string
  className?: string
  trailing?: React.ReactNode
}) {
  return (
    <div className={cn("flex items-center gap-3 mt-2 mb-4", className)}>
      <span className="text-[--vermillion] text-base leading-none">◉</span>
      <span className="num text-[11px] tracking-wider text-muted-foreground">
        {index}
      </span>
      <span className="micro text-foreground">{title}</span>
      {caption && (
        <span className="micro text-muted-foreground/80 hidden md:inline">
          / {caption}
        </span>
      )}
      <span className="flex-1 h-px bg-border" />
      {trailing}
      {!trailing && (
        <span className="text-muted-foreground/60 text-base leading-none">●</span>
      )}
    </div>
  )
}
