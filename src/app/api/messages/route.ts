import { NextResponse } from "next/server"
import { z } from "zod";

import { prisma } from "../../../lib/prisma";
import { getCurrentUser } from "../../../actions/getCurrentUser";

const bodySchema = z.object({
  message: z.string().min(1),
  conversationId: z.string().uuid(),
  image: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();

    const { message, conversationId, image } = bodySchema.parse(body);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          }
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          }
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          }
        }
      }
    });

    return NextResponse.json(newMessage)
  } catch (err) {
    console.log(err)
    return NextResponse.error();
  }
}