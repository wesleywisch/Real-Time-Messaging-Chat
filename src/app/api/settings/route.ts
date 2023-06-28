import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "../../../lib/prisma";

import { getCurrentUser } from "../../../actions/getCurrentUser";

const bodySchema = z.object({
  name: z.string(),
  image: z.string(),
})

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { image, name } = bodySchema.parse(body);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}