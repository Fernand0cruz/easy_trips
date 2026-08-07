import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: { code: "INVALID_DATA" } }, { status: 400 });
    }

    try {
        await prismaClient.newsletterSubscriber.create({
            data: { email: parsed.data.email },
        });
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error: any) {
        if (error.code === "P2002") {
            return NextResponse.json({ error: { code: "ALREADY_SUBSCRIBED" } }, { status: 409 });
        }
        return NextResponse.json({ error: { code: "INTERNAL_SERVER_ERROR" } }, { status: 500 });
    }
}
