"use client"

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserReservationCard from "./components/userReservationCard";
import SectionHeading from "@/app/components/section-heading";

const MyTrips = () => {
    const [reservations, setReservations] = useState<Prisma.ReservationsGetPayload<{
        include: { trip: true }
    }>[]
    >([])

    const { status, data } = useSession()
    const router = useRouter()

    const fetchReservations = async () => {
        const res = await fetch(`/api/user/${(data?.user as any)?.id}/reservations`)
        const json = await res.json()
        setReservations(json)
    }
    useEffect(() => {
        if (status === "unauthenticated") {
            return router.push("/")
        }
        fetchReservations()
    }, [status])
    return (
        <div className="flex flex-col m-auto max-w-screen-xl gap-6 mt-10">
            <SectionHeading eyebrow="Sua conta" title="Minhas Viagens" />
            {reservations.length > 0 ? (
                <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
                    {reservations.map((reservation) => (
                        <UserReservationCard key={reservation.id} reservation={reservation} fetchReservations={fetchReservations} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-10">Você ainda não fez nenhuma reserva!</p>
            )}
        </div>
    );
}

export default MyTrips;