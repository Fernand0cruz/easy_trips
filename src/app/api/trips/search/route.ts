import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

const generatedQuery = (text: string, date: string | null) => {
    let searchQuery: any = {
        OR: [
            {
                location: {
                    contains: text,
                    mode: 'insensitive'
                }
            },
            {
                description: {
                    contains: text,
                    mode: 'insensitive'
                }
            },
            {
                highlights: {
                    has: text,
                }
            }
        ],
        AND: [],
    };

    if (date) {
        const formattedDate = new Date(date);
        formattedDate.setUTCHours(0, 0, 0, 0);

        searchQuery.AND = [
            {
                startDate: {
                    lte: formattedDate.toISOString() 
                }
            },
            {
                endDate: {
                    gt: formattedDate.toISOString()
                }
            }
        ];
    }

    return searchQuery;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const text = searchParams.get("location");
    if (!text) {
        return new NextResponse(JSON.stringify({
            message: "Missing text parameter"
        }), { status: 400 });
    }

    const date = searchParams.get("date");

    const trips = await prismaClient.trip.findMany({
        where: generatedQuery(text, date)
    });

    return new NextResponse(JSON.stringify(trips), { status: 200 });
}
