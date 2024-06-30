"use client"

import { Prisma } from "@prisma/client";
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
        <div className="flex flex-col m-auto max-w-screen-xl gap-5 mt-5">
            <h1 className="uppercase font-bold text-center">Minhas Viagens</h1>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <UserReservationCard key={reservation.id} reservation={reservation} fetchReservations={fetchReservations} />
                    ))
                ) : (
                    <h2>Você ainda não fez nenhuma reserva!</h2>
                )}
            </div>
        </div>
    );
}

export default MyTrips;