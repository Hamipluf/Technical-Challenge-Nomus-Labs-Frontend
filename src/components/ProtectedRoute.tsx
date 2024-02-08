import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC<any> = ({ redirectTo, children, queryData }) => {
  if (!queryData) {
    return <Navigate to={redirectTo} replace />;
  }

  // Verifica si el token existe en queryData
  const tokenExists = queryData.data?.token;

  return tokenExists ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default ProtectedRoute;
