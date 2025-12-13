export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface LoginResponse {
  user: User
}

export interface User {
    _id: string;
    userName: string;
    email: string;
    isAdmin: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
}
