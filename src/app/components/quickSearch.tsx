import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { prismaClient } from "@/lib/prisma";

const QuickSearch = async () => {
    const category = await prismaClient.tripCategory.findMany({})
    return (
        <div className="my-10 flex flex-col gap-5">
            <h1 className="uppercase font-bold text-center">Buscas Rápidas</h1>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {
                    category.map((item, index) => (
                        <Link key={index} href={"category/"+item.slug}>
                            <Card className="p-5 flex flex-col justify-center items-center hover:bg-accent">
                                <Image src={item.image?? ""} alt={item.name} width={50} height={50} />
                                <h1 className="text-center">{item.name}</h1>
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default QuickSearch;