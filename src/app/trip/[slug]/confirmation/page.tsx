"use client";

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

    if (loading) return <p className="text-center m-10 text-muted-foreground">Carregando...</p>;
    if (!trip) return <p className="text-center m-10 text-muted-foreground">Viagem não encontrada</p>;

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
        <div className="flex flex-col m-auto mt-10 max-w-screen-xl gap-6">
            <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold">Confirmação</span>
                <h1 className="font-serif text-3xl">Sua viagem para {trip.location}</h1>
            </div>
            <div className="flex flex-col gap-6">
                <TripImagens imageUrls={trip.imagesUrl} coverImage={trip.coverImage} />
                <div className="rounded-md border border-border p-6 flex flex-col gap-2">
                    <h1 className="font-serif text-xl mb-1">Informações sobre a viagem</h1>
                    <p className="text-muted-foreground">Local: {trip.location}</p>
                    <h3 className="font-serif text-2xl text-gold">Preço total: R$ {totalPrice?.toFixed(2)}</h3>
                    <div className="flex gap-2 text-muted-foreground">
                        <p>De: {startDate.toLocaleDateString()}</p>-
                        <p>Até: {endDate.toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2 text-muted-foreground">
                        <span>Hóspedes:</span>
                        <p>{guests}</p>
                    </div>
                </div>
                <Button onClick={handleBuyClick} className="flex w-full">Finalizar Reserva</Button>
            </div>
        </div>
    );
};

export default Confirmation;
