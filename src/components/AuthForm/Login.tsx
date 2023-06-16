'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "../Button";
import { InputField } from "../InputField";

const contactFormSchema = z.object({
  email: z.string().email({ message: 'O e-mail precisa ser válido.' }),
  password: z.string()
    .min(6, { message: 'A senha precisa ter pelo menos 6 caracteres.' })
    .max(500),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function Login() {
  const { handleSubmit, register, reset, formState: { isSubmitting, errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast.error('E-mail e/ou senha estão incorretos!')
        }

        if (callback?.ok && !callback.error) {
          toast.success('Login confirmado!')
          reset()
        }
      })
    } catch (err) {
      console.log(err)
      toast.error('Algo deu errado. Tente novamente!')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
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

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
        >
          Login
        </Button>
      </div>
    </form>
  )
}