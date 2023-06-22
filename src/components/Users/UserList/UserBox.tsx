'use client'
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { User } from "@prisma/client"

import { Avatar } from "../../Avatar"

import { api } from "../../../lib/api"

type UserBoxProps = {
  data: User
}

export function UserBox({ data }: UserBoxProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.post('/conversations', {
        userId: data.id,
      })

      if (response.status === 200) {
        router.push(`/conversations/${response.data.id}`)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }

  }, [data, router])

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <Avatar user={data} />

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}