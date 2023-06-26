import { getConversationById } from "../../../actions/getConversationById";
import { getMessages } from "../../../actions/getMessages";

import { EmptyState } from "../../../components/Users/EmptyState";
import { Header } from "../../../components/Conversations/ConversationId/Header";
import { Body } from "../../../components/Conversations/ConversationId/Body";
import { Form } from "../../../components/Conversations/ConversationId/Form";

type IParams = {
  conversationId: string;
}

export default async function ConversationId({ params }: { params: IParams }) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId)

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body />
        <Form />
      </div>
    </div>
  )
}