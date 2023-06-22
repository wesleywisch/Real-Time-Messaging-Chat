import { prisma } from "../lib/prisma";

import { getSession } from "./getSession";

export async function getUsers() {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email
        }
      }
    })

    return users;
  } catch (err) {
    return [];
  }
}