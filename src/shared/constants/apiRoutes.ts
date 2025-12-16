export const API_ROUTES = {
    AUTH: {
        register: "/api/register",
        verifyOtp: (email: string, otp: string) => `/api/verify-otp?email=${email}&otp=${otp}`,
        resendOtp: (email: string) => `/api/resend-otp/${email}`,
        login: "/api/login",
        logout: "/api/logout",
        refreshToken: "/api/refresh-token"
    },
    BLOG: {
        createBlog: "/api/blog/create",
        getBlog: (blogId: string) => `/api/blog/get-blog/${blogId}`,
        editBlog: (blogId: string) => `/api/blog/edit-blog/${blogId}`,
        getHomeData: (searchQuery: string, page: number, skip: number) => `/api/blog/home?search=${searchQuery}&page=${page}&skip=${skip}`
    }
}