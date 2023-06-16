'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "../Button";
import { InputField } from "../InputField";

import { api } from "../../lib/api";

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

type ContactFormData = z.infer<typeof contactFormSchema>

export function SignIn() {
  const { handleSubmit, register, reset, formState: { isSubmitting, errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    try {
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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <InputField
        id="name"
        label="Nome"
        register={register}
        errors={errors}
        disabled={isSubmitting}
      />

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

      <InputField
        id="confirmPassword"
        type="password"
        label="Confirmar senha"
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
          Registrar
        </Button>
      </div>
    </form>
  )
}