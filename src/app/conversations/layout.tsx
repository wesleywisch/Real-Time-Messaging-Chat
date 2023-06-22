import { Sidebar } from "../../components/Sidebar"
import { ConversationList } from "../../components/Conversations/ConversationList"

import { getConversations } from "../../actions/getConversations"

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations}
        />

        {children}
      </div>
    </Sidebar>
  )
}
