import type { UserDTO } from "../shared/types/dto";
import { axiosInstance } from "./axiosInstance";
import { HttpStatusCode } from "../shared/constants/constants";
import type { AxiosResponse } from "axios";
import type { ApiResponse, LoginResponse, User } from "../shared/types/types";
import { extractApiError } from "../utils";
import { errorMessages } from "../shared/constants/config";
import { API_ROUTES } from "../shared/constants/apiRoutes";
class AuthAPI {
  async register(data: UserDTO): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> =
        await axiosInstance.post(API_ROUTES.AUTH.register, data);
      if (response.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw new Error(errorMessages.unexpectedError);
    } catch (error) {
      throw new Error(extractApiError(error));
    }
  }

  async verifyOtp(otp: string, email: string): Promise<User> {
    try {
      console.log(otp, email);
      const response: AxiosResponse<LoginResponse> =
        await axiosInstance.post(API_ROUTES.AUTH.verifyOtp(email,otp));
      console.log(response);
      if (response.status === HttpStatusCode.CREATED) {
        return response.data.user
      }
      throw new Error(errorMessages.unexpectedError);
    } catch (error) {
      throw new Error(extractApiError(error));
    }
  }

  async resentOtp(email: string): Promise<ApiResponse<string>> {
    try {
      const response: AxiosResponse<ApiResponse<string>> =
        await axiosInstance.post(API_ROUTES.AUTH.resendOtp(email));
      if (response.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw new Error(errorMessages.unexpectedError);
    } catch (error) {
      throw new Error(extractApiError(error));
    }
  }

  async login(data: {email: string; password: string}): Promise<User> {
    try {
      const response: AxiosResponse<LoginResponse> =
        await axiosInstance.post(API_ROUTES.AUTH.login, data);
        console.log(response);
      if (response.status === HttpStatusCode.OK) {
          return response.data.user
      }

      throw new Error(errorMessages.unexpectedError);
    } catch (error) {
      throw new Error(extractApiError(error));
    }
  }

  async logout(): Promise<ApiResponse<null>> {
    try {
      const response: AxiosResponse<ApiResponse<null>> =
      await axiosInstance.post(API_ROUTES.AUTH.logout);

      if(response.status === HttpStatusCode.OK) {
        return response.data
      }
      throw new Error(errorMessages.unexpectedError);
    } catch (error) {
      throw new Error(extractApiError(error));
    }
  } 
}

export const authAPI = new AuthAPI();
