import { Hono } from "hono";
import { handle } from "hono/vercel";
import user from "./user";
import images from "./images"
import users from "./users"
import test from "./test"
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";
import { Context } from "hono";

export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
    const secret = process.env.AUTH_SECRET || c.env?.AUTH_SECRET;

    if (!secret) {
        throw new Error("AUTH_SECRET is not defined!");
    }

    return {
        secret,
        ...authConfig
    } as AuthConfig; 
}

const app = new Hono().basePath("/api");

app.use("*" , initAuthConfig(getAuthConfig));


const routes = app
    .route("/user", user)
    .route("/test" , test)
    .route("/images", images)
    .route("/users" , users)

//const routes = app.route("/user" , user).route("/profile" , profile); ==>>> for adding more routes.

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
