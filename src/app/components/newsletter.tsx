"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        setLoading(false);

        if (res.ok) {
            toast({ title: "Inscrição confirmada! Fique de olho no seu email." });
            setEmail("");
            return;
        }

        const json = await res.json();
        if (json.error?.code === "ALREADY_SUBSCRIBED") {
            toast({ title: "Este email já está inscrito." });
        } else {
            toast({ title: "Ocorreu um erro ao se inscrever." });
        }
    };

    return (
        <Card className="p-8 md:p-12 flex flex-col items-center text-center gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Newsletter</span>
            <h1 className="font-serif text-3xl max-w-md">Receba destinos selecionados direto no seu email</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm md:flex-row">
                <Input
                    type="email"
                    required
                    placeholder="voce@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Inscrever-se"}
                </Button>
            </form>
        </Card>
    );
}

export default Newsletter;
