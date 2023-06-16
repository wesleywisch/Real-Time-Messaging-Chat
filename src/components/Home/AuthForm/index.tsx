'use client'
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { useRouter } from "next/navigation";

import { AuthSocialButton } from "../AuthSocialButton";
import { SignIn } from "./SignIn";
import { Login } from "./Login";

type Variant = 'Login' | 'Register'

export function AuthForm() {
  const session = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState<Variant>('Login');

  async function handleSocialsLogin(social: 'github' | 'google') {
    try {
      setLoading(true);

      await signIn(social, {
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast.error('Não foi possível realizar o login')
        }

        if (callback?.ok && !callback.error) {
          toast.success('Login confirmado!')
          router.push('/users')
        }
      })
    } catch (err) {
      console.log(err)
      toast.error('Algo deu errado. Tente novamente!')
    } finally {
      setLoading(false)
    }
  }

  const toggleVariant = useCallback(() => {
    if (variant === 'Login') {
      setVariant('Register')
    } else {
      setVariant('Login')
    }
  }, [variant])

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/users')
    }
  }, [session?.status, router])

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        {variant === 'Register' && (
          <SignIn />
        )}

        {variant === 'Login' && (
          <Login />
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Ou
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              Icon={BsGithub}
              onClick={() => handleSocialsLogin('github')}
              disabled={loading}
            />
            <AuthSocialButton
              Icon={BsGoogle}
              onClick={() => handleSocialsLogin('google')}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <p>
            {variant === 'Login' ? 'Novo no chat?' : 'Já possui uma conta?'}
          </p>

          <p className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === 'Login' ? 'Criar uma conta' : 'Login'}
          </p>
        </div>
      </div>
    </div>
  )
}