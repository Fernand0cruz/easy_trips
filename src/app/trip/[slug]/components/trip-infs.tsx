import { Card } from "@/components/ui/card";
import { CircleCheckBig } from "lucide-react";
import TripReservation from "./trip-reservation";

interface TripsInfsProps {
    description: string;
    highlights: string[];
    category: string;
    pricePerDay: number;
    maxGuests: number;
    tripId: string
}

const TripsInfs = ({ description, highlights, category, pricePerDay, maxGuests, tripId }: TripsInfsProps) => {
    return (
        <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col gap-6 md:w-2/3">
                <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-gold">Sobre</span>
                    <h1 className="font-serif text-2xl mb-2">A viagem</h1>
                    <p className="text-muted-foreground leading-relaxed">{description}</p>
                </div>
                <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-gold">Destaques</span>
                    <h1 className="font-serif text-2xl mb-2">O que esperar</h1>
                    <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                        {
                            highlights.map((highlight, index) => (
                                <li key={index} className="flex gap-2 my-2 items-start"><CircleCheckBig className="text-gold shrink-0 h-5 w-5 mt-0.5" /><span className="text-muted-foreground">{highlight}</span></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <Card className="md:w-1/3 p-6 h-fit md:sticky md:top-24">
                {
                    category === "Motel" ? (
                        <h1 className="font-serif text-3xl">R${pricePerDay.toFixed(2)} <span className="text-sm font-sans text-muted-foreground">/ noite</span></h1>
                    ) : (
                        <h1 className="font-serif text-3xl">R${pricePerDay.toFixed(2)} <span className="text-sm font-sans text-muted-foreground">/ dia</span></h1>
                    )
                }
                <TripReservation tripId={tripId} pricePerDay={pricePerDay} maxGuests={maxGuests}/>
            </Card>
        </div>
    );
}

export default TripsInfs;