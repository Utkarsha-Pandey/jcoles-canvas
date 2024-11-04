import { Hono } from "hono";

const DEFAULT_COUNT = 50;
const DEFAULT_COLLECTION_IDS = [""]
const app = new Hono()
    .get("/" , async(c) => {
        return c.json({data : {images : []}});
    })
    

export default app;