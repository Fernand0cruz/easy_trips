import { prismaClient } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }) {
    if (!userId) {
        return new NextResponse(JSON.stringify({ message: "Missing userId" }), { status: 400 });
    }

    try {
        const reservations = await prismaClient.reservations.findMany({
            where: {
                userId: userId
            },
            include: {
                trip: true
            }
        });

        return new NextResponse(JSON.stringify(reservations), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
