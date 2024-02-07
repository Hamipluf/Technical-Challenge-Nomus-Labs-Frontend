import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./pages/Onboarding";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "./utils/helpersFetchers/user/getCurrent";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";

const App: React.FC = () => {
  const token = localStorage.getItem("jwt");
  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
    enabled: !!token,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={<ProtectedRoute redirectTo="/login" queryData={queryData} />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
