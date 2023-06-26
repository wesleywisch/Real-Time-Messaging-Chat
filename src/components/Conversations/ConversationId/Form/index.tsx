'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";

import { MessageInput } from "./MessageInput";

import { useConversation } from "../../../../hooks/useConversation"

import { api } from "../../../../lib/api";

const formSchema = z.object({
  message: z.string().min(1)
})

type formData = z.infer<typeof formSchema>

export function Form() {
  const { conversationId } = useConversation();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: formData) {
    try {
      setValue('message', '', { shouldValidate: true });

      await api.post('/messages', {
        ...data,
        conversationId,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <HiPhoto size={30} className="text-sky-500" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Escreva uma mensagem"
        />

        <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition-colors">
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button>
      </form>
    </div>
  )
}