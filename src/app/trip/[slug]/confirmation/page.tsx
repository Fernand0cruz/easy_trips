"use client";

import { Card } from "@/components/ui/card";
import { Trip } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TripImagens from "../components/trip-images";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

const Confirmation = ({ params }: { params: { slug: string } }) => {
    const [trip, setTrip] = useState<Trip | null>(null);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const router = useRouter();
    const { status } = useSession();
    const { toast } = useToast();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await fetch("/api/trips/check", {
                    method: "POST",
                    body: JSON.stringify({
                        tripId: params.slug,
                        startDate: searchParams.get("startDate"),
                        endDate: searchParams.get("endDate"),
                    }),
                });

                const res = await response.json();

                if (res.error) {
                    return router.push("/");
                }

                setTrip(res.trip);
                setTotalPrice(res.totalPrice);
            } catch (error) {
                console.error("Failed to fetch trip:", error);
                router.push("/");
            } finally {
                setLoading(false);
            }
        };

        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        } else if (status === "authenticated") {
            fetchTrip();
        }
    }, [params.slug, searchParams, status, router]);

    if (loading) return <p className="text-center m-5">Loading...</p>;
    if (!trip) return <p>No trip found</p>;

    const handleBuyClick = async () => {
        const res = await fetch("/api/payment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: Buffer.from(
                JSON.stringify({
                    tripsId: params.slug,
                    totalPrice,
                    location: String(trip.location),
                    description: trip.description,
                    coverImage: trip.coverImage,
                    startDate: searchParams.get("startDate"),
                    endDate: searchParams.get("endDate"),
                    maxGuests: Number(searchParams.get("guest")),
                }),
            )
        });

        if (!res.ok) {
            toast({
                title: "Ocorreu um erro ao realizar a reserva!",
            });
        }

        const { sessionId } = await res.json();
      
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

        await stripe?.redirectToCheckout({ sessionId });

        toast({
            title: "Reserva realizada com sucesso!",
        });
    };

    const startDate = new Date(searchParams.get("startDate") as string);
    const endDate = new Date(searchParams.get("endDate") as string);
    const guests = searchParams.get("guest");

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
                        <p>De: {startDate.toLocaleDateString()}</p>-
                        <p>Até: {endDate.toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                        <span>Hóspedes:</span>
                        <p>{guests}</p>
                    </div>
                    <Button onClick={handleBuyClick} className="flex w-full mt-5">Finalizar Reserva</Button>
                </div>
            </div>
        </Card>
    );
};

export default Confirmation;
