import { useMemo, useState } from "react"
import { Search, Plus, MoreHorizontal } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface AdminColumn<T> {
  key: string
  header: string
  align?: "left" | "right"
  render: (row: T) => React.ReactNode
  searchable?: boolean
}

/**
 * Generic, reusable admin list table.
 * Drives both VDI Users and Domains pages.
 */
export function AdminTable<T extends { id: string }>({
  rows,
  columns,
  emptyHint = "No records.",
  onAdd,
  addLabel = "New record",
  searchPlaceholder = "Search…",
}: {
  rows: T[]
  columns: AdminColumn<T>[]
  emptyHint?: string
  onAdd?: () => void
  addLabel?: string
  searchPlaceholder?: string
}) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      columns
        .filter((c) => c.searchable !== false)
        .map((c) => String(getRaw(r, c.key)))
        .join(" ")
        .toLowerCase()
        .includes(q),
    )
  }, [rows, columns, query])

  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <span className="num text-[10px] tracking-wider text-muted-foreground">
          {filtered.length.toString().padStart(3, "0")}&nbsp;/{rows.length.toString().padStart(3, "0")}
        </span>
        <span className="micro text-muted-foreground">RECORDS</span>
        <div className="relative ml-3 flex-1 max-w-sm">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-8 pl-8 num text-[12px] hairline rounded-md"
          />
        </div>
        <span className="flex-1" />
        {onAdd && (
          <Button
            onClick={onAdd}
            size="sm"
            className="h-8 num text-[11px] tracking-wider uppercase bg-[--vermillion] text-white hover:bg-[--vermillion]/90"
          >
            <Plus size={13} className="mr-1.5" />
            {addLabel}
          </Button>
        )}
      </div>

      <div className="overflow-x-auto scroll-discreet">
        <Table className="text-[12px]">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {columns.map((c) => (
                <TableHead
                  key={c.key}
                  className={cn(
                    "micro text-muted-foreground px-4 h-9",
                    c.align === "right" && "text-right",
                  )}
                >
                  {c.header}
                </TableHead>
              ))}
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center text-muted-foreground py-12 micro"
                >
                  {emptyHint}
                </TableCell>
              </TableRow>
            )}
            {filtered.map((row) => (
              <TableRow key={row.id} className="border-border hover:bg-accent/40">
                {columns.map((c) => (
                  <TableCell
                    key={c.key}
                    className={cn(
                      "px-4 py-2.5 align-middle",
                      c.align === "right" && "text-right",
                    )}
                  >
                    {c.render(row)}
                  </TableCell>
                ))}
                <TableCell className="px-2 py-1 text-right">
                  <RowMenu />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function RowMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground">
          <MoreHorizontal size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="num text-[12px]">
        <DropdownMenuItem>View detail</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Audit log</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-[--vermillion] focus:text-[--vermillion]">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getRaw<T>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key]
}
