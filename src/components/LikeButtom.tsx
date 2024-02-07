import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../utils/helpersFetchers/posts/likePost";
import { unlikePost } from "../utils/helpersFetchers/posts/unlikePost";
import { toast } from "react-toastify";
import { getLikesOfPost } from "../utils/helpersFetchers/posts/getLikesOfPost";
import { useQuery } from "@tanstack/react-query";
import { getLikesOfPost as getLikePostInterface } from "../utils/interfaces/posts";

interface LikeButtonProps {
  postId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
  const uid = localStorage.getItem("uid");
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);

  const { data: dataPost } = useQuery<getLikePostInterface>({
    queryKey: ["likesOfPosts", postId],
    queryFn: getLikesOfPost,
    enabled: !!postId,
  });


  const likeMutation = useMutation({
    mutationKey: ["like"],
    mutationFn: likePost,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data);
        toast.error(data.message);
      } else {
        // @ts-ignore
        queryClient.invalidateQueries("likesOfPosts");
        // @ts-ignore
        queryClient.refetchQueries("likesOfPosts");
        setLiked(true);
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error to Like");
    },
  });

  const unlikeMutation = useMutation({
    mutationKey: ["unlike", postId],
    mutationFn: unlikePost,
    onSuccess: (data: any) => {
      if (!data.success) {
        console.error(data);
        toast.error(data.message);
      } else {
        setLiked(false);
        // @ts-ignore
        queryClient.invalidateQueries("likesOfPosts");
        // @ts-ignore
        queryClient.refetchQueries("likesOfPosts");
      }
    },
    onError: () => toast.error("Error to unloke"),
  });

  const handleLike = () => {
    if (liked && postId) {
      unlikeMutation.mutate(postId);
    }
    if (!liked && postId) {
      likeMutation.mutate(postId);
    }
  };

  return (
    <button onClick={() => handleLike()}>
      {liked ? (
        <div className="flex cursor-pointer items-center transition hover:text-slate-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-thumb-up-filled"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M13 3a3 3 0 0 1 2.995 2.824l.005 .176v4h2a3 3 0 0 1 2.98 2.65l.015 .174l.005 .176l-.02 .196l-1.006 5.032c-.381 1.626 -1.502 2.796 -2.81 2.78l-.164 -.008h-8a1 1 0 0 1 -.993 -.883l-.007 -.117l.001 -9.536a1 1 0 0 1 .5 -.865a2.998 2.998 0 0 0 1.492 -2.397l.007 -.202v-1a3 3 0 0 1 3 -3z"
              strokeWidth="0"
              fill="currentColor"
            />
            <path
              d="M5 10a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7a2 2 0 0 1 1.85 -1.995l.15 -.005h1z"
              strokeWidth="0"
              fill="currentColor"
            />
          </svg>
          <span>{dataPost?.success ? dataPost.data.length : 0}</span>
        </div>
      ) : (
        <div className="flex cursor-pointer items-center transition hover:text-slate-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-thumb-up"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
          </svg>
          <span>{dataPost?.success ? dataPost.data.length : 0}</span>
        </div>
      )}
    </button>
  );
};

export default LikeButton;
