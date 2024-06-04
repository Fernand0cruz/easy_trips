"use client"

import { Prisma, Reservations } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserReservationCard from "./components/userReservationCard";

const MyTrips = () => {
    const [reservations, setReservations] = useState<Prisma.ReservationsGetPayload<{
        include: { trip: true }
    }>[]
    >([])

    const { status, data } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated" || !data?.user) {
            return router.push("/")
        }
        const fetchReservations = async () => {
            const res = await fetch(`/api/user/${(data?.user as any)?.id}/reservations`)
            const json = await res.json()
            setReservations(json)
        }
        fetchReservations()

    }, [status])
    console.log(reservations)
    return (
        <div className="flex flex-col m-auto max-w-7xl">
            <h1 className="my-5">Minhas Viagens</h1>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <UserReservationCard key={reservation.id} reservation={reservation} />
                    ))
                ) : (
                    <h2>Você ainda não fez nenhuma reserva!</h2>
                )}
            </div>
        </div>
    );
}

export default MyTrips;