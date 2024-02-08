import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createPost } from "../../utils/helpersFetchers/posts/createPost";
import useCreateNotification from "../../hooks/useCreateNotification";
import {
  createPost as createPostInterface,
  dataCreatePost,
} from "../../utils/interfaces/posts";
import { toast } from "react-toastify";
const CreatePost = () => {
  const queryClient = useQueryClient();
  const [postContent, setPostContent] = useState("");
  const { createNotification } = useCreateNotification();
  const createPostMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPost,
    onSuccess: (data: dataCreatePost) => {
      !data.success && toast.error(data.message);
      if (data.success) {
        toast.success(data.message);
        setPostContent("");
        createNotification(
          data.data.user_id,
          data.data.id,
          "Posted",
          undefined
        );
        // @ts-expect-error: Not have types
        queryClient.invalidateQueries("feed");
        // @ts-expect-error: Not have types
        queryClient.refetchQueries("feed");
      }
    },
  });
  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent) {
      const newPost: createPostInterface = {
        // @ts-ignore
        content: postContent,
      };
      createPostMutation.mutate(newPost);
    } else {
      toast.error("Write a post.");
    }
  };
  return (
    <div>
      <div className="flex  items-center justify-center m-4 w-full">
        <form
          onSubmit={(e) => handlerSubmit(e)}
          className="w-full rounded-lg px-4 pt-2"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="text-gray-900 text-lg bg-slate-300 px-3 rounded-md font-semibold">
              Post Something
            </h2>
            <div className="w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-gray-100 text-gray-900 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                name="body"
                placeholder="What are you thinking?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full flex flex-row-reverse px-3">
              {postContent && (
                <input
                  type="submit"
                  className="btn btn-info btn-sm"
                  value="Post Comment"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
