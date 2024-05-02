import { Card } from "@/components/ui/card";
import { quickSearch } from "@/config/constants";
import Link from "next/link";
import Image from "next/image";

const QuickSearch = () => {
    return (
        <div className="py-5 my-5 flex flex-col gap-5">
            <h1 className="uppercase font-bold text-center">Buscas Rápidas</h1>
            <div className="grid grid-cols-2 gap-3 md:grid md:grid-cols-4 md:gap-3">
                {
                    quickSearch.map((item, index) => (
                        <Link key={index} href={item.title}>
                            <Card className="p-5 flex flex-col justify-center items-center hover:bg-accent">
                                <Image src={item.image?? ""} alt={item.title} width={50} height={50} />
                                <h1 className="text-center">{item.title}</h1>
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default QuickSearch;