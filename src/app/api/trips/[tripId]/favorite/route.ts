import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params: { tripId } }: { params: { tripId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    await prismaClient.favorite.upsert({
        where: { userId_tripId: { userId, tripId } },
        update: {},
        create: { userId, tripId },
    });

    return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(request: Request, { params: { tripId } }: { params: { tripId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    await prismaClient.favorite.deleteMany({
        where: { userId, tripId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
}
