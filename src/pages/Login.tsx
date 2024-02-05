import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Components
import LoginForm from "../components/LoginForm";
// Helpers
import { getCurrent } from "../utils/helpersFetchers/user/getCurrent";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
    enabled: !!token, // Enables the request only if a token exists in localStorage
  });
  useEffect(() => {
    if (token && data?.success) {
      return navigate("/home");
    }
  }, [data, navigate]);

  return (
    <>
      <LoginForm loading={isLoading} />
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

export default Login;
