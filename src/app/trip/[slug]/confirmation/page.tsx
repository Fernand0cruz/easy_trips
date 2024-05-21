"use client";

import { Card } from "@/components/ui/card";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Confirmation = ({ params }: { params: { slug: string } }) => {
    const [trip, setTrip] = useState<Trip | null>(null);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await fetch("/api/trips/check", {
                    method: "POST",
                    body: JSON.stringify({
                        tripId: params.slug,
                        startDate: searchParams.get("startDate"),
                        endDate: searchParams.get("endDate"),
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch trip details');
                }

                const { trip, totalPrice } = await response.json();

                setTrip(trip);
                setTotalPrice(totalPrice);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [params.slug, searchParams]);

    if (loading) return <p>Loading...</p>;
    if (!trip) return <p>No trip found</p>;

    const startDate = new Date(searchParams.get("startDate") as string);
    const endDate = new Date(searchParams.get("endDate") as string)
    const guests = searchParams.get("guest")

    return (
        <Card className="mt-10 flex flex-col m-auto my-5 max-w-7xl p-2">
            <h1 className="font-semibold text-xl">Sua viagem para:</h1>
            <h2>{trip.location}</h2>
            <div className="flex flex-col gap-3 my-5">
                <div className="w-full h-72 flex rounded-md">
                    <Image
                        src={trip.coverImage}
                        width={600}
                        height={400}
                        alt={trip.location}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div>
                    <h3>Informações sobre a viagem:</h3>
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
                    <Button className="flex w-full mt-5">Finalizar Compra</Button>
                </div>
            </div>
        </Card>
    );
};

export default Confirmation;
