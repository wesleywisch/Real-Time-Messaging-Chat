import { ReactNode } from "react"

import { getCurrentUser } from "../../actions/getCurrentUser";

import { DesktopSidebar } from "./(Desktop)/DesktopSidebar";
import { MobileFooter } from "./(Mobile)/MobileFooter";

type SidebarProps = {
  children: ReactNode;
}

export async function Sidebar({ children }: SidebarProps) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />

      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}