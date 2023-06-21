import { prisma } from "../lib/prisma";
import { getSession } from "./getSession";

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      }
    })

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (err) {
    return null
  }
}