import type {
  ApplicationUsage,
  CadUsage,
  DomainRecord,
  DomainUsage,
  KpiPoint,
  MonthlyUsagePoint,
  RawSessionRow,
  RegionUsage,
  VdiUserRecord,
} from "./types"

/**
 * Deterministic pseudo-random generator. We intentionally avoid Math.random
 * so the dashboard renders the same numbers across reloads — gives the
 * "live but stable" feeling without needing a backend.
 */
function mulberry32(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = t
    r = Math.imul(r ^ (r >>> 15), r | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(20260415)

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)]
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

/* ---------- Monthly Utilization (Chart 5.1) -------------------- */

export const monthlyUsage: MonthlyUsagePoint[] = MONTHS.map((m, i) => {
  const base = 8400 + Math.round(rand() * 4200)
  const seasonality = Math.sin((i / 12) * Math.PI * 2) * 1800
  const trend = i * 220
  const sessions = Math.max(2200, Math.round(base + seasonality + trend))
  const test = Math.round(sessions * (0.18 + rand() * 0.05))
  return {
    month: m,
    monthIndex: i,
    sessions,
    productionSessions: sessions - test,
    testSessions: test,
  }
})

/* ---------- Application × CAD (Chart 5.2 / 5.3) ----------------- */

const APP_DEFS: { name: string; cad: ApplicationUsage["cad"] }[] = [
  { name: "KBE Validator",         cad: "CATIA" },
  { name: "Block Composer",        cad: "CATIA" },
  { name: "PMC Toolkit",           cad: "CATIA" },
  { name: "SMART CVT",             cad: "CATIA" },
  { name: "Surface Inspector",     cad: "NX" },
  { name: "NX Macro Studio",       cad: "NX" },
  { name: "NX Routing",            cad: "NX" },
  { name: "Creo Sheet Wizard",     cad: "Creo" },
  { name: "Creo Wire Harness",     cad: "Creo" },
  { name: "SW Drawing Auto",       cad: "SolidWorks" },
  { name: "Inventor PartGen",      cad: "Inventor" },
  { name: "Inventor BOM Sync",     cad: "Inventor" },
]

export const applicationUsage: ApplicationUsage[] = APP_DEFS.map((a) => {
  const sessions = Math.round(2400 + rand() * 14600)
  const v = Math.round(sessions * (0.18 + rand() * 0.10))
  const e = Math.round(sessions * (0.30 + rand() * 0.10))
  const b = Math.round(sessions * (0.18 + rand() * 0.08))
  const view = sessions - v - e - b
  return {
    application: a.name,
    cad: a.cad,
    sessions,
    validation: v,
    execution: e,
    blockCreation: b,
    viewOps: view,
  }
}).sort((a, b) => b.sessions - a.sessions)

/* ---------- CAD totals (Chart 5.4) ----------------------------- */

export const cadUsage: CadUsage[] = (() => {
  const totals = applicationUsage.reduce<Record<string, number>>(
    (acc, a) => {
      acc[a.cad] = (acc[a.cad] ?? 0) + a.sessions
      return acc
    },
    {},
  )
  const sum = Object.values(totals).reduce((a, b) => a + b, 0)
  return Object.entries(totals)
    .map(([cad, sessions]) => ({
      cad: cad as CadUsage["cad"],
      sessions,
      share: sessions / sum,
    }))
    .sort((a, b) => b.sessions - a.sessions)
})()

/* ---------- CAD × Application matrix (Chart 5.5) --------------- */

export const cadAppMatrix = (() => {
  const cads = cadUsage.map((c) => c.cad)
  const topApps = applicationUsage.slice(0, 6).map((a) => a.application)
  return topApps.map((app) => {
    const row: Record<string, number | string> = { application: app }
    cads.forEach((cad) => {
      const match = applicationUsage.find(
        (a) => a.application === app && a.cad === cad,
      )
      row[cad] = match
        ? match.sessions
        : Math.round(rand() * 600)
    })
    return row
  })
})()

/* ---------- Region (Chart 5.6) --------------------------------- */

const REGION_SEED: RegionUsage[] = [
  { region: "NA",    regionLabel: "North America",  sessions: 0 },
  { region: "EU",    regionLabel: "Europe",         sessions: 0 },
  { region: "APAC",  regionLabel: "Asia-Pacific",   sessions: 0 },
  { region: "LATAM", regionLabel: "Latin America",  sessions: 0 },
  { region: "MEA",   regionLabel: "Middle East",    sessions: 0 },
]

export const regionUsage: RegionUsage[] = REGION_SEED.map((r, i) => ({
  ...r,
  sessions: Math.round([42100, 38700, 31200, 12800, 8400][i] + rand() * 2200),
}))

/* ---------- Domain (Chart 5.7) --------------------------------- */

export const domainUsage: DomainUsage[] = [
  { domain: "AERO.CORP",     corporateGroup: "Aerospace",       sessions: 0 },
  { domain: "AUTO.GLOBAL",   corporateGroup: "Automotive",      sessions: 0 },
  { domain: "DEF.INTRA",     corporateGroup: "Defense",         sessions: 0 },
  { domain: "MFG.PLANT",     corporateGroup: "Manufacturing",   sessions: 0 },
  { domain: "ENERGY.GRID",   corporateGroup: "Energy",          sessions: 0 },
  { domain: "MED.DEVICE",    corporateGroup: "Med Devices",     sessions: 0 },
  { domain: "RND.LAB",       corporateGroup: "R&D",             sessions: 0 },
].map((d, i) => ({
  ...d,
  sessions: Math.round(
    [28400, 24100, 19200, 17800, 9600, 6800, 4200][i] + rand() * 1800,
  ),
}))

/* ---------- VDI / Production splits (Charts 5.8 / 5.9) --------- */

export const vdiSplit = [
  { name: "VDI",     value: 64200 },
  { name: "Non-VDI", value: 38950 },
]

export const productionSplit = [
  { name: "Production", value: 87100 },
  { name: "Test",       value: 16050 },
]

/* ---------- Raw session table (5.10) --------------------------- */

const STATUSES: RawSessionRow["status"][] = [
  "Success", "Success", "Success", "Success",
  "Failed", "Aborted", "Validation",
]

export const rawSessions: RawSessionRow[] = Array.from({ length: 64 }, (_, i) => {
  const app = pick(applicationUsage)
  const region = pick(regionUsage)
  const domain = pick(domainUsage)
  const start = new Date(2026, 3, 1 + Math.floor(rand() * 28),
    8 + Math.floor(rand() * 9),
    Math.floor(rand() * 60))
  const stop = new Date(start.getTime() + (10 + rand() * 320) * 60_000)
  const userNum = 12000 + Math.floor(rand() * 8999)
  return {
    id: `S-${(7400000 + i).toString(36).toUpperCase()}`,
    application: app.application,
    cad: app.cad,
    userId: `u${userNum}`,
    machineId: `WS-${region.region}-${(1000 + Math.floor(rand() * 8999))}`,
    domain: domain.domain,
    region: region.region,
    productLine: pick(["Wing", "Fuselage", "Powertrain", "Cabin", "Avionics", "Chassis"]),
    startTime: start.toISOString(),
    stopTime: stop.toISOString(),
    status: pick(STATUSES),
    vdi: rand() > 0.4,
    productionDrive: rand() > 0.18,
  }
})

/* ---------- VDI / Domain admin records ------------------------- */

const FIRST_NAMES = ["Ada", "Linus", "Grace", "Donald", "Margaret", "Alan",
  "Barbara", "Edsger", "Niklaus", "Frances", "Tim", "Anita", "Vint",
  "Radia", "Hedy", "Bjarne"]
const LAST_NAMES = ["Lovelace", "Torvalds", "Hopper", "Knuth", "Hamilton",
  "Turing", "Liskov", "Dijkstra", "Wirth", "Allen", "Berners-Lee",
  "Borg", "Cerf", "Perlman", "Lamarr", "Stroustrup"]

export const vdiUsers: VdiUserRecord[] = Array.from({ length: 22 }, (_, i) => {
  const first = FIRST_NAMES[i % FIRST_NAMES.length]
  const last = LAST_NAMES[(i * 3) % LAST_NAMES.length]
  const region = pick(regionUsage)
  const domain = pick(domainUsage)
  const num = 12000 + i * 137
  return {
    id: `VDI-${(1000 + i).toString().padStart(4, "0")}`,
    userId: `u${num}`,
    fullName: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase().replace(/[^a-z]/g, "")}@${domain.domain.toLowerCase()}`,
    domain: domain.domain,
    region: region.region,
    hostName: `vdi-${region.region.toLowerCase()}-${(2000 + i)}`,
    status:
      rand() < 0.78 ? "Active" : rand() < 0.5 ? "Suspended" : "Decommissioned",
    createdAt: new Date(2024, Math.floor(rand() * 24), 1 + Math.floor(rand() * 28)).toISOString(),
  }
})

export const domainRecords: DomainRecord[] = domainUsage.map((d, i) => ({
  id: `DOM-${(100 + i).toString()}`,
  domain: d.domain,
  corporateGroup: d.corporateGroup,
  region: pick(regionUsage).region,
  ownerEmail: `${d.corporateGroup.toLowerCase().replace(/\W/g, "")}-admin@umt.local`,
  notes:
    i === 0 ? "Primary aerospace tenant. Audit weekly." :
    i === 2 ? "Restricted — clearance Level 3 only." :
    undefined,
  createdAt: new Date(2023, i, 4 + i * 2).toISOString(),
}))

/* ---------- Headline KPIs -------------------------------------- */

export const kpiCards: KpiPoint[] = [
  {
    label: "Total Sessions / YTD",
    value: monthlyUsage.reduce((s, p) => s + p.sessions, 0),
    delta: 12.4,
    spark: monthlyUsage.map((m) => m.sessions),
    hint: "Production + Test",
  },
  {
    label: "Active CAD Tools",
    value: cadUsage.length,
    delta: 0,
    spark: cadUsage.map((c) => c.sessions),
    hint: "Distinct platforms in use",
  },
  {
    label: "VDI Share",
    value: Math.round((vdiSplit[0].value / (vdiSplit[0].value + vdiSplit[1].value)) * 1000) / 10,
    unit: "%",
    delta: 4.1,
    spark: monthlyUsage.map((m, i) => Math.round(m.sessions * (0.55 + (i / 24)))),
    hint: "Sessions on VDI hardware",
  },
  {
    label: "Avg Session Length",
    value: 41,
    unit: " min",
    delta: -2.3,
    spark: [38, 39, 41, 42, 41, 40, 41, 42, 43, 41, 41, 41],
    hint: "Trimmed mean, 12-month rolling",
  },
]

/* ---------- Live ticker entries -------------------------------- */

export const tickerEntries = rawSessions.slice(0, 24).map((r, i) => ({
  id: r.id,
  application: r.application,
  cad: r.cad,
  user: r.userId,
  region: r.region,
  status: r.status,
  delta: i % 3 === 0 ? "+" : i % 5 === 0 ? "-" : "·",
  duration: Math.round(
    (new Date(r.stopTime).getTime() - new Date(r.startTime).getTime()) / 60_000,
  ),
}))

/* ---------- Filter dropdown sources ---------------------------- */

export const filterSources = {
  application: ["All", ...applicationUsage.map((a) => a.application)],
  cad: ["All", ...cadUsage.map((c) => c.cad)],
  productLine: ["All", "Wing", "Fuselage", "Powertrain", "Cabin", "Avionics", "Chassis"],
  region: ["All", ...regionUsage.map((r) => r.regionLabel)],
  domain: ["All", ...domainUsage.map((d) => d.domain)],
}
