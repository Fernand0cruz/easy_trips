import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { prismaClient } from "@/lib/prisma";
import SectionHeading from "./section-heading";

const QuickSearch = async () => {
    const category = await prismaClient.tripCategory.findMany({})

    return (
        <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Categorias" title="Navegue por estilo de viagem" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {
                    category.map((item, index) => (
                        <Link key={index} href={"category/"+item.slug}>
                            <Card className="p-6 flex flex-col gap-3 justify-center items-center transition-colors hover:border-gold">
                                <Image src={item.image?? ""} alt={item.name} width={44} height={44} />
                                <h1 className="text-center text-sm tracking-wide">{item.name}</h1>
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default QuickSearch;