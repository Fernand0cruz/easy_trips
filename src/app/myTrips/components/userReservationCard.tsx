import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface UserReservationItemProps {
    reservation: Prisma.ReservationsGetPayload<{
        include: {
            trip: true
        }
    }>
    fetchReservations: () => void;
}

const UserReservationCard = ({ reservation, fetchReservations }: UserReservationItemProps) => {

    const { toast } = useToast()

    const handleClikDelete = async () => {
        const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
            method: "DELETE"
        })

        if (!res.ok) {
            return toast({
                title: "Ocorreu um error ao cancelar a reserva!",
            })
        }

        toast({
            title: "Reserva cancelada com sucesso!",
        })

        fetchReservations()
    }

    return (
        <Card className="p-2 md:h-72 md:flex">
            <Image
                width={500}
                height={500}
                src={reservation.trip.coverImage}
                alt={reservation.trip.location}
                className="rounded-sm w-full md:w-1/2 md:object-cover md:h-[269px]"
            />
            <div className="flex flex-col justify-center md:w-1/2 p-4 gap-1">
                <h2 className="font-serif text-xl">{reservation.trip.location}</h2>
                <p className="text-sm text-muted-foreground">Data: {new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">Hóspedes: {reservation.guests}</p>
                <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-gold font-medium">R$ {reservation.totalPaid.toFixed(2)}</p>
                    </div>
                </div>
                <Button className="flex w-full mt-2" onClick={handleClikDelete}>Cancelar</Button>
            </div>
        </Card>
    );
}

export default UserReservationCard;