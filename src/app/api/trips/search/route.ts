import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

const generatedQuery = (text?: string) => {
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
        ]
    };
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

    const trips = await prismaClient.trip.findMany({
        where: generatedQuery(text)
    });

    return new NextResponse(JSON.stringify(trips), { status: 200 });
}
