import React from "react";
import { getCurrent } from "../utils/helpersFetchers/user/getCurrent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  currentUser,
  dataChangePrivacity,
  responseUploadImage,
} from "../utils/interfaces/user";
import ProfileImage from "../components/users/ProfileImage";
import { Link } from "react-router-dom";
import uploadImage from "../utils/helpersFetchers/user/uploadProfilePicture";
import { changePrivacity } from "../utils/helpersFetchers/user/changePrivacity";
import { toast, ToastContainer } from "react-toastify";
const ProfileUser: React.FC = () => {
  const token = localStorage.getItem("jwt");
  const queryClient = useQueryClient();

  const { data: user } = useQuery<currentUser>({
    queryKey: ["user"],
    queryFn: getCurrent,
    enabled: !!token,
  });

  const changePrivacityMutation = useMutation({
    mutationKey: ["privacity"],
    mutationFn: changePrivacity,
    onSuccess: (data: dataChangePrivacity) => {
      !data.success && toast.error(data.message);
      if (data.success) {
        toast.success(data.message);

        // @ts-expect-error: Not have types
        queryClient.invalidateQueries("user");
        // @ts-expect-error: Not have types
        queryClient.refetchQueries("user");
      }
    },
  });
  const uploadImageMutation = useMutation({
    mutationKey: ["upload-profile-image"],
    mutationFn: uploadImage,
    onSuccess: (data: responseUploadImage) => {
      if (!data.success) {
        console.error(data);
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        //@ts-ignore
        queryClient.refetchQueries("profile-image");
        //@ts-ignore
        queryClient.invalidateQueries("profile-image");
        // @ts-ignore
        document.getElementById("my_modal_upload_proile").close();
      }
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const fileInput = e.target[0];
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("profilePicture", file);
      uploadImageMutation.mutate(formData);
    } else {
      toast.error("Please select a file.");
    }
  };
  const handleChangePrivacity = (privacity: boolean) =>
    changePrivacityMutation.mutate(privacity);

  return (
    <>
      <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
        <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
          <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
            Dashboard<span className="text-indigo-400">.</span>
          </h1>
          <p className="text-slate-400 text-sm mb-2">Welcome back,</p>
          <div className="flex flex-col space-y-2 md:space-y-0 h- md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
            <div
              onClick={() =>
                // @ts-ignore
                document.getElementById("my_modal_upload_proile").showModal()
              }
            >
              <ProfileImage width="24" height="14" hover={true} />
            </div>
            <div>
              <p className="font-medium group-hover:text-indigo-400 leading-4">
                {user?.data.user.username}
              </p>
              <span className="text-sm font-bold text-s text-slate-400">
                {user?.data.user.is_private ? "Private User" : "Public User"}
              </span>
            </div>
          </div>
          <hr className="my-2 border-slate-700" />
          <div id="menu" className="flex flex-col space-y-2 my-5">
            <Link
              to="/home"
              className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
            >
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-indigo-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                    Home
                  </p>
                  <p className="text-slate-400 text-sm hidden md:block">
                    See your Feed
                  </p>
                </div>
              </div>
            </Link>
            <Link
              to="/notifications"
              className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
            >
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-bell-filled"
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
                    <path
                      d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z"
                      strokeWidth="0"
                      fill="currentColor"
                    />
                    <path
                      d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z"
                      strokeWidth="0"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                    Notifications
                  </p>
                  <p className="text-slate-400 text-sm hidden md:block">
                    See yours notifications
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
          <div>
            <h2 className="font-bold py-4 uppercase">
              {user && user.data.user.is_private
                ? "Private User"
                : "Public User"}
            </h2>
            <div className="flex items-center justify-start gap-4">
              <button
                onClick={() => handleChangePrivacity(true)}
                disabled={changePrivacityMutation.isPending}
                className={`${
                  user && user.data.user.is_private
                    ? "btn btn-primary"
                    : "btn btn-outline"
                }`}
              >
                Private User
              </button>

              <button
                onClick={() => handleChangePrivacity(false)}
                disabled={changePrivacityMutation.isPending}
                className={`${
                  user && user.data.user.is_private
                    ? "btn btn-outline"
                    : "btn btn-primary"
                }`}
              >
                Public User
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_upload_proile" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className=" flex flex-col gap-5"
          >
            <h3 className="font-bold text-lg">
              Select your new profile image.
            </h3>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <button className="btn btn-outline btn-primary">
              {uploadImageMutation.isPending ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                "Upload"
              )}
            </button>
          </form>
        </div>
      </dialog>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default ProfileUser;
