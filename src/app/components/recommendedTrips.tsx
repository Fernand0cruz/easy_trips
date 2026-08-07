import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Trips from "./trips";
import SectionHeading from "./section-heading";

const RecommendedTrips = async () => {
    const trips = await prismaClient.trip.findMany({
        include: { reviews: { select: { rating: true } } },
    })

    const session = await getServerSession(authOptions);
    let favoritedTripIds: Set<string> | undefined;
    if (session) {
        const favorites = await prismaClient.favorite.findMany({
            where: { userId: (session.user as any).id },
            select: { tripId: true },
        });
        favoritedTripIds = new Set(favorites.map((f) => f.tripId));
    }

    return (
        <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Selecionadas para você" title="Viagens recomendadas" />
            <div className="grid grid-cols-2 gap-3 md:grid md:grid-cols-4">
                <Trips data={trips} favoritedTripIds={favoritedTripIds} />
            </div>
        </div>
    );
}

export default RecommendedTrips;