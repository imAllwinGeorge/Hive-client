import type { AxiosResponse } from "axios";
import type { BlogPost, BlogReponses, HomeDataResponse } from "../shared/types/types";
import { extractApiError } from "../utils";
import { axiosInstance } from "./axiosInstance";
import { API_ROUTES } from "../shared/constants/apiRoutes";
import { HttpStatusCode } from "../shared/constants/constants";
import { errorMessages } from "../shared/constants/config";

class BlogApi {
    async crateBlog(data: FormData): Promise<BlogPost> {
        try {
            const response: AxiosResponse<BlogReponses> = 
            await axiosInstance.post(API_ROUTES.BLOG.createBlog, data);

            if(response.status === HttpStatusCode.CREATED) {
                return response.data.blog as BlogPost
            } 
            throw new Error(errorMessages.unexpectedError);
        } catch (error) {
            throw new Error(extractApiError(error));
        }
    }

    async getBlog(blogId: string) :Promise<BlogPost> {
        try {
            const response: AxiosResponse<BlogReponses> = 
            await axiosInstance.get(API_ROUTES.BLOG.getBlog(blogId));

            if(response.status === HttpStatusCode.OK) {
                return response.data.blog as BlogPost
            }
            throw new Error(errorMessages.unexpectedError);
        } catch (error) {
            throw new Error(extractApiError(error));
        }
    }

    async editBlog(blogId: string, blog: FormData): Promise<BlogPost> {
        try {
            const response: AxiosResponse<BlogReponses> = 
            await axiosInstance.put(API_ROUTES.BLOG.editBlog(blogId), blog);

            if(response.status === HttpStatusCode.OK) {
                return response.data.blog as BlogPost
            }
            throw new Error(errorMessages.unexpectedError);
        } catch (error) {
            throw new Error(extractApiError(error));
        }
    }

    async getHomeData(searchQuery: string, page: number, skip: number= 6):Promise<HomeDataResponse> {
        try {
            const response: AxiosResponse<HomeDataResponse> = 
            await axiosInstance.get(API_ROUTES.BLOG.getHomeData(searchQuery, page, skip));

            if(response.status === HttpStatusCode.OK) {
                return response.data
            }
            throw new Error(errorMessages.unexpectedError);
        } catch (error) {
            throw new Error(extractApiError(error));
        }
    }
}

export const blogApi = new BlogApi();