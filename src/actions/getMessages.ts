import { prisma } from "../lib/prisma";

export async function getMessages(conversationId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  } catch (err) {
    return [];
  }
}