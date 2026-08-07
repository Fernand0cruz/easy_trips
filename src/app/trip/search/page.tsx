"use client"

import { useSearchParams } from "next/navigation";
import
    React,
    { useCallback, useEffect,
        Suspense
    } from "react";
import { Trip } from "@prisma/client";
import Header from "@/app/components/header";
import Trips from "@/app/components/trips";
import SectionHeading from "@/app/components/section-heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SearchResults = () => {
    const [trips, setTrips] = React.useState<Trip[]>([]);
    const [minPrice, setMinPrice] = React.useState("");
    const [maxPrice, setMaxPrice] = React.useState("");
    const [guests, setGuests] = React.useState("");
    const searchParams = useSearchParams();

    const fetchTrips = useCallback(async () => {
        const location = searchParams.get("location") || '';
        const date = searchParams.get("date") || '';

        const query = new URLSearchParams({ location, date });
        if (minPrice) query.set("minPrice", minPrice);
        if (maxPrice) query.set("maxPrice", maxPrice);
        if (guests) query.set("guests", guests);

        const response = await fetch(`/api/trips/search?${query.toString()}`);
        const data = await response.json();
        setTrips(data);
    }, [searchParams, minPrice, maxPrice, guests]);

    useEffect(() => {
        fetchTrips();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 rounded-md border border-border p-5 md:flex-row md:items-end">
                <div className="flex flex-col gap-1">
                    <Label>Preço mínimo</Label>
                    <Input type="number" min="0" placeholder="R$" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Preço máximo</Label>
                    <Input type="number" min="0" placeholder="R$" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Hóspedes</Label>
                    <Input type="number" min="1" placeholder="Nº de hóspedes" value={guests} onChange={(e) => setGuests(e.target.value)} />
                </div>
                <Button type="button" variant="outline" onClick={fetchTrips}>Aplicar filtros</Button>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid md:grid-cols-4">
                {trips.length > 0 ? <Trips data={trips} /> : <p className="text-muted-foreground">Sua busca não encontrou resultados!</p>}
            </div>
        </div>
    );
};

const SearchPage = () => {
    return (
        <div className="flex flex-col m-auto max-w-screen-xl gap-6">
            <Header />
            <SectionHeading eyebrow="Busca" title="Resultados da sua busca" />
            <Suspense fallback={<p className="text-center text-muted-foreground">Carregando...</p>}>
                <SearchResults />
            </Suspense>
        </div>
    );
}

export default SearchPage;

