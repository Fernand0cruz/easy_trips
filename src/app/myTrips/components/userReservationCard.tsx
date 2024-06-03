import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface UserReservationItemProps {
    reservation: Prisma.ReservationsGetPayload<{
        include: {
            trip: true
        }

    }>
}

const UserReservationCard = ({ reservation }: UserReservationItemProps) => {
    return (
        <Card className="p-2 md:flex">
            <Image
                width={500}
                height={500}
                src={reservation.trip.coverImage}
                alt={reservation.trip.location}
                className="rounded-lg w-full md:w-1/2 md:object-cover md:h-60"
            />
            <div className="mt-5 md:w-1/2 p-3">
                <h2>Local: {reservation.trip.location}</h2>
                <p>Data: {new Date(reservation.trip.startDate).toLocaleDateString()} - {new Date(reservation.trip.endDate).toLocaleDateString()}</p>
                <p>Hóspedes: {reservation.guests}</p>
                <div className="border-t-2 pt-3 mt-3">
                    informaçoes de preço:
                    <div className="flex justify-between">
                        <p>Total: </p>
                        <p>R$ {reservation.totalPaid.toFixed(2)}</p>
                    </div>
                </div>
                <Button className="flex w-full mt-5">Cancelar</Button>
            </div>
        </Card>
    );
}
export default UserReservationCard;