import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PageHero } from "@/components/dashboard/PageHero"
import { FilterBar } from "@/components/dashboard/FilterBar"
import { SectionMarker } from "@/components/layout/SectionMarker"
import { MonthlyUtilizationChart } from "@/components/dashboard/MonthlyUtilizationChart"
import { ApplicationDonut } from "@/components/dashboard/ApplicationDonut"
import { ApplicationBars } from "@/components/dashboard/ApplicationBars"
import { CadUtilizationChart } from "@/components/dashboard/CadUtilizationChart"
import { CadAppMatrix } from "@/components/dashboard/CadAppMatrix"
import { RegionChart } from "@/components/dashboard/RegionChart"
import { DomainChart } from "@/components/dashboard/DomainChart"
import { SplitDonut } from "@/components/dashboard/SplitDonut"
import { vdiSplit, productionSplit } from "@/lib/mock-data"

const TABS = [
  { id: "trend",        label: "TREND" },
  { id: "applications", label: "APPLICATIONS" },
  { id: "cad",          label: "CAD" },
  { id: "geography",    label: "REGION/DOMAIN" },
  { id: "infra",        label: "INFRASTRUCTURE" },
] as const

export function ChartsPage() {
  return (
    <>
      <PageHero
        eyebrow="02 / CHART DECK"
        title={
          <>
            <span className="italic">Charts</span>, deeply.
          </>
        }
        description="Every utilization signal the legacy reporting page exposes — modeled, normalized, and rendered in the Blueprint Atelier system."
      />
      <FilterBar />

      <Tabs defaultValue="trend">
        <TabsList className="bg-card hairline rounded-md p-1 mb-6 h-auto">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.id}
              value={t.id}
              className="num text-[11px] tracking-wider px-3 py-1.5 data-[state=active]:bg-foreground data-[state=active]:text-background rounded-sm"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="trend">
          <SectionMarker index="2.1" title="MONTHLY UTILIZATION" caption="LINE · AREA" />
          <MonthlyUtilizationChart />
        </TabsContent>

        <TabsContent value="applications">
          <SectionMarker index="2.2" title="APPLICATION SHARE & MATRIX" caption="DONUT · STACKED BARS" />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <ApplicationDonut />
            <div className="xl:col-span-2">
              <ApplicationBars />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cad">
          <SectionMarker index="2.3" title="CAD UTILIZATION" caption="GROUPED · MATRIX" />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <CadUtilizationChart />
            <CadAppMatrix />
          </div>
        </TabsContent>

        <TabsContent value="geography">
          <SectionMarker index="2.4" title="REGION & DOMAIN" caption="HORIZONTAL · LOLLIPOP" />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <RegionChart />
            <DomainChart />
          </div>
        </TabsContent>

        <TabsContent value="infra">
          <SectionMarker index="2.5" title="INFRASTRUCTURE" caption="VDI · PRODUCTION/TEST" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SplitDonut
              plate="11"
              title="VDI vs Non-VDI"
              caption="Hardware split"
              data={vdiSplit}
              colors={["var(--chart-1)", "var(--chart-6)"]}
            />
            <SplitDonut
              plate="12"
              title="Production vs Test"
              caption="Drive flag"
              data={productionSplit}
              colors={["var(--chart-3)", "var(--chart-4)"]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
