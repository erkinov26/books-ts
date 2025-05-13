// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = Cookies.get('user');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
