import { PageHero } from "@/components/dashboard/PageHero"
import { FilterBar } from "@/components/dashboard/FilterBar"
import { SectionMarker } from "@/components/layout/SectionMarker"
import { RawSessionsTable } from "@/components/dashboard/RawSessionsTable"

export function SessionsPage() {
  return (
    <>
      <PageHero
        eyebrow="03 / SESSION LOG"
        title={
          <>
            <span className="italic">Audit-grade</span> session detail.
          </>
        }
        description="The full row-level log feeding the chart deck. Server-filtered, paginated, exportable. Use ⌘K to jump to a session ID."
      />
      <FilterBar />
      <SectionMarker index="3.1" title="ALL SESSIONS" caption="ROW-LEVEL · PAGINATED" />
      <RawSessionsTable />
    </>
  )
}
