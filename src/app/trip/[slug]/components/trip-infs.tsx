import { CircleCheckBig } from "lucide-react";

interface TripsInfsProps {
    description: string;
    highlights: string[];
}

const TripsInfs = ({ description, highlights }: TripsInfsProps) => {
    return (
        <div className="my-5 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-col gap-5 md:w-2/3">
                <div>
                    <h1 className="uppercase font-bold">Sobre a viagem:</h1>
                    <p>{description}</p>
                </div>
                <ul>
                    <h1 className="uppercase font-bold">Destaques:</h1>
                    {
                        highlights.map((highlight, index) => (
                            <li key={index} className="flex gap-2 my-[12px]"><CircleCheckBig />{highlight}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default TripsInfs;