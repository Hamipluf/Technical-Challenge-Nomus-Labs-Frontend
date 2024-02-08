import React, { useState } from "react";


const HoverableImage: React.FC<{
  imageSrc?: string;
  alt: string;
  width: string;
  height: string;
  hover: boolean;
}> = ({ imageSrc, alt, width, height, hover }) => {
  const [isHover, setHover] = useState(false);

  const handleHover = () => {
    hover ? setHover(!isHover) : null;
  };

  return (
    <div
      className={`relative inline-block ${hover ? "hover:cursor-pointer" : ""}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div
        className={`w-${width} h-${height}  border-4 border-white rounded-full overflow-hidden ${
          isHover ? "bg-white bg-opacity-75 z-10" : "bg-inherit"
        }`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={alt}
            className={`w-${width} h-${height} object-cover`}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-user"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        )}
        {isHover && (
          <div
            onClick={() =>
              // @ts-ignore
              document
                .getElementById("my_modal_upload_proile")
                // @ts-ignore
                .showModal()
            }
            className={`absolute inset-0 flex justify-center items-center bg-opacity-50 z-10 bg-white w-${width} h-${height} border-4 border-white rounded-full overflow-hidden`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-edit text-gray-800"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoverableImage;
