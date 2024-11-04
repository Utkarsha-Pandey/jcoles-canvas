import { Hono } from "hono";
import { handle } from "hono/vercel";
import user from "./user";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");
const routes = app.route("/user", user);

//const routes = app.route("/user" , user).route("/profile" , profile); ==>>> for adding more routes.

export const GET = handle(app);
export type AddType = typeof routes;
