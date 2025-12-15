import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, isBlocked } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
