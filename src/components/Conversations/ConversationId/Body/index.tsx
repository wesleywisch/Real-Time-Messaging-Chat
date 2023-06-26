'use client'
import { useEffect, useRef, useState } from "react";

import { MessageBox } from "./MessageBox";

import { useConversation } from "../../../../hooks/useConversation";

import { api } from "../../../../lib/api";

import { FullMessageType } from "../../../../types";

type BodyProps = {
  initialMessages: FullMessageType[];
}

export function Body({ initialMessages }: BodyProps) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    (async function seen() {
      try {
        await api.post(`/conversation/${conversationId}/seen`)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [conversationId])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, key) => (
        <MessageBox
          key={key}
          isLast={key === messages.length - 1}
          data={message}
        />
      ))}

      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}