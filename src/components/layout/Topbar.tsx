import { useEffect, useState } from "react"
import { Search, Sun, Moon, Bell, ChevronDown } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function Topbar() {
  const { theme, setTheme } = useTheme()
  const now = useClock()

  const utc = now.toISOString().slice(11, 19)
  const local = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30 flex items-center px-6 gap-4">
      {/* Architectural section marker */}
      <div className="micro text-muted-foreground hidden md:block">
        <span className="text-[--vermillion]">◉</span>&nbsp; UMT / Reporting Console
      </div>

      <div className="hidden md:block h-5 w-px bg-border" />

      {/* Search */}
      <div className="relative max-w-sm w-full">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search sessions, users, applications…"
          className="pl-8 h-9 rounded-md bg-card/60 hairline text-[13px] focus-visible:ring-1 focus-visible:ring-[--vermillion]"
        />
        <kbd className="hidden sm:flex absolute right-2.5 top-1/2 -translate-y-1/2 num text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      <div className="flex-1" />

      {/* Live clock — UTC + Local. Engineering control rooms care. */}
      <div className="hidden lg:flex items-stretch gap-3 num text-[11px] text-muted-foreground">
        <ClockChip label="UTC"    value={utc} />
        <ClockChip label="LOCAL"  value={local} />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="size-9 rounded-md"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      </Button>

      <Button variant="ghost" size="icon" className="size-9 rounded-md relative">
        <Bell size={15} />
        <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[--vermillion] signal-pulse" />
      </Button>

      <div className="h-5 w-px bg-border" />

      <button className={cn(
        "flex items-center gap-2.5 pl-2 pr-3 h-9 rounded-md hover:bg-accent/60 transition-colors",
      )}>
        <Avatar className="size-7 ring-1 ring-border">
          <AvatarFallback className="num text-[10px] bg-[--vermillion]/10 text-[--vermillion]">
            VK
          </AvatarFallback>
        </Avatar>
        <div className="text-left leading-tight hidden md:block">
          <div className="text-[12px] font-medium">v.kanvs</div>
          <div className="micro text-muted-foreground/80">ANALYST · NA</div>
        </div>
        <ChevronDown size={14} className="text-muted-foreground" />
      </button>
    </header>
  )
}

function ClockChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-end justify-center px-3 hairline rounded-md min-w-[5.5rem]">
      <span className="micro text-muted-foreground/70 leading-none mt-1.5">{label}</span>
      <span className="text-foreground leading-none mb-1.5 mt-0.5 tracking-wider">{value}</span>
    </div>
  )
}
