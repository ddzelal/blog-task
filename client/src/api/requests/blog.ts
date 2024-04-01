import { API_ENDPOINT_URL } from "../../constants/appConstant";
import { BlogFindWithFiltersResultResponse } from "../../interfaces/blogRequest";
import { api } from "../config/axiosConfig";

export const getBlogs = async (): Promise<BlogFindWithFiltersResultResponse> => {
    const { data } = await api.get(API_ENDPOINT_URL.BLOG);
    return data;
};
