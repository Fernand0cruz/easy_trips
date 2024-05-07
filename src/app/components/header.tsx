"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormField, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    search: z.string().nonempty("Campo obrigatório"),
    date: z.string().nonempty("Campo obrigatório"),
});

const Header = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
            date: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <header className="bg-[url('/traveler_banner.jpg')] w-full mx-auto bg-cover bg-center bg-no-repeat px-5 py-32">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-secondary opacity-90 rounded-md px-5 py-10">
                    <h1 className="text-4xl font-bold text-center pb-5">Pronto para a sua próxima viagem?</h1>
                    <div className="flex flex-col justify-center gap-3 md:flex-row">
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} id="para onde" placeholder="Para onde voce quer ir?" className=""/>
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} id="data" type="date" />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Buscar</Button>
                    </div>
                </form>
            </Form>
        </header>
    );
}

export default Header;