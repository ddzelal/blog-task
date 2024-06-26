import { API_ENDPOINT_URL } from "../../constants/appConstant";
import {
    Blog,
    BlogFindWithFiltersResultResponse,
    CreateBlogRequest,
    UpdateBlogRequest,
} from "../../interfaces/blogRequest";
import { api } from "../config/axiosConfig";

export const getBlogs = async (
    page: number = 1,
    sortOrder: string = "desc",
    sortBy: string = "updatedAt",
): Promise<BlogFindWithFiltersResultResponse> => {
    const { data } = await api.get(`${API_ENDPOINT_URL.BLOG}?page=${page}&sortOrder=${sortOrder}&sortBy=${sortBy}`);
    return data;
};

export const getBlogById = async (blogId: string): Promise<Blog> => {
    const { data } = await api.get(`${API_ENDPOINT_URL.BLOG}/${blogId}`);
    return data;
};

export const createBlog = async (body: CreateBlogRequest): Promise<void> => {
    const { data } = await api.post(API_ENDPOINT_URL.BLOG, body);
    return data;
};

export const deleteBlog = async (blogId: string): Promise<void> => {
    const { data } = await api.delete(`${API_ENDPOINT_URL.BLOG}/${blogId}`);
    return data;
};

export const updateBlog = async (dataInfo: UpdateBlogRequest): Promise<void> => {
    const { data } = await api.put(`${API_ENDPOINT_URL.BLOG}/${dataInfo.blogId}`, dataInfo.body);
    return data;
};
