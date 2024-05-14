import { Card } from "@/components/ui/card";
import { prismaClient } from "@/lib/prisma";
import TripImagens from "./components/trip-images";
import TripsInfs from "./components/trip-infs"
import TripHeader from "./components/trip-header";

const Trips = async ({ params }: any) => {
    const trips = await prismaClient.trip.findUnique({
        where: {
            id: params.slug
        },
        include:{
            category: true
        }
    })
    if (!trips) return null
    return (
        <Card className="mt-10 flex flex-col m-auto my-5 max-w-7xl p-2">
            <TripHeader location={trips.location} maxGuests={trips.maxGuests}/>
            <TripImagens imageUrls={trips.imagesUrl} coverImage={trips.coverImage} />
            <TripsInfs 
                description={trips.description} 
                highlights={trips.highlights} 
                category={trips.category.name}
                startDate={trips.startDate}
                endDate={trips.endDate}
                maxGuests={trips.maxGuests}
                pricePerDay={trips.pricePerDay}
            />
        </Card>
    );
}

export default Trips;