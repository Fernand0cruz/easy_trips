import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    className?: string;
}

const StarRating = ({ rating, className }: StarRatingProps) => {
    const rounded = Math.round(rating);

    return (
        <div className={cn("flex gap-0.5", className)}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={cn(
                        "h-4 w-4",
                        index < rounded ? "fill-gold text-gold" : "text-muted-foreground"
                    )}
                />
            ))}
        </div>
    );
}

export default StarRating;
