import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute= ({ redirectTo, children, queryData }: any) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    // If no token is present, redirect to login page
    return <Navigate to={redirectTo} replace />;
  }

  return queryData?.data?.token ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <>{queryData ? <Navigate to={redirectTo} replace /> : null}</>
  );
};

export default ProtectedRoute;
