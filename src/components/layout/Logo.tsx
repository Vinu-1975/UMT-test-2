/**
 * UMT mark.
 * The glyph is a stylized cross-section: two crossed axes with a centered
 * dot — references both architectural section markers and CAD origin
 * indicators. Drawn in SVG so it inherits currentColor.
 */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="text-foreground"
      >
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" />
        <path d="M16 1 V31" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <path d="M1 16 H31" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="16" cy="16" r="3" fill="var(--vermillion)" />
        <circle cx="16" cy="16" r="6.5" stroke="var(--vermillion)" strokeWidth="0.75" />
      </svg>
      <div className="leading-none">
        <div className="display text-[1.05rem] tracking-tight">
          UMT<span className="text-[--vermillion]">.</span>
        </div>
        <div className="micro text-muted-foreground mt-0.5">
          Usage Monitoring
        </div>
      </div>
    </div>
  )
}
