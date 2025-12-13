import type { UserDTO } from "../shared/types/dto";
import { axiosInstance } from "./axiosInstance";
import { HttpStatusCode } from "../shared/constants/constants";
import type { AxiosResponse } from "axios";
import type { ApiResponse, User } from "../shared/types/types";
import { extractApiError } from "../utils";
class AuthAPI {
  async register(data: UserDTO): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> =
        await axiosInstance.post("/api/register", data);
      if (response.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw new Error("Unexepected Server Response");
    } catch (error) {

      throw new Error(extractApiError(error));
    }
  }

  async verifyOtp (otp: string, email: string): Promise<ApiResponse<User>> {
    try {
        console.log(otp, email)
        const response: AxiosResponse<ApiResponse<User>> = 
        await axiosInstance.post(`/api/verify-otp?email=${email}&otp=${otp}`);
        console.log(response)
        if(response.status === HttpStatusCode.OK) {
            return response.data
        }
        throw new Error("Unexpected Server Response");
    } catch (error) {
        throw new Error(extractApiError(error));
    }
  }

  async resentOtp (email: string): Promise<ApiResponse<string>> {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await axiosInstance.post(`/api/resend-otp/${email}`);
      if(response.status === HttpStatusCode.OK) {
        return response.data
      }
      throw new Error("Unexpected Server Response");
    } catch (error) {
      throw new Error(extractApiError(error));
    }
  }
}

export const authAPI = new AuthAPI();
