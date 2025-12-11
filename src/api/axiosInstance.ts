import axios from "axios";
import { config } from "../shared/constants/config";

export const axiosInstance = axios.create({
    baseURL: config.VITE_API_BASE_URL,
    withCredentials: true,
})


axiosInstance.interceptors.response.use((response) => {
    return response;
},
async (error) => {
    console.log(error);
})