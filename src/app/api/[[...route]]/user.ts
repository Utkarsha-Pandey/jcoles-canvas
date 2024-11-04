import { Hono } from "hono";

const app = new Hono()
    .get("/", (c) => {
        return c.json({ user: "working" }, 200);
    })
    .get("/:userid", (c) => {
        const params = c.req.param();
        return c.json({ userid: params }, 200);
    });

export default app;
