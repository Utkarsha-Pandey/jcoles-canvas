import {useMutation , useQueryClient} from "@tanstack/react-query"
import { InferRequestType , InferResponseType } from "hono"

import {client} from "@/lib/hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.projects["$post"] , 200>;
type RequestType = InferRequestType<typeof client.api.projects["$post"]>["json"];

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.projects.$post({json});

            if(!response.ok){
                throw new Error("Something went wrong");
            }
            return await response.json();
        },

        onSuccess: () => {
            toast.success("Projects successfully created. Redirecting...");
            queryClient.invalidateQueries({queryKey: ["project"]})
        },
        
        onError: () => {
          toast.error("Failed to create project");
        }
    });

    return mutation;
}