import Image from "next/image";

import { AuthForm } from "../components/Home/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/imgs/logo.png"
          alt="Logo"
          width={48}
          height={48}
          className="mx-auto w-auto"
        />

        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Faça login com sua conta
        </h2>
      </div>

      <AuthForm />
    </div>
  )
}
