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
        <div className="mt-5 gap-5 flex flex-col m-auto max-w-screen-xl">
            <h1 className="uppercase font-bold text-center">Resultados da busca por {params.slug}</h1>
            <div className="grid grid-cols-2 gap-3 md:grid md:grid-cols-4 md:gap-3">
                <Trips data={trips}/>
            </div>
        </div>
     );
}
 
export default Category;