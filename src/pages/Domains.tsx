import { PageHero } from "@/components/dashboard/PageHero"
import { SectionMarker } from "@/components/layout/SectionMarker"
import { AdminTable, type AdminColumn } from "@/components/admin/AdminTable"
import { domainRecords } from "@/lib/mock-data"
import type { DomainRecord } from "@/lib/types"

const columns: AdminColumn<DomainRecord>[] = [
  {
    key: "id",
    header: "ID",
    render: (r) => <span className="num text-[--vermillion]/90">{r.id}</span>,
  },
  {
    key: "domain",
    header: "Domain",
    render: (r) => <span className="num font-medium">{r.domain}</span>,
  },
  {
    key: "corporateGroup",
    header: "Corporate Group",
    render: (r) => <span>{r.corporateGroup}</span>,
  },
  {
    key: "region",
    header: "Region",
    render: (r) => <span className="num text-muted-foreground">{r.region}</span>,
  },
  {
    key: "ownerEmail",
    header: "Owner",
    render: (r) => (
      <span className="num text-[11.5px] text-muted-foreground">{r.ownerEmail}</span>
    ),
  },
  {
    key: "notes",
    header: "Notes",
    render: (r) =>
      r.notes ? (
        <span className="text-[11.5px] text-muted-foreground">{r.notes}</span>
      ) : (
        <span className="text-muted-foreground/40 text-[11px]">—</span>
      ),
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

export function DomainsPage() {
  return (
    <>
      <PageHero
        eyebrow="05 / ADMIN · DOMAINS"
        title={
          <>
            Corporate <span className="italic">domain</span> map.
          </>
        }
        description="Mappings from technical Active Directory domains to corporate reporting groups. Drives every domain-level chart in the deck."
        cta={{ label: "New mapping" }}
      />
      <SectionMarker index="5.1" title="DOMAIN RECORDS" caption="MAPPING TABLE" />
      <AdminTable
        rows={domainRecords}
        columns={columns}
        addLabel="New domain"
        searchPlaceholder="Search domains, groups, owners…"
      />
    </>
  )
}
