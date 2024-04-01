import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { BlogFindWithFiltersResultResponse, CreateBlogRequest, UpdateBlogRequest } from "../../interfaces/blogRequest";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "../../api/requests/blog";
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

export const useUpdateBlogMutation = (): UseMutationResult<void, Error, UpdateBlogRequest> => {
    return useMutation<void, Error, UpdateBlogRequest>({
        mutationFn: (updateRequest: UpdateBlogRequest) => updateBlog(updateRequest)
    });
};
export const useDeleteBlogMutation = (): UseMutationResult<void, Error,string> => {
    return useMutation<void, Error,string>({mutationKey:[QUERY_KEY.DELETE_BLOG], mutationFn:(blogId:string)=> deleteBlog(blogId) });
};
