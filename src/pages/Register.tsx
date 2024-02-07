import React from "react";
// Components
import RegisterForm from "../components/layout/RegisterForm";
import { ToastContainer } from "react-toastify";

const Register: React.FC = () => {
  return (
    <>
      <RegisterForm />
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

export default Register;