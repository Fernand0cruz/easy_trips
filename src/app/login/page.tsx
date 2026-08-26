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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Insira um email válido." }),
    password: z.string().min(1, { message: "Insira sua senha." }),
});

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        setLoading(true);
        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        setLoading(false);

        if (res?.error) {
            toast({ title: "Email ou senha inválidos." });
            return;
        }

        router.push("/");
        router.refresh();
    };

    return (
        <div className="flex justify-center items-center py-16">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-gold">Bem-vindo de volta</span>
                    <h1 className="font-serif text-3xl">Entrar</h1>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="voce@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Ainda não tem conta?{" "}
                    <Link href="/cadastro" className="text-gold hover:underline normal-case">Cadastre-se</Link>
                </p>
            </Card>
        </div>
    );
};

export default LoginPage;
