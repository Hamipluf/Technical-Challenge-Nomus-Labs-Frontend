import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getImage from "../../utils/helpersFetchers/user/getImage";
import HoverableImage from "./HoverableImage";
import { responseGetImage } from "../../utils/interfaces/user";

const ProfileImage: React.FC<{
  width: string;
  height: string;
  hover: boolean;
}> = ({ width, height, hover }) => {
  const queryClient = useQueryClient();
  const [isHover, setHover] = useState(false);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const { data, isLoading, isFetching } = useQuery<responseGetImage, boolean>({
    queryKey: ["profile-image"],
    queryFn: getImage,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data?.data && data.data !== previousUrl) {
      setPreviousUrl(data.data);
      //@ts-ignore
      queryClient.refetchQueries("profile-image");
      //@ts-ignore
      queryClient.invalidateQueries("profile-image");
    }
  }, [data?.data, previousUrl, queryClient]);


  const handleHover = () => {
    setHover(!isHover);
  };

  return (
    <>
      {isLoading || !data?.data || isFetching ? (
        <div
          className={`w-${width} h-${height} border-4 border-white rounded-full overflow-hidden relative inline-block`}
        >
          <div
            className="skeleton w-full h-full rounded-full shrink-0"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          ></div>
        </div>
      ) : (
        <>
          {data.success ? (
            <HoverableImage
              width={width.toString()}
              height={height.toString()}
              hover={hover}
              imageSrc={data.data}
              alt="Profile"
            />
          ) : (
            <HoverableImage
              width={width.toString()}
              height={height.toString()}
              hover={hover}
              alt="Profile"
            />
          )}
        </>
      )}
    </>
  );
};

export default ProfileImage;
