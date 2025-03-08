"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSignUp } from "../hooks/use-sign-up";
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

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useSearchParams } from "next/navigation";
import { TriangleAlert } from "lucide-react"; 

export const SignUpCard = () => {
    const mutation = useSignUp();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onCredentialsSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({
            name,
            email,
            password
        }, {
            onSuccess: () => {
                signIn("credentials" , {
                    email,
                    password,
                    callbackUrl: "/",
                })
            }
        })
    }

    const onProviderSignUp = (provider: "github" | "google") => {
        signIn(provider, { callbackUrl: "/" });
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

            {!!mutation.error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert className="size-4"/>
                </div>
            )}

            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onCredentialsSignUp} className="space-y-2.5">
                    <Input
                        disabled={mutation.isPending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        type="text"
                        required />
                    <Input
                        disabled={mutation.isPending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required />
                    <Input
                        disabled={mutation.isPending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                        minLength={3}
                        maxLength={20}
                    />
                    <Button
                        disabled={mutation.isPending}
                        type="submit" className="w-full" size="lg">
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">

                    <Button
                        disabled={mutation.isPending}
                        onClick={() => onProviderSignUp("github")}
                        variant="outline"
                        size="lg"
                        className="w-full relative">
                        <FaGithub />
                        Continue with Github
                    </Button>
                    <Button
                        disabled={mutation.isPending}
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