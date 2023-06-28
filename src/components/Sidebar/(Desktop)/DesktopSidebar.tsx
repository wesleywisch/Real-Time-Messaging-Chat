'use client'
import { useState } from "react";
import { User } from "@prisma/client";

import { useRoutes } from "../../../hooks/useRoutes"

import { DesktopItem } from "./DesktopItem";
import { Avatar } from "../../Avatar";
import { SettingsModal } from "./SettingsModal";

type DesktopSidebarProps = {
  currentUser: User | null;
}

export function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col lg:justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item, key) => (
              <DesktopItem
                key={key}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>

        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  )
}