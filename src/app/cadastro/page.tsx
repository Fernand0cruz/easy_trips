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

const registerSchema = z.object({
    name: z.string().min(1, { message: "Insira seu nome." }),
    email: z.string().email({ message: "Insira um email válido." }),
    password: z.string().min(6, { message: "Mínimo de 6 caracteres." }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
});

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
            setLoading(false);
            const json = await res.json();
            if (json.error?.code === "EMAIL_IN_USE") {
                toast({ title: "Este email já está em uso." });
            } else {
                toast({ title: "Ocorreu um erro ao criar sua conta." });
            }
            return;
        }

        const signInRes = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        setLoading(false);

        if (signInRes?.error) {
            toast({ title: "Conta criada! Faça login para continuar." });
            router.push("/login");
            return;
        }

        router.push("/");
        router.refresh();
    };

    return (
        <div className="flex justify-center items-center py-16">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-gold">Junte-se a nós</span>
                    <h1 className="font-serif text-3xl">Criar conta</h1>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Seu nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Criando conta..." : "Criar conta"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Já tem conta?{" "}
                    <Link href="/login" className="text-gold hover:underline normal-case">Entrar</Link>
                </p>
            </Card>
        </div>
    );
};

export default RegisterPage;
