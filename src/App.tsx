import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { DashboardPage } from "@/pages/Dashboard"
import { ChartsPage } from "@/pages/Charts"
import { SessionsPage } from "@/pages/Sessions"
import { VdiUsersPage } from "@/pages/VdiUsers"
import { DomainsPage } from "@/pages/Domains"
import { NotFoundPage } from "@/pages/NotFound"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/vdi" element={<VdiUsersPage />} />
          <Route path="/domains" element={<DomainsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
