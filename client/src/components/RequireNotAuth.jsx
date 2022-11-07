import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function RequireNotAuth({ children }) {
  const { authed } = useAuth();

  return authed ? <Navigate to="/home" replace /> : children;
}
