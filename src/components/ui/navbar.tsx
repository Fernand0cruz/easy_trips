"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { signIn, signOut, useSession } from "next-auth/react"
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Menu } from "lucide-react";

const Navbar = () => {
    const { data, status } = useSession()
    const handleLoginClick = async () => {
        await signIn()
    }
    const handleLogoutClick = async () => {
        await signOut()
    }

    return (
        <Card>
            <div className="flex justify-between items-center p-5 max-w-[1320px] m-auto">
                <span className=" font-bold text-xl">:::: EASY TRIPS ::::</span>
                <div className="flex gap-2">
                    <ModeToggle />
                    <DropdownMenu>
                        {
                            status === "unauthenticated" && <Button variant="outline" onClick={handleLoginClick}>LOGIN</Button>
                        }
                        <DropdownMenuTrigger asChild>
                            {
                                status === "authenticated" && <Button className="rounded-full flex gap-2" variant={"outline"}><Image className="rounded-full" alt={data.user?.name ?? ''} src={data.user?.image ?? ''} width={25} height={25} /><Menu /></Button>
                            }
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="flex flex-col">
                            <p className="mx-[6px] mt-2 mb-1">
                                Olá, {data?.user?.name ?? ''}
                            </p>
                            <DropdownMenuItem onClick={handleLogoutClick}>
                                LOGOUT
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                MINHAS RESERVAS
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );
}

export default Navbar;