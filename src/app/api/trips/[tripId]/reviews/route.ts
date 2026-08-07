import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const reviewSchema = z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(1),
});

export async function GET(request: Request, { params: { tripId } }: { params: { tripId: string } }) {
    const reviews = await prismaClient.review.findMany({
        where: { tripId },
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews, { status: 200 });
}

export async function POST(request: Request, { params: { tripId } }: { params: { tripId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: { code: "INVALID_DATA" } }, { status: 400 });
    }

    const review = await prismaClient.review.create({
        data: {
            tripId,
            userId: (session.user as any).id,
            rating: parsed.data.rating,
            comment: parsed.data.comment,
        },
        include: { user: { select: { name: true, image: true } } },
    });

    return NextResponse.json(review, { status: 201 });
}
