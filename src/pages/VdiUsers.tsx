import { Badge } from "@/components/ui/badge"
import { PageHero } from "@/components/dashboard/PageHero"
import { SectionMarker } from "@/components/layout/SectionMarker"
import { AdminTable, type AdminColumn } from "@/components/admin/AdminTable"
import { vdiUsers } from "@/lib/mock-data"
import type { VdiUserRecord } from "@/lib/types"
import { cn } from "@/lib/utils"

const columns: AdminColumn<VdiUserRecord>[] = [
  {
    key: "id",
    header: "ID",
    render: (r) => <span className="num text-[--vermillion]/90">{r.id}</span>,
  },
  {
    key: "fullName",
    header: "Name",
    render: (r) => (
      <div className="flex flex-col leading-tight">
        <span className="font-medium">{r.fullName}</span>
        <span className="num text-[10.5px] text-muted-foreground">{r.userId}</span>
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (r) => <span className="num text-[11.5px] text-muted-foreground">{r.email}</span>,
  },
  {
    key: "domain",
    header: "Domain",
    render: (r) => <span className="num">{r.domain}</span>,
  },
  {
    key: "region",
    header: "Region",
    render: (r) => <span className="num text-muted-foreground">{r.region}</span>,
  },
  {
    key: "hostName",
    header: "Host",
    render: (r) => <span className="num text-muted-foreground">{r.hostName}</span>,
  },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (r) => <StatusPill status={r.status} />,
    searchable: false,
  },
  {
    key: "createdAt",
    header: "Created",
    align: "right",
    render: (r) => (
      <span className="num text-muted-foreground text-[11px]">
        {new Date(r.createdAt).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })}
      </span>
    ),
    searchable: false,
  },
]

export function VdiUsersPage() {
  const active = vdiUsers.filter((u) => u.status === "Active").length
  const total = vdiUsers.length

  return (
    <>
      <PageHero
        eyebrow="04 / ADMIN · VDI"
        title={
          <>
            VDI <span className="italic">user</span> registry.
          </>
        }
        description="Provisioned virtual desktops, their owners, and current operational state. Used as the source of truth for VDI session attribution."
        cta={{ label: "Provision VDI" }}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat label="Total" value={total} />
        <Stat label="Active" value={active} accent />
        <Stat label="Suspended" value={vdiUsers.filter((u) => u.status === "Suspended").length} />
        <Stat label="Decommissioned" value={vdiUsers.filter((u) => u.status === "Decommissioned").length} />
      </div>

      <SectionMarker index="4.1" title="VDI USER RECORDS" caption="MANAGED INVENTORY" />
      <AdminTable rows={vdiUsers} columns={columns} addLabel="Provision" searchPlaceholder="Search VDI users…" />
    </>
  )
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string
  value: number
  accent?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-card p-4 reveal",
      )}
    >
      <div className="micro text-muted-foreground">{label}</div>
      <div
        className={cn(
          "num text-2xl mt-1.5",
          accent && "text-[--vermillion]",
        )}
      >
        {value.toString().padStart(2, "0")}
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: VdiUserRecord["status"] }) {
  const map: Record<VdiUserRecord["status"], string> = {
    Active: "bg-emerald-500/10 text-emerald-500",
    Suspended: "bg-amber-500/15 text-amber-400",
    Decommissioned: "bg-muted text-muted-foreground",
  }
  return (
    <Badge
      variant="secondary"
      className={cn(
        "num text-[10px] tracking-wider rounded-sm py-0 px-1.5 h-5 font-normal border-0",
        map[status],
      )}
    >
      {status.toUpperCase()}
    </Badge>
  )
}
