import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// Helepers
import getImage from "../utils/helpersFetchers/user/getImage";
import HoverableImage from "./HoverableImage";

const ProfileImage: React.FC<{
  width: string;
  height: string;
  hover: boolean;
}> = ({ width, height, hover }) => {
  const [isHover, setHover] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["profile-image"],
    queryFn: getImage,
  });


  const handleHover = () => {
    setHover(!isHover);
  };
  return (
    <>
      {isLoading || !data?.data ? (
        <>
          <div className="relative inline-block ">
            <div
              className={`w-${width} h-${height} border-4 border-white rounded-full overflow-hidden `}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              <div className="skeleton w-full h-full rounded-full shrink-0"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <HoverableImage
            width={width}
            height={height}
            hover={hover}
            imageSrc={data.data}
            alt="Profile"
          />
        </>
      )}
    </>
  );
};

export default ProfileImage;
