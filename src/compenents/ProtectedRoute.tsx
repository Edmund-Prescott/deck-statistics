import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  allow: React.ReactNode;
  deny: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allow, deny }) => {
  const { currentUser } = useAuth();

  return currentUser ? <>{allow}</> : <Navigate to={{ pathname: deny }} />;
};

export default ProtectedRoute;
