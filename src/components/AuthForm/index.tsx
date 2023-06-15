'use client'
import { useCallback, useState } from "react"
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { toast } from "react-hot-toast";

import { api } from "../../lib/api";

import { InputField } from "../InputField";
import { Button } from "../Button";
import { AuthSocialButton } from "../AuthSocialButton";

const contactFormSchema = z.object({
  name: z.string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 caracteres.' })
    .max(100, { message: 'O nome pode ter no máximo 100 caracteres.' }),
  email: z.string().email({ message: 'O e-mail precisa ser válido.' }),
  password: z.string()
    .min(6, { message: 'A senha precisa ter pelo menos 6 caracteres.' })
    .max(500),
  confirmPassword: z.string()
    .min(6, { message: 'As senhas não correspondem.' })
    .max(500),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não correspondem.",
    });
  }
});

type Variant = 'Login' | 'Register'
type ContactFormData = z.infer<typeof contactFormSchema>

export function AuthForm() {
  const { handleSubmit, register, reset, formState: { isSubmitting, errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const [variant, setVariant] = useState<Variant>('Login');

  async function onSubmit(data: ContactFormData) {
    try {
      if (variant === 'Register') {
        if (data.password !== data.confirmPassword) {
          return;
        }

        await api.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        }).catch(() => toast.error('Algo deu errado! Tente novamente.'))

        toast.success('Conta criada com sucesso!');
        reset();
      }

      if (variant === 'Login') {

      }
    } catch (err) {
      console.log(err)
    }
  }

  function handleSocialsLogin(social: string) {

  }

  const toggleVariant = useCallback(() => {
    if (variant === 'Login') {
      setVariant('Register')
    } else {
      setVariant('Login')
    }
  }, [variant])

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {variant === 'Register' && (
            <>
              <InputField
                id="name"
                label="Nome"
                register={register}
                errors={errors}
                disabled={isSubmitting}
              />
            </>
          )}

          <InputField
            id="email"
            type="email"
            label="E-mail"
            register={register}
            errors={errors}
            disabled={isSubmitting}
          />

          <InputField
            id="password"
            label="Senha"
            type="password"
            register={register}
            errors={errors}
            disabled={isSubmitting}
          />

          {variant === 'Register' && (
            <>
              <InputField
                id="confirmPassword"
                type="password"
                label="Confirmar senha"
                register={register}
                errors={errors}
                disabled={isSubmitting}
              />
            </>
          )}

          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
            >
              {variant === 'Login' ? 'Entrar' : 'Registrar'}
            </Button>
          </div>
        </form>

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
            />
            <AuthSocialButton
              Icon={BsGoogle}
              onClick={() => handleSocialsLogin('google')}
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