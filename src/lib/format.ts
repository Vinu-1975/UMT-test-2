/**
 * Formatting helpers — kept tiny and tree-shakeable.
 * Numbers in this product are mostly engineering counts, so we lean on
 * Intl with grouping and a compact variant for hero KPIs.
 */

const COMPACT = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
})

const FULL = new Intl.NumberFormat("en-US")

export function compact(n: number): string {
  return COMPACT.format(n)
}

export function full(n: number): string {
  return FULL.format(n)
}

export function pct(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`
}

export function signed(n: number, digits = 1): string {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "·"
  return `${sign}${Math.abs(n).toFixed(digits)}%`
}

export function hourMin(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}
