"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const TripReservation = () => {
    const formSchema = z.object({
        dateStart: z.string().nonempty("Campo obrigatório"),
        dateEnd: z.string().nonempty("Campo obrigatório"),
        guests: z.string().nonempty("Campo obrigatório")
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dateStart: "",
            dateEnd: "",
            guests: ""
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 my-5">
                <div className="flex w-full gap-3">
                    <FormField
                        control={form.control}
                        name="dateStart"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>Data inicio:</FormLabel>
                                <FormControl>
                                    <Input {...field} id="dateStart" type="date"/>
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="dateEnd"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>Data fim:</FormLabel>
                                <FormControl>
                                    <Input {...field} id="dateEnd" type="date"/>
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número de pessoas:</FormLabel>
                            <FormControl>
                                <Input {...field} id="guests" placeholder="Número de pessoas" type="number" />
                            </FormControl>
                            <FormMessage {...field} />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between">
                    <span>Total: {} Dias</span>
                    <span>Valor: R${}</span>
                </div>
                <Button type="submit">Reservar</Button>
            </form>
        </Form>
    );
}

export default TripReservation;