import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const isAuthenticated = Boolean(user);
  const isAdmin = Boolean(user?.isAdmin);
  const isBlocked = Boolean(user?.isBlocked);

  return {
    user,
    isAuthenticated,
    isAdmin,
    isBlocked,
  };
};
