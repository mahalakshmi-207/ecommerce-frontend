import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();

  // Authentication check
  if (!user?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based protection
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;