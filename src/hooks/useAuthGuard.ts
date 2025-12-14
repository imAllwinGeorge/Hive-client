import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export const useAuthGuard = ({
  requireAuth = true,
  adminOnly = false,
} = {}) => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isBlocked } = useAuth();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (adminOnly && !isAdmin) {
      navigate("/", { replace: true });
      return;
    }

    if (isBlocked) {
      navigate("/blocked", { replace: true });
    }
  }, [requireAuth, adminOnly, isAuthenticated, isAdmin, isBlocked, navigate]);
};
