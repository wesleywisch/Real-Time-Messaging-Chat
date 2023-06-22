import { User } from "@prisma/client"
import Image from "next/image";
import { IoPersonCircle } from 'react-icons/io5'

type AvatarProps = {
  user?: User | null;
}

export function Avatar({ user }: AvatarProps) {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name}
            fill
          />
        ) : (
          <IoPersonCircle className="w-full h-full" />
        )}
      </div>

      <div
        className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"
      />
    </div>
  )
}