import { prismaClient } from "@/lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
})

export async function POST(request: Request) {
    const sig = request.headers.get("stripe-signature")!
    const text = await request.text()

    const event = stripe.webhooks.constructEvent(text, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY!)

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        await prismaClient.reservations.create({
            data: {
                tripsId: session.metadata!.tripsId,
                userId: session.metadata!.userId,
                startDate: new Date(session.metadata!.startDate),
                endDate: new Date(session.metadata!.endDate),
                totalPaid: Number(session.metadata!.totalPrice),
                guests: Number(session.metadata!.maxGuests),
            }
        })
    }
    return new NextResponse(JSON.stringify({ received: true }), {status: 200})
}