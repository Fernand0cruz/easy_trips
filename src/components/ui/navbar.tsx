"use client"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-theme";
import {
    signOut,
    useSession
} from "next-auth/react"
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./dropdown-menu";
import { Heart, LogOut, Luggage, Menu, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {

    const { data, status } = useSession()

    const handleLoginClick = () => {
        router.push("/login")
    }

    const handleLogoutClick = async () => {
        await signOut()
    }

    const router = useRouter()

    const handleMyTrips = () => {
        return router.push("/myTrips")
    }

    const handleFavorites = () => {
        return router.push("/favoritos")
    }

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
            <div className="flex justify-between items-center px-5 py-4 max-w-screen-xl m-auto">
                <Link href={"/"}>
                    <span className="font-serif text-2xl tracking-wide">Easy Trips</span>
                </Link>
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <DropdownMenu>

                        {
                            status === "unauthenticated" && <Button variant="outline" onClick={handleLoginClick}>ENTRAR</Button>
                        }

                        <DropdownMenuTrigger asChild>

                            {
                                status === "authenticated" && (
                                    <Button className="rounded-sm flex gap-2" variant={"outline"}>
                                        {data.user?.image ? (
                                            <Image className="rounded-full" alt={data.user?.name ?? ''} src={data.user.image} width={25} height={25} />
                                        ) : (
                                            <UserIcon className="h-[18px] w-[18px]" />
                                        )}
                                        <Menu />
                                    </Button>
                                )
                            }

                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="flex items-center gap-2 normal-case font-normal">
                                {data?.user?.image ? (
                                    <Image className="rounded-full" alt={data.user?.name ?? ''} src={data.user.image} width={28} height={28} />
                                ) : (
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                                        <UserIcon className="h-4 w-4" />
                                    </span>
                                )}
                                <span className="truncate">{data?.user?.name ?? ''}</span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleFavorites} className="gap-2 cursor-pointer">
                                <Heart className="h-4 w-4" />
                                FAVORITOS
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleMyTrips} className="gap-2 cursor-pointer">
                                <Luggage className="h-4 w-4" />
                                MINHAS RESERVAS
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogoutClick} className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                                <LogOut className="h-4 w-4" />
                                SAIR
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

export default Navbar;