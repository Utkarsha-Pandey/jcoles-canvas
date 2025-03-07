"use client";

import {signIn} from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription
} from "@/components/ui/card"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { FaGoogle } from "react-icons/fa6"



export const SignUpCard = () => {
    const onProviderSignUp = (provider : "github" | "google") => {
        signIn(provider , {callbackUrl : "/"});
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Create an Account

                </CardTitle>
                <CardDescription>
                    Use your email or another service to Continue
                </CardDescription>
            </CardHeader>


            <CardContent className="space-y-5 px-0 pb-0">
                <div className="flex flex-col gap-y-2.5">

                    <Button
                    onClick={() => onProviderSignUp("github")}
                    variant="outline"
                    size="lg"
                    className="w-full relative">
                        <FaGithub />
                        Continue with Github
                    </Button>
                    <Button
                    onClick={() => onProviderSignUp("google")}
                    variant="outline"
                    size="lg"
                    className="w-full relative">
                        <FaGoogle />
                        Continue with Google
                    </Button>
                </div>
                <p>
                    Already have an Account? <Link href="/sign-in"><span className="text-sky-700 hover:underline">Sign In</span></Link>
                </p>
            </CardContent>
        </Card>
    )
}