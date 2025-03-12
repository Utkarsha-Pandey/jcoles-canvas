import { useSubcriptionModal } from "../store/use-subscription-modal";

export const usePaywall =() =>{
    const subscriptionModal = useSubcriptionModal();

    const shouldBlock = true;

    return {
        isLoading:false,
        shouldBlock,
        triggerPaywall: ()=>{
            subscriptionModal.onOpen();
        },
    };
};