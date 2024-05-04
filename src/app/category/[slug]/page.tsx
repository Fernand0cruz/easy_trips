import Trips from "@/app/components/trips";
import { prismaClient } from "@/lib/prisma";

const Category = async ({params}: any) => {
    const trips = await prismaClient.trip.findMany({
        where: {
            category: {
                slug: params.slug
            }
        },
    })
    return ( 
        <div className="mt-10 flex flex-col m-auto max-w-7xl">
            <h1 className="uppercase font-bold text-center">Buscando por {params.slug}?</h1>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid md:grid-cols-4 md:gap-3">
                <Trips data={trips}/>
            </div>
        </div>
     );
}
 
export default Category;