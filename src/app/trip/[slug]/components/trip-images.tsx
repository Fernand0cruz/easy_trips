"use client"

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TripImagensProps {
    imageUrls: string[];
    coverImage: string;
}

const TripImagens = ({ imageUrls, coverImage }: TripImagensProps) => {
    const [currentImage, setCurrentImage] = useState(coverImage)
    const handleImageClick = (imageUrl: string) => {
        setCurrentImage(imageUrl)
    }

    return (
        <div className="w-full flex flex-col gap-2 md:flex-row">
            <Image
                src={currentImage}
                width={1280}
                height={720}
                quality={100}
                alt={coverImage}
                className="w-full h-96 object-cover rounded-sm border border-border"

            />
            <div className="grid grid-cols-2 w-full gap-2 md:grid-cols-2">
                {
                    imageUrls.map((imageUrls) => (
                        <button
                            key={imageUrls}
                            onClick={() => handleImageClick(imageUrls)}
                            className={cn(
                                "overflow-hidden rounded-sm border transition-colors",
                                currentImage === imageUrls ? "border-gold" : "border-border"
                            )}
                        >
                            <Image
                                src={imageUrls}
                                alt={imageUrls}
                                width={300}
                                height={200}
                                className={cn(
                                    "w-full h-[187px] object-cover cursor-pointer transition-all duration-500 hover:scale-105",
                                    currentImage === imageUrls && "opacity-90"
                                )}
                            />
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

export default TripImagens;