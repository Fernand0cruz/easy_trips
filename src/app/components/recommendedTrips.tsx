import { prismaClient } from "@/lib/prisma";
import Trips from "./trips";

const RecommendedTrips = async () => {
    const trips = await prismaClient.trip.findMany({})
    return (
        <div className="flex flex-col gap-5">
            <h1 className="uppercase font-bold text-center">Viagens recomendadas!</h1>
            <div className="grid grid-cols-2 gap-3 md:grid md:grid-cols-4">
                <Trips data={trips}/>
            </div>
        </div>
    );
}

export default RecommendedTrips;