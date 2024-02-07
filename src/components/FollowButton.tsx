import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { dataGetFollowers, follower } from "../utils/interfaces/user";
import { toast } from "react-toastify";
import { followUser } from "../utils/helpersFetchers/user/folowUser";
import { unfollowUser } from "../utils/helpersFetchers/user/unfollowUser";
import { getFollowers } from "../utils/helpersFetchers/user/getFollowers";

const FollowButton: React.FC<{ uid: number | undefined }> = ({ uid }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const queryClient = useQueryClient();
  const { data: dataFollowers } = useQuery<dataGetFollowers>({
    queryKey: ["followers", uid],
    queryFn: getFollowers,
    enabled: !!uid,
  });

  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: (data) => {
      !data.success && toast.error(data.message);
      if (data.success) {
        toast.success(data.message);
        // @ts-ignore
        queryClient.invalidateQueries("followers");
        // @ts-ignore
        queryClient.refetchQueries("followers");
      }
    },
  });
  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: (data) => {
      !data.success && toast.error(data.message);
      if (data.success) {
        toast.success(data.message);
        // @ts-ignore
        queryClient.invalidateQueries("followers");
        // @ts-ignore
        queryClient.refetchQueries("followers");
      }
    },
  });

  useEffect(() => {
    if (dataFollowers && dataFollowers.data) {
      const isFollowing = !!dataFollowers?.data?.find(
        (follower) => follower.user_id === uid
      );
      setIsFollowing(isFollowing);
    }
  }, [dataFollowers, uid]);

  const handleFollow = () => {
    if (uid) {
      followMutation.mutate(uid);
    } else {
      toast.error("Error Following.");
    }
  };
  const handleUnfollow = () => uid ? unfollowMutation.mutate(uid) : toast.error("Error Unfollowing.");

  return (
    <>
      {isFollowing ? (
        <button onClick={() => handleUnfollow()} className="btn btn-ghost">
          Unfollow
        </button>
      ) : (
        <button onClick={() => handleFollow()} className="btn btn-ghost">
          Follow
        </button>
      )}
    </>
  );
};

export default FollowButton;
