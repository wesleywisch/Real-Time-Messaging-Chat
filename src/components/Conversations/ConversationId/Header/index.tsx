'use client'
import { useMemo, useState } from "react"
import Link from "next/link"
import { Conversation, User } from "@prisma/client"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"

import { ProfileDrawer } from "./ProfileDrawer"
import { Avatar } from "../../../Avatar"

import { useOtherUser } from "../../../../hooks/useOtherUser"

type HeaderProps = {
  conversation: Conversation & {
    users: User[]
  }
}

export function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} membros`
    }

    return `Ativo`
  }, [conversation])

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition-colors cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>

          <Avatar user={otherUser} />

          <div className="flex flex-col">
            <div>
              {conversation.name || otherUser.name}
            </div>

            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 hover:text-sky-600 transition-colors cursor-pointer"
        />
      </div>
    </>
  )
}