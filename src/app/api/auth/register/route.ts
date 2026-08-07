import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: { code: "INVALID_DATA" } }, { status: 400 });
        }

        const { name, email, password } = parsed.data;

        const existingUser = await prismaClient.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: { code: "EMAIL_IN_USE" } }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prismaClient.user.create({
            data: { name, email, password: hashedPassword },
        });

        return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: { code: "INTERNAL_SERVER_ERROR" } }, { status: 500 });
    }
}
