import { prisma } from "../lib/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getConversationById(conversationId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      }
    })

    return conversation;
  } catch (err) {
    return null;
  }
}