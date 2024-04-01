import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { BlogFindWithFiltersResultResponse } from "../../interfaces/blogRequest";
import { getBlogs } from "../../api/requests/blog";
import { QUERY_KEY } from "../../constants/appConstant";

export const useGetBlogsQuery = (): UseQueryResult<BlogFindWithFiltersResultResponse, Error> => {
    return useQuery<BlogFindWithFiltersResultResponse, Error>({
        queryKey: [QUERY_KEY.BLOG],
        queryFn: getBlogs,
        staleTime: Infinity,
    });
};
