import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
})

export async function POST(request: Request) {
    try {
        const req = await request.json()
        const userSession = await getServerSession(authOptions)
        
        if (!userSession) {
            return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
        }

        const { tripsId, totalPrice, location, description, coverImage, startDate, endDate, maxGuests } = req

        const session = await stripe.checkout.sessions.create({
            success_url: 'https://easytrips.vercel.app/myTrips',
            metadata: {
                tripsId,
                startDate,
                endDate,
                maxGuests,
                userId: (userSession.user as any).id,
                totalPrice
            },
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        unit_amount: totalPrice * 100,
                        product_data: {
                            name: location,
                            description,
                            images: [coverImage],
                        }
                    },
                    quantity: 1,
                }
            ],
            mode: "payment"
        })

        return new NextResponse(JSON.stringify({ sessionId: session.id }), { status: 200 })
    } catch (error) {
        console.error(error)
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
    }
}
