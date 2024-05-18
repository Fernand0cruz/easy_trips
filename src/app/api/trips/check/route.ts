import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isBefore } from "date-fns";

const createErrorResponse = (code: string, status: number) => {
    return new NextResponse(
        JSON.stringify({
            error: {
                code,
            },
        }),
        { status }
    );
};

export async function POST(request: Request) {
    try {
        const req = await request.json();
        const trip = await prismaClient.trip.findUnique({
            where: {
                id: req.tripId
            }
        });

        if (!trip) {
            return createErrorResponse("TRIP_NOT_FOUND", 404);
        }

        if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
            return createErrorResponse("INVALID_START_DATE", 400);
        }

        if (isBefore(new Date(trip.endDate), new Date(req.endDate))) {
            return createErrorResponse("INVALID_END_DATE", 400);
        }

        const reservations = await prismaClient.reservations.findMany({
            where: {
                tripsId: req.tripId,
                startDate: {
                    lte: req.endDate
                },
                endDate: {
                    gte: req.startDate
                }
            }
        })

        if (reservations.length > 0) {
            return createErrorResponse("TRIP_ALREADY_RESERVED", 409);
        }

        return new NextResponse(
            JSON.stringify({
                success: true
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({
                error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: (error as Error).message,
                },
            }),
            { status: 500 }
        );
    }
} 
