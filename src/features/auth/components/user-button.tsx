"use client"
import { useSession , signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreditCard, Loader, LogOutIcon } from "lucide-react"

export const UserButton = () => {
    const session = useSession();
    if(session.status === "loading"){
        return <Loader className="size-4 animate-spin text-muted-foreground"/>
    }

    if(session.status === "unauthenticated" || !session.data){
        return null;
    }

    const name = session.data?.user?.name!;
    const imageUrl = session.data?.user?.image;


    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>

                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage alt={name} src={imageUrl || ""} />
                    <AvatarFallback className="bg-blue-500 font-medium text-white">
                        {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuItem className="h-10" onClick={() => {}} disabled={false}>
                    <CreditCard className="size-4 mr-2" /> Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="h-10" onClick={() => signOut()}>
                    <LogOutIcon className="size-4 mr-2" /> Logout
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}