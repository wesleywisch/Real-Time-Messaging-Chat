'use client'

import { InputHTMLAttributes } from "react"
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import clsx from "clsx"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

export function InputField({ label, id, register, errors, disabled, ...rest }: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          id={id}
          autoComplete={id}
          {...register(id, { required: true })}
          {...rest}
          className={clsx("form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6",
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default",
          )}
        />
      </div>
    </div>
  )
}