import axios from "axios";
import { config } from "../shared/constants/config";
import { HttpStatusCode } from "../shared/constants/constants";
import { store } from "../store";
import { logout } from "../features/auth/authSlice";
import { API_ROUTES } from "../shared/constants/apiRoutes";

export const axiosInstance = axios.create({
  baseURL: config.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === HttpStatusCode.UNAUTHORIZED) {
      if (error.config && !error.config._retry) {
        try {
            const url = error.config.url
            await axiosInstance.post(API_ROUTES.AUTH.refreshToken);
            return axiosInstance(url);
        } catch (error) {
          window.location.href = "/login";
          localStorage.removeItem("persist:auth");
          store.dispatch(logout());
          return Promise.reject(error);
        }
      }
    }
    console.log(error);
    return Promise.reject(error);
  }
);
