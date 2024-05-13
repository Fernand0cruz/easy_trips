"use client";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRanger";
import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDays } from "date-fns";

const TripReservationSchema = z.object({
    Date: z.object({
        from: z.date(),
        to: z.date()
    }),
    numberOfPeople: z.number()
        .min(1, { message: "Number of people must be at least 1" })
        .max(25, { message: "Number of people must not exceed 25" })
        .int("Number of people must be an integer"),
});
const TripReservation = () => {
    const form = useForm<z.infer<typeof TripReservationSchema>>({
        resolver: zodResolver(TripReservationSchema),
        defaultValues: {
            Date: {
                from: new Date(),
                to: addDays(new Date(), 5),
            },
            numberOfPeople: 1,
        },
    });

    function onSubmit(data: z.infer<typeof TripReservationSchema>) {
        const from = data.Date.from.toLocaleDateString('pt-BR');
        const to = data.Date.to.toLocaleDateString('pt-BR');
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 mt-4"
            >
                <FormField
                    control={form.control}
                    name="Date"
                    render={({ field: { onChange, value } }) => (
                        <FormItem>
                            <FormLabel>Selecione um intervalo de datas:</FormLabel>
                            <FormControl>
                                <DatePickerWithRange
                                    value={{
                                        from: form.watch('Date')?.from || value.from,
                                        to: form.watch('Date')?.to || value.to,
                                    }}
                                    onChange={(range) => onChange(range)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="numberOfPeople"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Insira o número de hóspedes:</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" min="1" max="25"
                                    value={Number(field.value)}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Fazer reserva</Button>
            </form>
        </Form>
    );
}

export default TripReservation;