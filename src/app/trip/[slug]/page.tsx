import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TripImagens from "./components/trip-images";
import TripsInfs from "./components/trip-infs"
import TripHeader from "./components/trip-header";
import TripReviews from "./components/trip-reviews";

const Trips = async ({ params }: any) => {
    const trips = await prismaClient.trip.findUnique({
        where: {
            id: params.slug
        },
        include:{
            category: true,
            reviews: { select: { rating: true } },
        }
    })

    if (!trips) return null

    const avgRating = trips.reviews.length > 0
        ? trips.reviews.reduce((sum, r) => sum + r.rating, 0) / trips.reviews.length
        : 0

    const session = await getServerSession(authOptions);
    let initialFavorited = false;
    if (session) {
        const favorite = await prismaClient.favorite.findUnique({
            where: { userId_tripId: { userId: (session.user as any).id, tripId: trips.id } },
        });
        initialFavorited = !!favorite;
    }

    return (
        <div className="flex flex-col m-auto mt-6 gap-6 max-w-screen-xl">
            <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground w-fit">
                <ArrowLeft className="h-4 w-4" />
                Voltar
            </Link>
            <TripHeader
                location={trips.location}
                tripId={trips.id}
                initialFavorited={initialFavorited}
                category={trips.category.name}
                maxGuests={trips.maxGuests}
                avgRating={avgRating}
                reviewCount={trips.reviews.length}
            />
            <TripImagens imageUrls={trips.imagesUrl} coverImage={trips.coverImage} />
            <TripsInfs
                description={trips.description}
                highlights={trips.highlights}
                category={trips.category.name}
                maxGuests={trips.maxGuests}
                pricePerDay={trips.pricePerDay}
                tripId={trips.id}
            />
            <TripReviews tripId={trips.id} />
        </div>
    );
}

export default Trips;