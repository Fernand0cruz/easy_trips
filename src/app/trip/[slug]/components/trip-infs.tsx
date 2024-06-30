import { Card } from "@/components/ui/card";
import { CircleCheckBig } from "lucide-react";
import TripReservation from "./trip-reservation";

interface TripsInfsProps {
    description: string;
    highlights: string[];
    category: string;
    pricePerDay: number;
    startDate: Date | number | null;
    endDate: Date | number | null;
    maxGuests: number;
    tripId: string
}

const TripsInfs = ({ description, highlights, category, pricePerDay, endDate, startDate, maxGuests, tripId }: TripsInfsProps) => {
    return (
        <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex flex-col gap-5 md:w-2/3">
                <div>
                    <h1 className="uppercase font-bold">Sobre a viagem:</h1>
                    <p>{description}</p>
                </div>
                <ul>
                    <h1 className="uppercase font-bold">Destaques:</h1>
                    {
                        highlights.map((highlight, index) => (
                            <li key={index} className="flex gap-2 my-[12px]"><CircleCheckBig />{highlight}</li>
                        ))
                    }
                </ul>
            </div>
            <Card className="md:w-1/3 p-5">
                {
                    category === "Motel" ? (
                        <h1 className="font-bold">R${pricePerDay.toFixed(2)} / noite</h1>
                    ) : (
                        <h1 className="font-bold">R${pricePerDay.toFixed(2)} / dia</h1>
                    )
                }
                <TripReservation tripId={tripId} pricePerDay={pricePerDay} maxGuests={maxGuests}/>
            </Card>
        </div>
    );
}

export default TripsInfs;