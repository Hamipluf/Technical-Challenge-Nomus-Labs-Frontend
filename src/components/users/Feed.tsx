import React, { useState, useEffect, useMemo } from "react";
import { getFeed } from "../../utils/helpersFetchers/posts/getFeed";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import LikeButton from "../layout/LikeButtom";
import CommentButton from "../comment/CommentButton";
import SearchUser from "./SearchUsers";
import { searchUserByUsername } from "../../utils/helpersFetchers/user/searchUserByUsername";
import { useDebouncedCallback } from "use-debounce";
import { user } from "../../utils/interfaces/user";
import SkeletonLoader from "../layout/SkeletonLoader";

const Feed: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [userFound, setUserFound] = useState<user[]>([]);
  const limit = 10;

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
        ))}
      </>
    );
  }, [feedItems]);
  const posts = feedItems?.data?.posts || [];
  return (
    <div className="w-3/4 mx-auto min-h-screen">
      <h1 className="text-2xl font-bold my-2">Feed</h1>
      <SearchUser
        onSearch={handleUserSearch}
        users={userFound}
        isLoading={loadingSearchUser}
      />
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
