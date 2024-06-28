"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/toggle-theme";
import {
    signIn,
    signOut,
    useSession
} from "next-auth/react"
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./dropdown-menu";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
    
    const { data, status } = useSession()

    const handleLoginClick = async () => {
        await signIn()
    }

    const handleLogoutClick = async () => {
        await signOut()
    }

    const router = useRouter()

    const handleMyTrips = () => {
        return router.push("/myTrips")
    }

    return (
        <Card>
            <div className="flex justify-between items-center p-5 max-w-screen-xl m-auto">
                <Link  href={"/"}>
                    <span className=" font-bold text-xl">:::: EASY TRIPS ::::</span>
                </Link>
                <div className="flex gap-2">
                    <ModeToggle />
                    <DropdownMenu>

                        {
                            status === "unauthenticated" && <Button variant="outline" onClick={handleLoginClick}>ENTRAR</Button>
                        }

                        <DropdownMenuTrigger asChild>

                            {
                                status === "authenticated" && <Button className="rounded-md flex gap-2" variant={"outline"}><Image className="rounded-full" alt={data.user?.name ?? ''} src={data.user?.image ?? ''} width={25} height={25} /><Menu /></Button>
                            }

                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="flex flex-col">
                            <p className="mx-[6px] mt-2 mb-1">
                                Olá, {data?.user?.name ?? ''}!
                            </p>
                            <DropdownMenuItem onClick={handleLogoutClick}>
                                SAIR
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleMyTrips}>
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