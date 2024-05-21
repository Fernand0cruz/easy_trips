"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRanger";
import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { addDays, differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";

interface TripReservationProps {
    maxGuests: number;
    pricePerDay: number;
    tripId: string;
}

const TripReservation = ({ maxGuests, pricePerDay, tripId }: TripReservationProps) => {
    const [reservationError, setReservationError] = useState<string | null>(null);

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

    const router = useRouter();

const onSubmit = async (data: z.infer<typeof TripReservationSchema>) => {
    const { Date: { from, to }, ...rest } = data;
    const newData = {
        from: new Date(from.setHours(0, 0, 0, 0)).toISOString(),
        to: new Date(to.setHours(0, 0, 0, 0)).toISOString(),
        ...rest
    };

    setReservationError(null);

    try {
        const response = await fetch("/api/trips/check", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: Buffer.from(
                JSON.stringify({
                    startDate: newData.from,
                    endDate: newData.to,
                    tripId
                })
            )
        });

        const res = await response.json();

        if (res.error) {
            const errorMessages: { [key: string]: string } = {
                "TRIP_ALREADY_RESERVED": "Esta data já está reservada",
                "INVALID_START_DATE": "Data Inicial inválida",
                "INVALID_END_DATE": "Data final inválida"
            };
            setReservationError(errorMessages[res.error.code] || "Erro desconhecido");
        } else {
            router.push(`/trip/${tripId}/confirmation?startDate=${newData.from}&endDate=${newData.to}&guest=${newData.numberOfPeople}`);
        }
    } catch (error) {
        setReservationError("Erro desconhecido");
    }
};

    const { Date: tripDate } = form.watch();

    const totalDays = useMemo(() => {
        if (tripDate?.from && tripDate?.to) {
            return differenceInDays(tripDate.to, tripDate.from);
        }
        return 0;
    }, [tripDate]);
    const totalPrice = useMemo(() => totalDays * pricePerDay, [totalDays, pricePerDay]);

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
                                {reservationError && (
                                    <p className="text-red-900">{reservationError}</p>
                                )}
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
                                <Input
                                    {...field}
                                    type="number"
                                    min="1"
                                    max={maxGuests}
                                    value={Number(field.value)}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                                />
                            </FormControl>
                            <FormMessage>{error?.message}</FormMessage>
                            <span>Número máximo de pessoas: {maxGuests}</span>
                        </FormItem>
                    )}
                />

                <div className="flex justify-between">
                    <p>{totalDays} Dia(s)</p>
                    <p>Preço: R$ {totalPrice.toFixed(2)}</p>
                </div>
                <Button type="submit" className="w-full">Fazer reserva</Button>
            </form>
        </Form>
    );
}

export default TripReservation;
