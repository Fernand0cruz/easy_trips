"use client"

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SectionHeading from "@/app/components/section-heading";
import Trips from "@/app/components/trips";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<Prisma.FavoriteGetPayload<{
        include: { trip: true }
    }>[]
    >([])

    const { status, data } = useSession()
    const router = useRouter()

    const fetchFavorites = async () => {
        const res = await fetch(`/api/user/${(data?.user as any)?.id}/favorites`)
        const json = await res.json()
        setFavorites(json)
    }

    useEffect(() => {
        if (status === "unauthenticated") {
            return router.push("/login")
        }
        if (status === "authenticated") {
            fetchFavorites()
        }
    }, [status])

    return (
        <div className="flex flex-col m-auto max-w-screen-xl gap-6 mt-10">
            <SectionHeading eyebrow="Sua conta" title="Favoritos" />
            {favorites.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <Trips
                        data={favorites.map((favorite) => favorite.trip)}
                        favoritedTripIds={new Set(favorites.map((favorite) => favorite.tripId))}
                    />
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-10">Você ainda não favoritou nenhuma viagem!</p>
            )}
        </div>
    );
}

export default FavoritesPage;
