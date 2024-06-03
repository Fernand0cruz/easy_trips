"use client"

import { Reservations } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyTrips = () => {
    const [reservations, setReservations] = useState<Reservations[]>([])

    const { status, data } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated" || !data?.user) {
            return router.push("/")
        }
        const fetchReservations = async () => {
            const res = await fetch(`/api/trips/user/${(data?.user as any)?.id}/reservations`)
            const json = await res.json()
            setReservations(json)
        }
        fetchReservations()

    }, [status])
    return (
        <div className="flex flex-col m-auto max-w-7xl">
            <h1>My Trips</h1>
        </div>
    );
}

export default MyTrips;