/**
 * Domain types for the UMT (Usage Monitoring Tool) revamp.
 * These mirror the data shapes that the legacy ASP.NET MVC controllers
 * surface to the chart endpoints — kept intentionally narrow so that
 * the React layer can later be wired to real /api/* endpoints with
 * minimal change.
 */

export type CadTool = "CATIA" | "NX" | "Creo" | "SolidWorks" | "Inventor"

export type Region =
  | "NA"
  | "EU"
  | "APAC"
  | "LATAM"
  | "MEA"

export type SessionStatus = "Success" | "Failed" | "Aborted" | "Validation"

export interface Application {
  id: string
  name: string
  cad: CadTool
  productLine: string
}

export interface MonthlyUsagePoint {
  month: string          // 'Jan', 'Feb', ...
  monthIndex: number     // 0..11
  sessions: number
  productionSessions: number
  testSessions: number
}

export interface ApplicationUsage {
  application: string
  cad: CadTool
  sessions: number
  validation: number
  execution: number
  blockCreation: number
  viewOps: number
}

export interface CadUsage {
  cad: CadTool
  sessions: number
  share: number          // 0..1
}

export interface RegionUsage {
  region: Region
  regionLabel: string
  sessions: number
}

export interface DomainUsage {
  domain: string
  corporateGroup: string
  sessions: number
}

export interface RawSessionRow {
  id: string
  application: string
  cad: CadTool
  userId: string
  machineId: string
  domain: string
  region: Region
  productLine: string
  startTime: string      // ISO
  stopTime: string       // ISO
  status: SessionStatus
  vdi: boolean
  productionDrive: boolean
}

export interface VdiUserRecord {
  id: string
  userId: string
  fullName: string
  email: string
  domain: string
  region: Region
  hostName: string
  status: "Active" | "Suspended" | "Decommissioned"
  createdAt: string
}

export interface DomainRecord {
  id: string
  domain: string
  corporateGroup: string
  region: Region
  ownerEmail: string
  notes?: string
  createdAt: string
}

export interface KpiPoint {
  label: string
  value: number
  unit?: string
  delta: number          // % change vs prev period
  spark: number[]
  hint?: string
}

export interface FilterState {
  application: string
  cad: string
  productLine: string
  region: string
  domain: string
  hardware: "ALL" | "VDI" | "NON_VDI"
  range: "30D" | "90D" | "YTD" | "12M"
}
