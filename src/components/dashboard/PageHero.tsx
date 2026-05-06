import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Editorial page hero — the magazine-style headline plate that opens
 * each page. Display serif (Fraunces) for the title, mono caption.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  cta,
}: {
  eyebrow: string
  title: React.ReactNode
  description: string
  cta?: { label: string; href?: string }
}) {
  return (
    <div className="relative mb-8 reveal">
      {/* Inset measurement marks */}
      <div className="absolute -top-2 left-0 right-0 h-3 ruler-top opacity-40 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end gap-6 pt-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 micro text-muted-foreground mb-3">
            <span className="text-[--vermillion]">◉</span>
            <span>{eyebrow}</span>
            <span className="flex-1 h-px bg-border" />
          </div>
          <h1 className="display text-[3rem] md:text-[4.25rem] leading-[0.9] tracking-tighter">
            {title}
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-[14px] leading-relaxed">
            {description}
          </p>
        </div>
        {cta && (
          <Button
            size="lg"
            className="num h-11 px-5 text-[12px] tracking-wider uppercase bg-foreground text-background hover:bg-foreground/85"
          >
            {cta.label}
            <ArrowUpRight size={15} className="ml-1.5" strokeWidth={1.75} />
          </Button>
        )}
      </div>
    </div>
  )
}
