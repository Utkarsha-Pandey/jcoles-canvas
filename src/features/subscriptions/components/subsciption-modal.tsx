"use client";

import { Dialog,DialogTitle,DialogFooter,DialogHeader,DialogContent,DialogDescription } from "@/components/ui/dialog";
import { useSubcriptionModal } from "../store/use-subscription-modal";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SubscriptionModal = () =>{
    const {isOpen, onClose} = useSubcriptionModal();
    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="flex items-center space-y-4">
                    <Image 
                    src="/logo.svg"
                    alt="Logo"
                    width={36}
                    height={36}
                    />
                <DialogTitle className="text-center">
                    Upgrade to Pro
                </DialogTitle>
                <DialogDescription className="text-center">
                   Upgrade to Pro to unlock more features 
                </DialogDescription>
                </DialogHeader>
                <Separator>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white"/>
                            <p className="text-sm text-muted-foreground">
                                Unlimited projects
                            </p>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white"/>
                            <p className="text-sm text-muted-foreground">
                                Unlock all the templates
                            </p>
                        </li>
                    </ul>
                    <DialogFooter className="pt-2 mt-4 gap-y-2">
                        <Button className="w-full" onClick={()=>{}} disabled={false}>
                            Upgrade
                        </Button>
                    </DialogFooter>
                </Separator>
            </DialogContent>
        </Dialog>
    )  
};