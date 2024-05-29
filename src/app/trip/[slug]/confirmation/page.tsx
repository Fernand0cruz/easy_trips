"use client";

import { Card } from "@/components/ui/card";
import { Trip } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TripImagens from "../components/trip-images";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Confirmation = ({ params }: { params: { slug: string } }) => {
    const [trip, setTrip] = useState<Trip | null>(null);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();

    const router = useRouter();

    const { status, data } = useSession()

    useEffect(() => {
        const fetchTrip = async () => {
            const response = await fetch("/api/trips/check", {
                method: "POST",
                body: JSON.stringify({
                    tripId: params.slug,
                    startDate: searchParams.get("startDate"),
                    endDate: searchParams.get("endDate"),
                })
            });

            const res = await response.json();

            if(res.error) {
                return router.push("/");
            }

            setTrip(res.trip);
            setTotalPrice(res.totalPrice);

            setLoading(false);
        };

        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }

        if (status === "authenticated") {
            const startDate = searchParams.get("startDate");
            const endDate = searchParams.get("endDate");
            const guest = searchParams.get("guest") || 1; // Assuming guest param is in searchParams or default to 1
            router.push(`/trip/${params.slug}/confirmation?startDate=${startDate}&endDate=${endDate}&guest=${guest}`);
        }

        fetchTrip();
    }, [params.slug, searchParams, status]);


    if (loading) return <p className="text-center m-5">Loading...</p>;
    if (!trip) return <p>No trip found</p>;

    const handleBuyClick = async () => {
        await fetch("/api/trips/reservation", {
            method: "POST",
            body: JSON.stringify({
                tripsId: params.slug,
                startDate: searchParams.get("startDate"),
                endDate: searchParams.get("endDate"),
                guests: Number(searchParams.get("guest")),
                userId: (data?.user as any)?.id,
                totalPaid: totalPrice,
            })
        })
        toast.success("Reserva realizada com sucesso!", {
            position: "bottom-center"
        })
    }


    const startDate = new Date(searchParams.get("startDate") as string);
    const endDate = new Date(searchParams.get("endDate") as string)
    const guests = searchParams.get("guest")

    return (
        <Card className="mt-10 flex flex-col m-auto my-5 max-w-7xl p-2">
            <h1 className="font-semibold text-xl">Sua viagem para: {trip.location}</h1>
            <div className="flex flex-col gap-3 my-5">
                <TripImagens imageUrls={trip.imagesUrl} coverImage={trip.coverImage} />
                <div>
                    <h1 className="font-semibold text-xl">Informações sobre a viagem:</h1>
                    <p>Local: {trip.location}</p>
                    <h3>Preço total: R$<span>{totalPrice?.toFixed(2)}</span></h3>
                    <div className="flex gap-2">
                        <p> De: {startDate.toLocaleDateString()}</p>
                        -
                        <p>Até: {endDate.toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                        <span>Hóspedes:</span>
                        <p>{guests}</p>
                    </div>
                    <Button onClick={handleBuyClick} className="flex w-full mt-5">Finalizar Compra</Button>
                </div>
            </div>
        </Card>
    );
};

export default Confirmation;
