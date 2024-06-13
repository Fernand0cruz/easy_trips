"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormField, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import  { useRouter } from "next/navigation" 

const formSchema = z.object({
    location: z.string(),
    date: z.date().nullable()
});

const Header = () => {
    const [date, setDate] = useState<string | number | Date | undefined>(undefined);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: "",
            date: null,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
        router.push(`/trip/search?location=${values.location}&date=${formattedDate}`);
    }

    return (
        <header className="bg-[url('/traveler_banner.jpg')] w-full mx-auto bg-cover bg-center bg-no-repeat px-5 py-32">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-secondary opacity-90 rounded-md px-5 py-10">
                    <h1 className="text-4xl font-bold text-center pb-5">Pronto para a sua próxima viagem?</h1>
                    <div className="flex flex-col justify-center gap-3 md:flex-row">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Onde você quer ir?"
                                            className="w-[280px]"
                                        />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.location?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal hover:bg-[none]",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "LLL dd, y") : <span>Selecione uma data</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date as Date | undefined}
                                                    onSelect={(date) => {
                                                        setDate(date);
                                                        field.onChange(date);
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.date?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Buscar</Button>
                    </div>
                </form>
            </Form>
        </header>
    );
};

export default Header;
