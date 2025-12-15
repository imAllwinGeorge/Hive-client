export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface LoginResponse {
  user: User
}

export interface BlogReponses {
  blog?: BlogPost;
  blogs?: BlogPost[];
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

export interface BlogPost {
  _id: string;
  userId: string;
  title: string;
  author: string;
  introduction: string;
  sections: BlogSection[];
  image: string ;
  views: number;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogSection {
  sectionTitle: string;
  content: string;
  image?: string ;       
}