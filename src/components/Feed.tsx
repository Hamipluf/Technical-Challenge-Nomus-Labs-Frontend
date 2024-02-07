import React, { useState, useEffect } from "react";
import { getFeed } from "../utils/helpersFetchers/posts/getFeed";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import LikeButton from "../components/LikeButtom";
import SearchUser from "./SearchUsers";
import { searchUserByUsername } from "../utils/helpersFetchers/user/searchUserByUsername";
import { useDebouncedCallback } from "use-debounce";
import { user } from "../utils/interfaces/user";
import CommentButton from "./CommentButton";
const Feed: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [userFound, setUserFound] = useState<user[]>();
  const {
    isLoading,
    error,
    data: feedItems,
  } = useQuery({
    queryKey: ["feed", limit, offset],
    queryFn: getFeed,
    refetchOnWindowFocus: true,
  });
  const { data: searchResults, isLoading: loadingSearhcUser } = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: searchUserByUsername,
    enabled: !!searchQuery,
  });

  useEffect(() => {
    if (searchResults?.success) {
      setUserFound(searchResults?.data);
    } else {
      setUserFound([]);
    }
  }, [searchResults]);

  const handleUserSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
  }, 400);

  const handleLoadMore = () => {
    const totalDocuments = feedItems?.data?.posts.length || 0;
    if (totalDocuments) {
      // No more documents, disable loading
      return;
    }
    setOffset(offset + limit);
  };

  return (
    <div className="w-3/4 mx-auto min-h-screen">
      <h1 className="text-2xl font-bold my-2">Feed</h1>

      <SearchUser
        onSearch={handleUserSearch}
        users={userFound}
        isLoading={loadingSearhcUser}
      />

      {isLoading && (
        <>
          <div className="flex flex-col gap-4 m-5">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>{" "}
          <div className="flex flex-col gap-4 m-5 my-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </>
      )}
      {!feedItems?.success && (
        <>
          <p className="text-xl font-bold text-error">{feedItems?.message}</p>
        </>
      )}
      {feedItems?.success && (
        <InfiniteScroll
          dataLength={feedItems?.data.posts.length || 0}
          next={handleLoadMore}
          hasMore={feedItems?.data.posts.length > limit * offset}
          loader={false}
        >
          {feedItems?.data.posts.map((item) => {
            const createdAt = new Date(item.created_at);
            return (
              <div key={item.id} className="p-4 my-2 w-11/12 bg-slate-700 ">
                <div className="flex w-full items-center justify-between border-b pb-3 ">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
                    <div className="text-lg font-bold text-slate-50">
                      {item.username}
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-xs text-slate-400">
                      {createdAt.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 mb-6">
                  <div className="text-sm text-slate-50">{item.content}</div>
                </div>

                <div>
                  <div className="">
                    <div>
                      <LikeButton postId={item.id} />
                    </div>
                    <div>
                      <CommentButton postId={item.id} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Feed;
