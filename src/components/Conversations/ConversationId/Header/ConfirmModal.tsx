'use client'
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from 'react-icons/fi'

import { Modal } from "../../../Modal";
import { Button } from "../../../Button";

import { api } from "../../../../lib/api";

import { useConversation } from "../../../../hooks/useConversation";

type ConfirmModalProps = {
  isOpen?: boolean;
  onClose: () => void;
}

export function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const router = useRouter();
  const { conversationId } = useConversation();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.delete(`/conversations/${conversationId}`);

      if (response.status === 200) {
        onClose();
        router.push('/conversations');
        router.refresh();
      }
    } catch (err) {
      console.log(err)
      toast.error('Algo deu errado!');
    } finally {
      setIsLoading(false)
    }
  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
          />
        </div>

        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Deletar conversa
          </Dialog.Title>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Você tem certeza que deseja deletar essa conversa? Essa ação não poderá ser desfeita.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button
          disabled={isLoading}
          danger
          onClick={onDelete}
        >
          Delete
        </Button>

        <Button
          disabled={isLoading}
          secondary
          onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}