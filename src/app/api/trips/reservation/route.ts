import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const req = await request.json();
   
    const { tripsId, startDate, endDate, userId, totalPaid, guests } = req;

    const trip = await prismaClient.trip.findUnique({
        where: {
            id: tripsId
        }
    });

    if (!trip) {
        return new NextResponse(
            JSON.stringify({
                error: {
                    code : "TRIP_NOT_FOUND",
                }
            })
        )
    }

    await prismaClient.reservations.create({
        data: {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            userId,
            totalPaid,
            tripsId,
            guests
        }
    })

    return new NextResponse(
        JSON.stringify({
            success: true
        }),{
            status: 201
        }
    )
}