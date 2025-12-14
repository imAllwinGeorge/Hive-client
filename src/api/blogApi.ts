import type { AxiosResponse } from "axios";
import type { BlogPost, CreateBlogResponse } from "../shared/types/types";
import { extractApiError } from "../utils";
import { axiosInstance } from "./axiosInstance";
import { API_ROUTES } from "../shared/constants/apiRoutes";
import { HttpStatusCode } from "../shared/constants/constants";
import { errorMessages } from "../shared/constants/config";

class BlogApi {
    async crateBlog(data: FormData): Promise<BlogPost> {
        try {
            const response: AxiosResponse<CreateBlogResponse> = 
            await axiosInstance.post(API_ROUTES.BLOG.createBlog, data);

            if(response.status === HttpStatusCode.CREATED) {
                return response.data.blog
            } 
            throw new Error(errorMessages.unexpectedError);
        } catch (error) {
            throw new Error(extractApiError(error));
        }
    }
}

export const blogApi = new BlogApi();