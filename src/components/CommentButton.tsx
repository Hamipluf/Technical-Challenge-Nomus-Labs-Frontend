import React, { useState } from "react";
import { getCommentOfPost } from "../utils/helpersFetchers/comments/getCommentOfPost";
import {
  getCommentOfPost as getCommentPostInterface,
  comment,
} from "../utils/interfaces/comments";
import { addComment } from "../utils/helpersFetchers/comments/addComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import '../index.css'

const CommentButton: React.FC<{ postId: number }> = ({ postId }) => {
  const queryClient = useQueryClient();
  const [add, setAdd] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [show, setShow] = useState(false);

  const { data: dataComment } = useQuery<getCommentPostInterface>({
    queryKey: ["comments", postId],
    queryFn: getCommentOfPost,
    enabled: !!postId,
  });

  const commentMutation = useMutation({
    mutationKey: ["commentAdded"],
    mutationFn: addComment,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data);
        toast.error(data.message);
      } else {
        toast.success(data.message);
        // @ts-ignore
        queryClient.invalidateQueries("comments");
        // @ts-ignore
        queryClient.refetchQueries("comments");
        setCommentContent(""); // Clean de textarea after comment
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error to post comment.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postId && commentContent) {
      const newComment = {
        content: commentContent,
        pid: postId,
      };
      commentMutation.mutate(newComment);
    } else {
      toast.error("Need write a comment to post it.");
    }
  };

  return (
    <>
      <div
        className={`${
          add ? "flex flex-col items-start justify-end" : ""
        } w-full`}
      >
        <button
          onClick={() => setShow(!show)}
          className="flex cursor-pointer items-center transition hover:text-slate-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1.5 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <span>{dataComment?.data?.length || 0}</span>
        </button>

        {show && (
          <>
            <button
              onClick={() => setAdd(!add)}
              className="btn md:btn-wide m-2 btn-outline btn-primary btn-xs"
            >
              Comment
            </button>
            {add && (
              <>
                <form
                  className="m-2 w-full bg-white rounded-lg px-4 pt-2"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-2 mt-2">
                      <textarea
                        className="bg-gray-100 text-slate-800 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="body"
                        placeholder="Write your comment..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex items-start px-3">
                      <div className="-mr-1">
                        <input
                          type="submit"
                          className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                          value="Post comment"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
            <div className="h-60 overflow-auto w-11/12 mx-5 scrollbar">
              {dataComment?.data && dataComment?.data.length > 0 ? (
                dataComment.data.map((comment: comment) => {
                  const createdDate = new Date(comment.created_at);
                  return (
                    <div
                      key={comment.id}
                      className="grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg w-full mt-2 "
                    >
                      <div className=" flex gap-4">
                        <img
                          src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                          className=" bg-white border h-10 w-10"
                          alt="profile avatar"
                          loading="lazy"
                        />
                        <div className="flex flex-col w-full">
                          <div className="flex flex-row justify-between">
                            <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                              {comment.commenter_username}
                            </p>
                            <a className="text-gray-500 text-xl" href="#">
                              <i className="fa-solid fa-trash"></i>
                            </a>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {createdDate.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="-mt-4 text-gray-500">{comment.content}</p>
                    </div>
                  );
                })
              ) : (
                <>
                  <p className="fon-bold text-xl text-red-400">
                    No comment yet
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CommentButton;

{
  /* 

        </button>
       
      */
}
