import { API_ENDPOINT_URL } from "../../constants/appConstant";
import { BlogFindWithFiltersResultResponse, CreateBlogRequest } from "../../interfaces/blogRequest";
import { api } from "../config/axiosConfig";

export const getBlogs = async (): Promise<BlogFindWithFiltersResultResponse> => {
    const { data } = await api.get(API_ENDPOINT_URL.BLOG);
    return data;
};


export const createBlog = async (body:CreateBlogRequest): Promise<void> => {
    const { data } = await api.post(API_ENDPOINT_URL.BLOG,body);
    return data;
};
