import { ReactNode } from "react"

import { DesktopSidebar } from "./(Desktop)/DesktopSidebar";

type SidebarProps = {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="h-full">
      <DesktopSidebar />

      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}