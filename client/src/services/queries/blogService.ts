import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { BlogFindWithFiltersResultResponse, CreateBlogRequest } from "../../interfaces/blogRequest";
import { createBlog, getBlogs } from "../../api/requests/blog";
import { QUERY_KEY } from "../../constants/appConstant";

export const useGetBlogsQuery = (page: number): UseQueryResult<BlogFindWithFiltersResultResponse, Error> => {
    return useQuery<BlogFindWithFiltersResultResponse, Error>({
        queryKey: [QUERY_KEY.BLOG, page],
        queryFn: () => getBlogs(page),
        staleTime: Infinity,
    });
};

export const useBlogMutation = (): UseMutationResult<void, Error, CreateBlogRequest> => {
    return useMutation<void, Error, CreateBlogRequest>({ mutationFn: createBlog });
};
