import React, { useState } from "react";
import { user } from "../../utils/interfaces/user";
import FollowButton from "../layout/FollowButton";
interface UserSearchProps {
  onSearch: (query: string) => void;
  users: user[] | undefined;
  isLoading: boolean;
}

const UserSearch: React.FC<UserSearchProps> = ({
  onSearch,
  users,
  isLoading,
}) => {
  const [query, setQuery] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="bg-slate-600 flex items-start p-3 rounded-md gap-x-5">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-md text-slate-900 focus:outline-none"
            type="search"
            name="search"
            onChange={handleInputChange}
            value={query}
            placeholder="Search users"
          />
          {isLoading && (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </div>
        <div className="m-2 overflow-auto absolute top-24 h-60 z-10">
          {users && users.length > 0 && (
            <div className="">
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <div className="w-full h-full px-4 xl:px-8 pt-3 pb-5 bg-gray-500 ">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="mr-4 w-12 h-12 rounded shadow">
                            <img
                              className="w-full h-full overflow-hidden object-cover object-center rounded"
                              src="https://tuk-cdn.s3.amazonaws.com/assets/components/popovers/p_1_0.png"
                              alt="avatar"
                            />
                          </div>
                          <div>
                            <h3 className="mb-2 sm:mb-1 text-slate-100 text-base font-normal leading-4">
                              {user.username}
                            </h3>
                          </div>
                        </div>
                        <FollowButton uid={user.id} />
                      </div>
                      <hr className="my-5 border-t border-gray-200" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserSearch;
