import React from "react";
import SideBar from "../components/layout/SideBar";
import Feed from "../components/users/Feed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <Feed />
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

export default Home;
