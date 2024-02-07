// useCreateNotification.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotification } from "../utils/helpersFetchers/notifications/createNotification";
import { toast } from "react-toastify";

const useCreateNotification = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: ["create-notification"],
    mutationFn: createNotification,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        // @ts-ignore
        queryClient.invalidateQueries("notifications");
        // @ts-ignore
        queryClient.refetchQueries("notifications");
      }
    },
  });

  const createNotificationFunc = (
    senderId: number,
    postId: number,
    type: string,
    commentId?: number 
  ) => {
    createMutation.mutate({ senderId, postId, type, commentId });
  };

  return {
    createNotification: createNotificationFunc,
    isError: createMutation.isError,
    error: createMutation.error,
  };
};

export default useCreateNotification;
