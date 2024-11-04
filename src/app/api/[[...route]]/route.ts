import { Hono } from "hono";
import { handle } from "hono/vercel";
import user from "./user";
import images from "./images"

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app
    .route("/user", user)
    .route("/images", images)

//const routes = app.route("/user" , user).route("/profile" , profile); ==>>> for adding more routes.

export const GET = handle(app);
export type AppType = typeof routes;
