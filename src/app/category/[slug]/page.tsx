import Trips from "@/app/components/trips";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import SectionHeading from "@/app/components/section-heading";

const Category = async ({params}: any) => {
    const trips = await prismaClient.trip.findMany({
        where: {
            category: {
                slug: params.slug
            }
        },
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
        <div className="mt-10 gap-6 flex flex-col m-auto max-w-screen-xl">
            <SectionHeading eyebrow="Categoria" title={`Resultados para ${params.slug}`} />
            <div className="grid grid-cols-2 gap-3 md:grid md:grid-cols-4 md:gap-3">
                <Trips data={trips} favoritedTripIds={favoritedTripIds} />
            </div>
        </div>
     );
}
 
export default Category;