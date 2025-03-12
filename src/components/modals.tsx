"use client";

import { SubscriptionModal } from "@/features/subscriptions/components/subsciption-modal";
import { useEffect, useState } from "react";

export const Modals = () =>{
    const [isMounted,setMounted]= useState(false);

    useEffect(() =>{
        setMounted(true)
    },[]);
    if(!isMounted){
        return null;
    }
    return (
        <>
        <SubscriptionModal/>
        </>
    );
};