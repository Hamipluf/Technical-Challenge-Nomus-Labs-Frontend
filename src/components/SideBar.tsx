import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../components/ProfileImage";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="fixed top-0 z-40 ">
      <div
        className={`${
          isSidebarOpen && "translate-x-40"
        } transition transform ease-in-out duration-1000 hover:cursor-pointer flex flex-row-reverse`}
      >
        <div className="my-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <ProfileImage width="12" height="12" hover={false} />
        </div>
      </div>
      <aside
        className={`w-52 ${
          isSidebarOpen ? "" : "-translate-x-40"
        } fixed transition transform ease-in-out duration-1000 flex h-screen bg-[#1E293B] rounded-md`}
      >
        <ul className="flex-1 overflow-y-auto">
          {/* Dashboard */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4 ">
            <Link to="/dashboard">
              {isSidebarOpen ? (
                <>
                  <p className="text-sm flex gap-3 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-layout-dashboard"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M4 4h6v8h-6z"></path>
                      <path d="M4 16h6v4h-6z"></path>
                      <path d="M14 12h6v8h-6z"></path>
                      <path d="M14 4h6v4h-6z"></path>
                    </svg>
                    Dashboard
                  </p>
                </>
              ) : (
                <>
                  <p className="translate-x-40 transition-all ease-out duration-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-layout-dashboard "
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M4 4h6v8h-6z"></path>
                      <path d="M4 16h6v4h-6z"></path>
                      <path d="M14 12h6v8h-6z"></path>
                      <path d="M14 4h6v4h-6z"></path>
                    </svg>
                  </p>
                </>
              )}
            </Link>
          </li>
          {/* Home */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4  ">
            {isSidebarOpen ? (
              <>
                <p className="text-sm flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-home"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                  </svg>
                  Home
                </p>
              </>
            ) : (
              <>
                <p className="translate-x-40 transition-all ease-out duration-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-home"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                  </svg>
                </p>
              </>
            )}
          </li>
          {/* Notificaciones */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4  ">
            <Link to={"/notifications"}>
              {isSidebarOpen ? (
                <>
                  <p className="text-sm flex gap-3">
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
                    Horarios
                  </p>
                </>
              ) : (
                <p className="translate-x-40 transition-all ease-out duration-700">
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
                </p>
              )}
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
