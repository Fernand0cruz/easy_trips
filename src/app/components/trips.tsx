import { Card } from "@/components/ui/card";
import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface TripsProps {
    data: Trip[];
}

const Trips = ({ data }: TripsProps) => {
    return (
        <>
            {
                data.map((trip: any) => (
                    <Card  key={trip.id} className="hover:bg-accent p-2">
                        <Link href={"/trip/" + trip.id}>
                            <div className="w-full h-60 flex rounded-md">
                                <Image src={trip.coverImage} alt={trip.location} width={300} height={200}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            <div>
                                <h2 className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{trip.location}</h2>
                                <p>R$ {trip.pricePerDay.toFixed(2)} a Diária</p>
                                <p>N. Máximo de Pessoas {trip.maxGuests}</p>
                            </div>
                        </Link>
                    </Card>
                ))
            }
        </>
    );
}

export default Trips;