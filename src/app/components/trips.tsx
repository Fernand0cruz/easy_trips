import { Card } from "@/components/ui/card";
import FavoriteButton from "@/components/ui/favorite-button";
import StarRating from "@/components/ui/star-rating";
import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface TripsProps {
    data: Trip[];
    favoritedTripIds?: Set<string>;
}

const Trips = ({ data, favoritedTripIds }: TripsProps) => {
    return (
        <>
            {
                data.map((trip: any) => (
                    <Card key={trip.id} className="group relative p-2 transition-colors hover:border-gold">
                        <FavoriteButton
                            tripId={trip.id}
                            initialFavorited={favoritedTripIds?.has(trip.id) ?? false}
                            className="absolute top-4 right-4 z-10"
                        />
                        <Link href={"/trip/" + trip.id}>
                            <div className="w-full h-60 overflow-hidden rounded-sm mb-3">
                                <Image src={trip.coverImage} alt={trip.location} width={300} height={200}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="px-1 pb-1">
                                <h2 className="font-serif text-lg overflow-hidden whitespace-nowrap text-ellipsis">{trip.location}</h2>
                                {trip.reviews?.length > 0 && (
                                    <div className="flex items-center gap-1 my-1">
                                        <StarRating rating={trip.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / trip.reviews.length} />
                                        <span className="text-xs text-muted-foreground">({trip.reviews.length})</span>
                                    </div>
                                )}
                                <p className="text-gold font-medium">R$ {trip.pricePerDay.toFixed(2)} <span className="text-muted-foreground font-normal">/ diária</span></p>
                                <p className="text-sm text-muted-foreground">até {trip.maxGuests} hóspedes</p>
                            </div>
                        </Link>
                    </Card>
                ))
            }
        </>
    );
}

export default Trips;