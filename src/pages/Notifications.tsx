import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getUreadNotification } from "../utils/helpersFetchers/notifications/getUnreadNotification";
import Sidebar from "../components/layout/SideBar";
import { notification } from "../utils/interfaces/notifications";
import { marReadNotifications } from "../utils/helpersFetchers/notifications/markReadNotifications";
import { toast, ToastContainer } from "react-toastify";
const Notifications: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: getUreadNotification,
    staleTime: 60000,
  });
  const marAsReadMutation = useMutation({
    mutationFn: marReadNotifications,
    onSuccess: (data) => {
      !data.success && toast.error(data.message);
      if (data.success) {
        toast.success(data.message);
        // @ts-expect-error: Not have types
        queryClient.invalidateQueries("notifications");
        // @ts-expect-error: Not have types
        queryClient.refetchQueries("notifications");
      }
    },
  });
  const handleClick = () => {
    marAsReadMutation.mutate();
  };
  return (
    <>
      <Sidebar />
      <div className="w-10/12 md:w-7/12 lg:6/12 mx-auto relative py-20">
        <h1 className="text-3xl text-left font-bold text-blue-500">
          Notificaciones {notifications?.data.length}
        </h1>
        <button
          onClick={() => handleClick()}
          className="btn btn-outline btn-wide btn-secondary mt-4"
        >
          Mark all as Read
        </button>
        {notifications?.success ? (
          <>
            {notifications.data.map((notification: notification) => {
              const createDate = new Date(notification.notification_created_at);
              return (
                <div className="border-l-2 mt-10">
                  <div className="flex items-center px-6 py-4 bg-blue-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                    <div className="w-5 h-5 bg-blue-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"></div>

                    <div className="w-10 h-1 bg-blue-300 absolute -left-10 z-0"></div>

                    <div className="flex-auto">
                      <h2 className="text-xl font-bold">
                        Type: {notification.type}
                      </h2>
                      <div>Post: {notification.post_content}</div>
                      {notification.comment_id && (
                        <div>Comment: {notification.comment_content}</div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-center text-white bg-slate-400 p-2 w-fit rounded-md">
                        {notification.is_read ? "Is Read" : "Is Unread"}
                      </div>
                      <div className="text-center text-white ">
                        <p>Created: {createDate.toDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p>No hay notificaciones</p>
        )}
      </div>
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
export default Notifications;
