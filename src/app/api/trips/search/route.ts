import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface SearchFilters {
    minPrice?: number;
    maxPrice?: number;
    guests?: number;
}

const generatedQuery = (text: string, date: string | null, filters: SearchFilters) => {
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

        searchQuery.AND.push(
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
        );
    }

    if (filters.minPrice !== undefined) {
        searchQuery.AND.push({ pricePerDay: { gte: filters.minPrice } });
    }

    if (filters.maxPrice !== undefined) {
        searchQuery.AND.push({ pricePerDay: { lte: filters.maxPrice } });
    }

    if (filters.guests !== undefined) {
        searchQuery.AND.push({ maxGuests: { gte: filters.guests } });
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

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const guestsParam = searchParams.get("guests");

    const filters: SearchFilters = {
        minPrice: minPriceParam ? Number(minPriceParam) : undefined,
        maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
        guests: guestsParam ? Number(guestsParam) : undefined,
    };

    const trips = await prismaClient.trip.findMany({
        where: generatedQuery(text, date, filters),
        include: { reviews: { select: { rating: true } } },
    });

    return new NextResponse(JSON.stringify(trips), { status: 200 });
}
