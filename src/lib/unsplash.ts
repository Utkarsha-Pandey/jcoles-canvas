import { createApi } from "unsplash-js";

export const unsplash = createApi({
    accessKey: process.env.NEXT_UNSPLASH_PUBLIC_ACCESS_KEY!,
    fetch: fetch,

});

