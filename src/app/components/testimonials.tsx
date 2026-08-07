import { Card } from "@/components/ui/card";
import StarRating from "@/components/ui/star-rating";
import SectionHeading from "./section-heading";

const testimonials = [
    {
        name: "Marina Costa",
        location: "São Paulo, SP",
        quote: "A Easy Trips tornou o planejamento da nossa lua de mel incrivelmente simples. Cada detalhe foi pensado com cuidado.",
    },
    {
        name: "Rafael Almeida",
        location: "Belo Horizonte, MG",
        quote: "Encontrei um chalé perfeito em Petrópolis em minutos. O processo de reserva é rápido e o atendimento é impecável.",
    },
    {
        name: "Juliana Prado",
        location: "Curitiba, PR",
        quote: "Já usei a plataforma três vezes e sempre me surpreendo com a qualidade das acomodações selecionadas.",
    },
];

const Testimonials = () => {
    return (
        <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Depoimentos" title="Quem viajou, aprovou" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.name} className="p-6 flex flex-col gap-3">
                        <StarRating rating={5} />
                        <p className="text-muted-foreground leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                        <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Testimonials;
