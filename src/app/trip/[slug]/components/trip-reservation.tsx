"use client";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRanger";
import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { addDays, differenceInDays } from "date-fns";

interface TripReservationProps {
    maxGuests: number;
    pricePerDay: number;
}

const TripReservation = ({ maxGuests, pricePerDay }: TripReservationProps) => {
    const TripReservationSchema = z.object({
        Date: z.object({
            from: z.date(),
            to: z.date()
        }),
        numberOfPeople: z.number()
            .min(1, { message: "Número mínimo de pessoas: 1" })
            .max(maxGuests, { message: `Número máximo de pessoas: ${maxGuests}` })
            .int({ message: "Número de pessoas deve ser um inteiro" }),
    });

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
        const { Date: { from, to }, ...rest } = data;
        const fromDate = from.toLocaleDateString('pt-BR');
        const toDate = to.toLocaleDateString('pt-BR');
        var newData = { from: fromDate, to: toDate, ...rest };
        console.log(newData)
    }

    const { Date: tripDate } = form.watch();

    const totalDays = differenceInDays(tripDate.to, tripDate.from);
    const totalPrice = totalDays * pricePerDay

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                <Controller
                    name="Date"
                    control={form.control}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Selecione um intervalo de datas:</FormLabel>
                            <FormControl>
                                <DatePickerWithRange
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage>
                                {(error as any)?.from?.message || (error as any)?.to?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="numberOfPeople"
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Insira o número de hóspedes:</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" min="1" max={maxGuests}
                                    value={Number(field.value)}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                                />
                            </FormControl>
                            <FormMessage>{error?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="flex justify-between">
                    <p>Total dias: {totalDays}</p>
                    <p>Total preço: {totalPrice.toFixed(2)}</p>
                </div>
                <Button type="submit" className="w-full">Fazer reserva</Button>
            </form>
        </Form>
    );
}

export default TripReservation;
