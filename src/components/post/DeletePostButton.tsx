import React from "react";
import { toast } from "react-toastify";
import { deletePost } from "../../utils/helpersFetchers/posts/deletePost";
import { dataDeletePost } from "../../utils/interfaces/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const DeletePostButton: React.FC<{
  pid: number;
}> = ({ pid }) => {
  const queryClient = useQueryClient();
  const deletPostMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePost,
    onSuccess: (data: dataDeletePost) => {
      !data.success && toast.error(data.message);
      if (data.success) {
        toast.success(data.message);
        // @ts-expect-error: Not have types
        queryClient.invalidateQueries("feed");
        // @ts-expect-error: Not have types
        queryClient.refetchQueries("feed");
      }
    },
  });
  const handleDeletePost = () => {
    if (pid) {
      deletPostMutation.mutate(pid);
    } else {
      toast.error("Cant delete this post.");
    }
  };
  return (
    <button
      className="btn btn-square btn-sm btn-error"
      onClick={() => handleDeletePost()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-trash"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </button>
  );
};

export default DeletePostButton;
