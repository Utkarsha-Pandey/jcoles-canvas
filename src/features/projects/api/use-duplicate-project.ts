import {useMutation , useQueryClient} from "@tanstack/react-query"
import { InferRequestType , InferResponseType } from "hono"

import {client} from "@/lib/hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.projects[":id"]["duplicate"]["$post"] , 200>;
type RequestType = InferRequestType<typeof client.api.projects[":id"]["duplicate"]["$post"]>["param"];

export const useDuplicateProject = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (param) => {
            const response = await client.api.projects[":id"].duplicate.$post({ param });

            if(!response.ok){
                throw new Error("Failed to duplicate project");
            }
            return await response.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["project"]}); 
            toast.success("Successfully created a copy");
        },
        onError: () => {
          toast.error("Failed to duplicate project");
        }
    });

    return mutation;
}