import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params: {reservationId} }: { params: { reservationId: string } }){
    if (!reservationId) {
        return new NextResponse(JSON.stringify({ message: "Missing userId" }), { status: 400 });
    }
    const reservation = await prismaClient.reservations.delete({
        where: {
            id: reservationId
        }
    });

    return new NextResponse(JSON.stringify(reservation), { status: 200 });
}