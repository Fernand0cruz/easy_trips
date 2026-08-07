"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

interface FavoriteButtonProps {
    tripId: string;
    initialFavorited?: boolean;
    className?: string;
    variant?: "overlay" | "plain";
}

const FavoriteButton = ({ tripId, initialFavorited = false, className, variant = "overlay" }: FavoriteButtonProps) => {
    const [favorited, setFavorited] = useState(initialFavorited);
    const [loading, setLoading] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (status !== "authenticated") {
            router.push("/login");
            return;
        }

        setLoading(true);
        const nextFavorited = !favorited;

        await fetch(`/api/trips/${tripId}/favorite`, {
            method: nextFavorited ? "POST" : "DELETE",
        });

        setFavorited(nextFavorited);
        setLoading(false);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            className={cn(
                "flex items-center justify-center rounded-full p-2 transition-colors",
                variant === "overlay" ? "bg-black/40 backdrop-blur hover:bg-black/60" : "hover:bg-accent",
                className
            )}
        >
            <Heart className={cn("h-4 w-4", favorited ? "fill-gold text-gold" : variant === "overlay" ? "text-white" : "text-foreground")} />
        </button>
    );
};

export default FavoriteButton;
