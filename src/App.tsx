import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

// Pages
import Root from "./pages/Onboarding";
import Home from "./pages/Home";
import Login from "./pages/Login";
// Cmponents
import ProtectedRoute from "./components/ProtectedRoute";

// Redux
import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "./utils/helpersFetchers/user/getCurrent";

// Styles
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
        {/* <Route path="/register" element={<Register />} /> */}
        <Route
          element={<ProtectedRoute redirectTo="/login" queryData={queryData} />}
        >
          <Route path="/home" element={<Home />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;