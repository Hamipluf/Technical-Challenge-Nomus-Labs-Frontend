import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectTo, children, queryData }: any) => {
  // Verifica si queryData es nulo o indefinido
  if (!queryData) {
    // Si no hay datos disponibles, puedes redirigir a una página de carga o hacer cualquier otra acción apropiada
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
