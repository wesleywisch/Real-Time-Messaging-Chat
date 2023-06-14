'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
  children: ReactNode;
  disabled?: boolean;
  secondary?: boolean;
  danger?: boolean;
}

export function Button({ fullWidth, children, disabled, secondary, danger, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx("flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors",
        disabled && "opacity-50",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger && "bg-rose-600 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
      {...rest}
    >
      {children}
    </button>
  )
}