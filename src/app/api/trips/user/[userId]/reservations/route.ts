import { prismaClient } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }){
    if(!userId){
        return {
            status: 400,
            body: {
                message: "Missing userId"
            }
        }
    }

    const reservation = await prismaClient.reservations.findMany({
        where: {
            userId: userId
        },
        include: {
            trip: true
        }
    })

    return new NextResponse(JSON.stringify(reservation), {
        status: 200,
    })
}