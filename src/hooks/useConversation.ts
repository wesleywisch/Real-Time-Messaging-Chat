import { useMemo } from "react";
import { useParams } from "next/navigation";

export function useConversation() {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }

    return params.conversationId as string
  }, [params?.conversationId])

  const isOpen = useMemo(() => {
    !!conversationId // return true or false
  }, [conversationId])

  return useMemo(() => ({
    isOpen,
    conversationId,
  }), [isOpen, conversationId])
}