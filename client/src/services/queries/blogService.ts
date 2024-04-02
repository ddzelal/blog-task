import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { Blog, BlogFindWithFiltersResultResponse, CreateBlogRequest, UpdateBlogRequest } from "../../interfaces/blogRequest";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../../api/requests/blog";
import { QUERY_KEY } from "../../constants/appConstant";

export const useGetBlogsQuery = (
    page: number,
    sortOrder: string,
    sortBy: string,
): UseQueryResult<BlogFindWithFiltersResultResponse, Error> => {
    return useQuery<BlogFindWithFiltersResultResponse, Error>({
        queryKey: [QUERY_KEY.BLOG, page, sortOrder, sortBy],
        queryFn: () => getBlogs(page, sortOrder, sortBy),
        staleTime: Infinity,
    });
};

export const useGetBlogByIdQuery = (blogId:string) : UseQueryResult<Blog,Error> => {
    return useQuery<Blog,Error>({
        queryKey:[QUERY_KEY.BLOG_BY_ID,blogId],
        queryFn:()=> getBlogById(blogId),
        staleTime: Infinity,
    })
}

export const useBlogMutation = (): UseMutationResult<void, Error, CreateBlogRequest> => {
    return useMutation<void, Error, CreateBlogRequest>({ mutationFn: createBlog });
};

export const useUpdateBlogMutation = (): UseMutationResult<void, Error, UpdateBlogRequest> => {
    return useMutation<void, Error, UpdateBlogRequest>({
        mutationFn: (updateRequest: UpdateBlogRequest) => updateBlog(updateRequest),
    });
};
export const useDeleteBlogMutation = (): UseMutationResult<void, Error, string> => {
    return useMutation<void, Error, string>({
        mutationKey: [QUERY_KEY.DELETE_BLOG],
        mutationFn: (blogId: string) => deleteBlog(blogId),
    });
};
