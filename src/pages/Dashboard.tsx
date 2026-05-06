import { kpiCards, vdiSplit, productionSplit } from "@/lib/mock-data"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { FilterBar } from "@/components/dashboard/FilterBar"
import { PageHero } from "@/components/dashboard/PageHero"
import { SectionMarker } from "@/components/layout/SectionMarker"
import { MonthlyUtilizationChart } from "@/components/dashboard/MonthlyUtilizationChart"
import { ApplicationDonut } from "@/components/dashboard/ApplicationDonut"
import { ApplicationBars } from "@/components/dashboard/ApplicationBars"
import { CadUtilizationChart } from "@/components/dashboard/CadUtilizationChart"
import { CadAppMatrix } from "@/components/dashboard/CadAppMatrix"
import { RegionChart } from "@/components/dashboard/RegionChart"
import { DomainChart } from "@/components/dashboard/DomainChart"
import { SplitDonut } from "@/components/dashboard/SplitDonut"
import { RawSessionsTable } from "@/components/dashboard/RawSessionsTable"

export function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="01 / OVERVIEW · APR 2026"
        title={
          <>
            Engineering<br />
            <span className="italic text-[--vermillion]">telemetry</span>, drafted.
          </>
        }
        description="Cross-org CAD usage, hour by hour. Track adoption across CATIA, NX, Creo, SolidWorks and Inventor — at the application, region, and domain layer — without leaving the console."
        cta={{ label: "Open chart deck" }}
      />

      <FilterBar />

      {/* SECTION — Headline KPIs ----------------------------------- */}
      <SectionMarker
        index="01"
        title="HEADLINE METRICS"
        caption="ROLLING 12-MONTH"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpiCards.map((p, i) => (
          <KpiCard key={p.label} point={p} index={i} delay={i * 80} />
        ))}
      </div>

      {/* SECTION — Trend & Composition ----------------------------- */}
      <SectionMarker
        index="02"
        title="TREND & COMPOSITION"
        caption="MONTHLY · APPLICATION"
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-10">
        <div className="xl:col-span-2">
          <MonthlyUtilizationChart />
        </div>
        <ApplicationDonut />
      </div>

      {/* SECTION — Application & CAD breakdown --------------------- */}
      <SectionMarker
        index="03"
        title="APPLICATION & CAD"
        caption="STACKED · GROUPED"
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2">
          <ApplicationBars />
        </div>
        <CadUtilizationChart />
      </div>
      <div className="mb-10">
        <CadAppMatrix />
      </div>

      {/* SECTION — Region, Domain, Hardware ------------------------ */}
      <SectionMarker
        index="04"
        title="REGION · DOMAIN · HARDWARE"
        caption="GEOGRAPHIC + INFRA"
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <RegionChart />
        <DomainChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
        <SplitDonut
          plate="11"
          title="VDI vs Non-VDI"
          caption="Hardware infrastructure split"
          data={vdiSplit}
          colors={["var(--chart-1)", "var(--chart-6)"]}
          hint="VDI hosts run a hardened CAD profile · audited weekly"
        />
        <SplitDonut
          plate="12"
          title="Production vs Test"
          caption="Drive flag, telemetry-derived"
          data={productionSplit}
          colors={["var(--chart-3)", "var(--chart-4)"]}
          hint="Test sessions excluded from licensing forecasts"
        />
      </div>

      {/* SECTION — Raw log ----------------------------------------- */}
      <SectionMarker
        index="05"
        title="RAW SESSION LOG"
        caption="AUDIT DETAIL · PAGINATED"
      />
      <RawSessionsTable />
    </>
  )
}
