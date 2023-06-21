'use client'
import Link from "next/link";
import clsx from "clsx"

type MobileItemProps = {
  href: string;
  label: string;
  icon: any;
  active?: boolean
  onClick?: () => void;
}

export function MobileItem({ active, href, icon: Icon, label, onClick }: MobileItemProps) {
  function handleOnClick() {
    if (onClick) {
      return onClick()
    }
  }

  return (
    <Link
      href={href}
      title={label}
      onClick={handleOnClick}
      className={clsx("group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors",
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  )
}