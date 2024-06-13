"use client"
import { useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";
import { Trip } from "@prisma/client";
import Header from "@/app/components/header";
import Trips from "@/app/components/trips";

const SearchPage = () => {
    const [trips, setTrips] = React.useState<Trip[]>([]);

    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchTrips = async () => {
            const location = searchParams.get("location") || '';
            const date = searchParams.get("date") || '';

            const response = await fetch(
                `/api/trips/search?location=${location}&date=${date}`
            );

            const data = await response.json();

            setTrips(data);
        };

        fetchTrips();
    }, [searchParams]);

    return (
        <div className="flex flex-col m-auto max-w-7xl">
            <Header />
            <h1 className="uppercase font-bold text-center my-5">Sua busca resultou em:</h1>
            <Suspense fallback={<p>Carregando...</p>}>
                <div className="grid grid-cols-2 gap-3 md:grid md:grid-cols-4">
                    {trips.length > 0 ? <Trips data={trips} /> : <p>Viagem não encontrada!</p>}
                </div>
            </Suspense>
        </div>
    );
}

export default SearchPage;
