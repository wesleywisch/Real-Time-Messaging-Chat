'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { IoPersonCircle } from "react-icons/io5";
import { CldUploadButton } from "next-cloudinary";

import { Modal } from "../../Modal";
import { InputField } from "../../InputField";
import { Button } from "../../Button";

import { api } from "../../../lib/api";

type SettingsModalProps = {
  currentUser: User | null;
  isOpen?: boolean;
  onClose: () => void;
}

export function SettingsModal({ currentUser, isOpen, onClose }: SettingsModalProps) {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().default(currentUser ? currentUser.name : ''),
    image: z.string().default(currentUser?.image ? currentUser.image : '')
  })

  type formData = z.infer<typeof formSchema>

  const { handleSubmit, register, watch, setValue, formState: { isSubmitting, errors } } = useForm<formData>({
    resolver: zodResolver(formSchema),
  });

  const image = watch('image')

  function handleUpload(result: any) {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
  }

  async function onSubmit(data: formData) {
    try {
      const response = await api.post('/settings', data)

      if (response.status === 200) {
        router.refresh();
        onClose();
      }
    } catch (err) {
      console.log(err)
      toast.error('Algo deu errado!')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Perfil
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Editar suas informações públicas.
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <InputField
                disabled={isSubmitting}
                label="Nome"
                id="name"
                errors={errors}
                required
                defaultValue={currentUser?.name && currentUser.name}
                register={register}
              />

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Foto
                </label>

                <div className="mt-2 flex items-center gap-x-3">
                  {image || currentUser?.image ? (
                    <Image
                      width={48}
                      height={48}
                      className="rounded-full"
                      src={image || currentUser?.image}
                      alt="Avatar"
                    />
                  ) : (
                    <IoPersonCircle className="w-12 h-12" />
                  )}

                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="g1usl1sb"
                  >
                    <Button
                      type="button"
                      secondary
                      disabled={isSubmitting}
                    >
                      Alterar
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              disabled={isSubmitting}
              secondary
              type="button"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              disabled={isSubmitting}
              type="submit"
            >
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}