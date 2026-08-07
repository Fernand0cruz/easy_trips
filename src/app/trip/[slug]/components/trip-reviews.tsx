"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import StarRating from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MessageSquareText, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: { name: string | null; image: string | null };
}

interface TripReviewsProps {
    tripId: string;
}

const ratingLabels = ["Muito ruim", "Ruim", "Razoável", "Bom", "Excelente"];

const reviewSchema = z.object({
    rating: z.number().min(1, { message: "Selecione uma nota." }).max(5),
    comment: z.string().min(1, { message: "Escreva um comentário." }),
});

const ReviewerAvatar = ({ name, image }: { name: string | null; image: string | null }) => {
    if (image) {
        return <Image src={image} alt={name ?? "Hóspede"} width={36} height={36} className="rounded-full shrink-0" />;
    }
    return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-sm">
            {(name ?? "H").charAt(0).toUpperCase()}
        </span>
    );
};

const TripReviews = ({ tripId }: TripReviewsProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [hoveredRating, setHoveredRating] = useState(0);
    const { status } = useSession();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof reviewSchema>>({
        resolver: zodResolver(reviewSchema),
        defaultValues: { rating: 0, comment: "" },
    });

    const fetchReviews = async () => {
        const res = await fetch(`/api/trips/${tripId}/reviews`);
        const json = await res.json();
        setReviews(json);
    };

    useEffect(() => {
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripId]);

    const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
        const res = await fetch(`/api/trips/${tripId}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
            toast({ title: "Ocorreu um erro ao enviar sua avaliação." });
            return;
        }

        form.reset({ rating: 0, comment: "" });
        toast({ title: "Avaliação enviada com sucesso!" });
        fetchReviews();
    };

    const avgRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    }, [reviews]);

    const distribution = useMemo(() => {
        return [5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            return { star, count, pct: reviews.length > 0 ? (count / reviews.length) * 100 : 0 };
        });
    }, [reviews]);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold">Avaliações</span>
                <h1 className="font-serif text-2xl mb-2">O que dizem os hóspedes</h1>
            </div>

            {reviews.length > 0 ? (
                <>
                    <Card className="p-6 flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex flex-col items-center gap-1 sm:border-r sm:border-border sm:pr-6">
                            <span className="font-serif text-5xl">{avgRating.toFixed(1)}</span>
                            <StarRating rating={avgRating} />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full">
                            {distribution.map(({ star, count, pct }) => (
                                <div key={star} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="w-3 text-right">{star}</span>
                                    <Star className="h-3 w-3 fill-gold text-gold shrink-0" />
                                    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                                        <div className="h-full bg-gold rounded-full" style={{ width: `${pct}%` }} />
                                    </div>
                                    <span className="w-5">{count}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {reviews.map((review) => (
                            <Card key={review.id} className="p-5 flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <ReviewerAvatar name={review.user.name} image={review.user.image} />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm">{review.user.name ?? "Hóspede"}</span>
                                        <span className="text-xs text-muted-foreground capitalize">
                                            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: ptBR })}
                                        </span>
                                    </div>
                                </div>
                                <StarRating rating={review.rating} />
                                <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
                            </Card>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
                    <MessageSquareText className="h-8 w-8 text-gold" />
                    <p>Ainda não há avaliações para esta viagem.</p>
                    <p className="text-sm">Seja o primeiro a contar como foi sua experiência.</p>
                </div>
            )}

            {status === "authenticated" ? (
                <Card className="p-8 w-full border-t-2 border-t-gold">
                    <div className="text-center mb-6">
                        <span className="text-xs uppercase tracking-[0.2em] text-gold">Sua opinião importa</span>
                        <h1 className="font-serif text-2xl">Deixe sua avaliação</h1>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                            <Controller
                                name="rating"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-col items-center gap-2" onMouseLeave={() => setHoveredRating(0)}>
                                                <div className="flex gap-2">
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <button
                                                            type="button"
                                                            key={index}
                                                            onMouseEnter={() => setHoveredRating(index + 1)}
                                                            onClick={() => field.onChange(index + 1)}
                                                        >
                                                            <Star
                                                                className={cn(
                                                                    "h-8 w-8 transition-transform",
                                                                    index < (hoveredRating || field.value) ? "fill-gold text-gold scale-110" : "text-muted-foreground"
                                                                )}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                                <span className="text-sm text-muted-foreground h-5">
                                                    {ratingLabels[(hoveredRating || field.value) - 1] ?? ""}
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-center" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comentário</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Conte como foi sua experiência..." className="min-h-[100px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Enviar avaliação</Button>
                        </form>
                    </Form>
                </Card>
            ) : (
                <p className="text-muted-foreground">
                    <Link href="/login" className="text-gold hover:underline normal-case">Entre</Link> para avaliar esta viagem.
                </p>
            )}
        </div>
    );
}

export default TripReviews;
