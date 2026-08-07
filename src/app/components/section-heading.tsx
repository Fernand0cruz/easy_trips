import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    title: string;
    eyebrow?: string;
    align?: "center" | "left";
}

const SectionHeading = ({ title, eyebrow, align = "center" }: SectionHeadingProps) => {
    return (
        <div className={cn("flex flex-col gap-2", align === "center" ? "items-center text-center" : "items-start text-left")}>
            {eyebrow && (
                <span className="text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</span>
            )}
            <h1 className="font-serif text-3xl">{title}</h1>
        </div>
    );
}

export default SectionHeading;
