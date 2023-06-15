import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { z } from 'zod';

import { prisma } from '../../../lib/prisma'

const bodySchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(500),
})

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = bodySchema.parse(body)

    if (!name || !email || !password) {
      return new NextResponse("Missing info", { status: 400 })
    };

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    })

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.error();
  }
}