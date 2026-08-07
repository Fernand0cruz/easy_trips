import FavoriteButton from "@/components/ui/favorite-button";
import StarRating from "@/components/ui/star-rating";
import { Users } from "lucide-react";

interface TripHeaderProps {
    location: string;
    tripId: string;
    initialFavorited: boolean;
    category: string;
    maxGuests: number;
    avgRating: number;
    reviewCount: number;
}

const TripHeader = ({ location, tripId, initialFavorited, category, maxGuests, avgRating, reviewCount }: TripHeaderProps) => {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-gold">Destino</span>
                <h1 className="font-serif text-4xl">{location}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="uppercase tracking-wide text-xs">{category}</span>
                    <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        até {maxGuests} hóspedes
                    </span>
                    {reviewCount > 0 && (
                        <span className="flex items-center gap-1.5">
                            <StarRating rating={avgRating} />
                            {avgRating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? "avaliação" : "avaliações"})
                        </span>
                    )}
                </div>
            </div>
            <FavoriteButton tripId={tripId} initialFavorited={initialFavorited} variant="plain" className="border border-border shrink-0" />
        </div>
    );
}

export default TripHeader;
