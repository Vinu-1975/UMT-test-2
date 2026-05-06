import { Outlet } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AppSidebar } from "./Sidebar"
import { Topbar } from "./Topbar"
import { LiveTicker } from "./LiveTicker"

export function AppShell() {
  return (
    <TooltipProvider delayDuration={120}>
      <div className="min-h-svh flex bg-background text-foreground">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <LiveTicker />
          <Topbar />
          <main className="flex-1 px-6 py-6 lg:px-10 lg:py-8 max-w-[1600px] w-full mx-auto">
            <Outlet />
          </main>
          <footer className="px-6 lg:px-10 py-5 border-t border-border bg-card/30">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="micro">UMT · Usage Monitoring Tool · v2.0 — Blueprint Atelier</span>
              <span className="num">© 2026 · Read-only analytics console</span>
            </div>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  )
}
