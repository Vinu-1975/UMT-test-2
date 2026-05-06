import { useMemo, useState } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartFrame } from "./ChartFrame"
import { rawSessions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 12

export function RawSessionsTable() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rawSessions
    return rawSessions.filter((r) =>
      [r.id, r.application, r.cad, r.userId, r.machineId, r.domain, r.region]
        .join(" ")
        .toLowerCase()
        .includes(q),
    )
  }, [query])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pages - 1)
  const slice = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE)

  return (
    <ChartFrame
      plate="10"
      title="Raw Session Log"
      caption="Server-filtered · paginated · audit detail"
      meta={
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="filter…"
            className="h-7 pl-7 w-[180px] num text-[11px]"
          />
        </div>
      }
      footer={
        <>
          <span>
            <span className="text-foreground">{filtered.length}</span> rows ·
            page <span className="text-foreground">{safePage + 1}</span> /
            {pages}
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeft size={13} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              disabled={safePage >= pages - 1}
              onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            >
              <ChevronRight size={13} />
            </Button>
          </span>
        </>
      }
      bodyClassName="px-0 py-0"
    >
      <div className="overflow-x-auto scroll-discreet">
        <Table className="text-[11.5px]">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <Th>ID</Th>
              <Th>Application</Th>
              <Th>CAD</Th>
              <Th>User</Th>
              <Th>Machine</Th>
              <Th>Domain</Th>
              <Th>Region</Th>
              <Th>PC</Th>
              <Th align="right">Start</Th>
              <Th align="right">Stop</Th>
              <Th align="right">Status</Th>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slice.map((r) => (
              <TableRow key={r.id} className="border-border hover:bg-accent/40">
                <TableCell className="num text-[--vermillion]/90 px-4 py-2">{r.id}</TableCell>
                <TableCell className="px-4 py-2 text-foreground">{r.application}</TableCell>
                <TableCell className="num text-muted-foreground">{r.cad}</TableCell>
                <TableCell className="num text-muted-foreground">{r.userId}</TableCell>
                <TableCell className="num text-muted-foreground">{r.machineId}</TableCell>
                <TableCell className="num">{r.domain}</TableCell>
                <TableCell className="num">{r.region}</TableCell>
                <TableCell className="num text-muted-foreground">{r.productLine}</TableCell>
                <TableCell className="num text-right text-muted-foreground">
                  {formatHour(r.startTime)}
                </TableCell>
                <TableCell className="num text-right text-muted-foreground">
                  {formatHour(r.stopTime)}
                </TableCell>
                <TableCell className="px-4 py-2 text-right">
                  <StatusPill status={r.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ChartFrame>
  )
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode
  align?: "left" | "right"
}) {
  return (
    <TableHead
      className={cn(
        "micro text-muted-foreground px-4 h-9",
        align === "right" && "text-right",
      )}
    >
      {children}
    </TableHead>
  )
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Success: "bg-emerald-500/10 text-emerald-500",
    Failed: "bg-rose-500/10 text-rose-400",
    Aborted: "bg-amber-500/15 text-amber-400",
    Validation: "bg-blueprint/15 text-[--blueprint]",
  }
  return (
    <Badge
      variant="secondary"
      className={cn(
        "num text-[10px] tracking-wider rounded-sm py-0 px-1.5 h-5 font-normal border-0",
        map[status] ?? "bg-muted text-muted-foreground",
      )}
    >
      {status.toUpperCase()}
    </Badge>
  )
}

function formatHour(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}
