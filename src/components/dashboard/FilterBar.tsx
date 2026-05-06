import { useState } from "react"
import { Filter, RefreshCw, Download, ChevronDown } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { filterSources } from "@/lib/mock-data"

const RANGES = [
  { id: "30D", label: "30D" },
  { id: "90D", label: "90D" },
  { id: "YTD", label: "YTD" },
  { id: "12M", label: "12M" },
] as const

export function FilterBar() {
  const [range, setRange] = useState<string>("YTD")
  const [hardware, setHardware] = useState<string>("ALL")

  return (
    <div className="rounded-md border border-border bg-card p-3 mb-6">
      <div className="flex items-center flex-wrap gap-3">
        <div className="flex items-center gap-2 pr-3 border-r border-border">
          <Filter size={13} className="text-[--vermillion]" strokeWidth={1.75} />
          <span className="micro text-muted-foreground">Filters</span>
        </div>

        <FilterSelect label="App"     options={filterSources.application} />
        <FilterSelect label="CAD"     options={filterSources.cad} />
        <FilterSelect label="PC"      options={filterSources.productLine} />
        <FilterSelect label="Region"  options={filterSources.region} />
        <FilterSelect label="Domain"  options={filterSources.domain} />

        {/* Hardware toggle group */}
        <div className="hairline rounded-md inline-flex p-0.5">
          {(["ALL", "VDI", "NON_VDI"] as const).map((h) => (
            <button
              key={h}
              onClick={() => setHardware(h)}
              className={cn(
                "micro px-2.5 py-1 rounded-sm transition-colors",
                hardware === h
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {h.replace("_", "-")}
            </button>
          ))}
        </div>

        {/* Range pills */}
        <div className="hairline rounded-md inline-flex p-0.5 ml-auto">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={cn(
                "num text-[11px] px-2.5 py-1 rounded-sm transition-colors",
                range === r.id
                  ? "bg-[--vermillion] text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>

        <Button variant="ghost" size="sm" className="h-8 px-2.5 text-muted-foreground">
          <RefreshCw size={13} className="mr-1.5" /> <span className="micro">Sync</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2.5 text-muted-foreground">
          <Download size={13} className="mr-1.5" /> <span className="micro">Export</span>
        </Button>
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  options,
}: {
  label: string
  options: string[]
}) {
  return (
    <Select defaultValue={options[0]}>
      <SelectTrigger
        size="sm"
        className={cn(
          "h-8 hairline rounded-md min-w-[8.25rem] bg-transparent num text-[11px] gap-1.5",
          "data-[state=open]:border-foreground/30",
        )}
      >
        <span className="micro text-muted-foreground/80">{label}</span>
        <SelectValue />
        <ChevronDown size={11} className="text-muted-foreground" />
      </SelectTrigger>
      <SelectContent className="num text-[12px]">
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
