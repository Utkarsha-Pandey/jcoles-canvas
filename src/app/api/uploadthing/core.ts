import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {auth} from "@/auth"

const f = createUploadthing();


export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
        //TODO:Replace with next-auth    
      const session = await auth();
    
      if (!session) throw new UploadThingError("Unauthorized");

      return { url: session.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
