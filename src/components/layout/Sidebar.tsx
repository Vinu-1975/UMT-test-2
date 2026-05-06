import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  AreaChart,
  Server,
  Globe2,
  Database,
  Settings2,
  CircleHelp,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Logo } from "./Logo"

const NAV: { to: string; label: string; tag: string; icon: React.ElementType }[] = [
  { to: "/",          label: "Overview",  tag: "01", icon: LayoutDashboard },
  { to: "/charts",    label: "Charts",    tag: "02", icon: AreaChart },
  { to: "/sessions",  label: "Sessions",  tag: "03", icon: Database },
  { to: "/vdi",       label: "VDI Users", tag: "04", icon: Server },
  { to: "/domains",   label: "Domains",   tag: "05", icon: Globe2 },
]

export function AppSidebar() {
  const loc = useLocation()
  return (
    <aside className="h-svh w-[14.5rem] shrink-0 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="px-5 pt-6 pb-4">
        <Logo />
      </div>

      <div className="px-5 pb-3">
        <div className="micro text-muted-foreground/80">
          ◉ &nbsp;Navigation
        </div>
      </div>

      <nav className="px-3 flex-1 space-y-0.5">
        {NAV.map((item) => {
          const active = loc.pathname === item.to ||
            (item.to !== "/" && loc.pathname.startsWith(item.to))
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              {/* Vermillion gutter mark on the active item */}
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-r",
                  active ? "bg-[--vermillion]" : "bg-transparent",
                )}
                aria-hidden
              />
              <span className="num text-[10px] tracking-wider text-muted-foreground/70 group-hover:text-foreground/70 w-5">
                {item.tag}
              </span>
              <item.icon
                size={16}
                strokeWidth={1.5}
                className={cn(
                  "shrink-0",
                  active ? "text-[--vermillion]" : "text-muted-foreground",
                )}
              />
              <span className="flex-1">{item.label}</span>
              {active && (
                <span className="micro text-[--vermillion]/80">●</span>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="px-5 py-4 border-t border-border">
        <div className="micro text-muted-foreground/80 mb-3">
          ◉ &nbsp;System
        </div>
        <div className="space-y-1.5">
          <SidebarLink to="/settings" icon={Settings2} label="Settings" />
          <SidebarLink to="/help" icon={CircleHelp} label="Help &amp; Docs" />
        </div>

        <div className="hairline mt-5 pt-4 micro text-muted-foreground/70 leading-relaxed">
          Build 26.04.15<br />
          <span className="text-[--vermillion]/80">●</span> connected to <span className="text-foreground">UMT-PROD</span>
        </div>
      </div>
    </aside>
  )
}

function SidebarLink({
  to,
  icon: Icon,
  label,
}: {
  to: string
  icon: React.ElementType
  label: string
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-sidebar-accent",
          isActive && "text-foreground bg-sidebar-accent",
        )
      }
    >
      <Icon size={14} strokeWidth={1.5} />
      <span dangerouslySetInnerHTML={{ __html: label }} />
    </NavLink>
  )
}
