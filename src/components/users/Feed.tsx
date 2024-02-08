import React, { useState, useEffect, useMemo } from "react";
import { getFeed } from "../../utils/helpersFetchers/posts/getFeed";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import LikeButton from "../layout/LikeButtom";
import CommentButton from "../comment/CommentButton";
import SearchUser from "./SearchUsers";
import { searchUserByUsername } from "../../utils/helpersFetchers/user/searchUserByUsername";
import { useDebouncedCallback } from "use-debounce";
import { currentUser, user } from "../../utils/interfaces/user";
import SkeletonLoader from "../layout/SkeletonLoader";
import CreatePost from "../post/CreatePost";
import DeletePostButton from "../post/DeletePostButton";
import { getCurrent } from "../../utils/helpersFetchers/user/getCurrent";
import { toast } from "react-toastify";
import {
  dataUpdatePost,
  updatePost as updatePostInteface,
} from "../../utils/interfaces/posts";
import { updatePost as updatePostFn } from "../../utils/helpersFetchers/posts/updatePost";

const Feed: React.FC = () => {
  const queryClient = useQueryClient();
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatePost, setUpdatePost] = useState("");
  const [editPostId, setEditPostId] = useState<number | undefined>(undefined);
  const [userFound, setUserFound] = useState<user[]>([]);
  const limit = 10;
  const { data: currentData } = useQuery<currentUser>({
    queryKey: ["current"],
    queryFn: getCurrent,
  });
  const { isLoading, data: feedItems } = useQuery({
    queryKey: ["feed", limit, offset],
    queryFn: getFeed,
    refetchOnWindowFocus: true,
  });

  const { data: searchResults, isLoading: loadingSearchUser } = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: searchUserByUsername,
    enabled: !!searchQuery,
  });

  const editPostMutation = useMutation({
    mutationKey: ["edit-post"],
    mutationFn: updatePostFn,
    onSuccess: (data: dataUpdatePost) => {
      !data.success && toast.error(data.message);
      if (data.success) {
        setEditPostId(undefined);
        setUpdatePost("");
        toast.success(data.message);
        // @ts-expect-error: Not have types
        queryClient.invalidateQueries("feed");
        // @ts-expect-error: Not have types
        queryClient.refetchQueries("feed");
      }
    },
  });

  useEffect(() => {
    if (searchResults?.success) {
      setUserFound(searchResults.data);
    } else {
      setUserFound([]);
    }
  }, [searchResults]);

  const handleUserSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
  }, 400);

  const handleLoadMore = () => {
    setOffset(offset + limit);
  };

  const hanleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatePost !== "" && editPostId) {
      const editPost: updatePostInteface = {
        newContent: updatePost,
        pid: editPostId,
      };
      editPostMutation.mutate(editPost);
    } else {
      toast.error("Need edit the post.");
    }
  };

  const renderSkeletons = () => {
    const skeletons = Array.from({ length: 5 }).map((_, index) => (
      <SkeletonLoader key={index} />
    ));
    return <>{skeletons}</>;
  };

  const renderFeedItems = useMemo(() => {
    if (!feedItems?.success) {
      return (
        <p className="text-xl font-bold text-error">{feedItems?.message}</p>
      );
    }

    return (
      <>
        {feedItems?.data.posts.map((item) => (
          <div key={item.id} className="p-4 my-2 w-11/12 bg-slate-700 ">
            <div className="flex w-full items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
                <div className="text-lg font-bold text-slate-50">
                  {item.username}
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-xs text-slate-400">
                  {new Date(item.created_at).toLocaleString()}
                </div>
                <div>
                  {currentData?.data.user.username === item.username && (
                    <div className="flex gap-x-4">
                      <DeletePostButton pid={item.id} />
                      <button
                        onClick={() =>
                          setEditPostId(
                            editPostId === item.id ? undefined : item.id
                          )
                        } // Toggle para establecer o eliminar el ID del post en edición
                        className="btn btn-square btn-sm btn-info"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-edit"
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
                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                          <path d="M16 5l3 3" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 mb-6">
              {editPostId == item.id ? (
                <>
                  <form onSubmit={(e) => hanleUpdatePost(e)}>
                    <div className="w-full px-3 mb-2 mt-2">
                      <textarea
                        className="bg-gray-100 text-gray-900 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                        value={updatePost}
                        onChange={(e) => setUpdatePost(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="w-full flex flex-row-reverse px-3">
                      {updatePost && (
                        <>
                          {editPostMutation.isPending ? (
                            <>
                              <span className="loading loading-ring loading-lg"></span>{" "}
                            </>
                          ) : (
                            <>
                              <input
                                type="submit"
                                className={`btn btn-info btn-sm`}
                                value="Edit"
                              />
                            </>
                          )}
                        </>
                      )}
                      <button
                        onClick={() => {
                          setEditPostId(undefined);
                          setUpdatePost("");
                        }}
                        className="btn btn-sm btn-error mx-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-sm text-slate-50">{item.content}</div>
              )}
            </div>
            <div className="">
              <div>
                <LikeButton postId={item.id} />
              </div>
              <div>
                <CommentButton postId={item.id} />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }, [feedItems, editPostId, updatePost]);

  const posts = feedItems?.data?.posts || [];

  return (
    <div className="w-3/4 mx-auto min-h-screen">
      <h1 className="text-2xl font-bold my-2">Feed</h1>
      <SearchUser
        onSearch={handleUserSearch}
        users={userFound}
        isLoading={loadingSearchUser}
      />
      <CreatePost />
      {isLoading && (
        <>
          <div className="flex flex-col gap-4 m-5">{renderSkeletons()}</div>
        </>
      )}
      {!isLoading && (
        <InfiniteScroll
          dataLength={posts.length || 0}
          next={handleLoadMore}
          hasMore={posts.length > limit * offset}
          loader={renderSkeletons()}
        >
          {renderFeedItems}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Feed;
