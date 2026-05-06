import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center reveal">
      <div className="micro text-muted-foreground mb-4">
        <span className="text-[--vermillion]">◉</span> ERROR / 404
      </div>
      <div className="num text-[6rem] leading-none text-[--vermillion]">404</div>
      <h1 className="display text-4xl mt-4">
        Plate <span className="italic">missing</span> from the deck.
      </h1>
      <p className="text-muted-foreground mt-3 max-w-md text-[14px]">
        The route you requested isn't drafted in this build. Return to the
        overview to continue.
      </p>
      <Button asChild className="num mt-6 h-10 px-5 text-[12px] uppercase tracking-wider">
        <Link to="/">
          <ArrowLeft size={14} className="mr-2" />
          Back to overview
        </Link>
      </Button>
    </div>
  )
}
