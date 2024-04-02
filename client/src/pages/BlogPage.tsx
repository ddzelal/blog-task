import { useNavigate } from "react-router";
import { useBlogMutation, useGetBlogsQuery } from "../services/queries/blogService";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { CreateBlogRequest } from "../interfaces/blogRequest";
import { Box, Button, Grid, Pagination } from "@mui/material";
import BlogForm from "../components/BlogForm";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/appConstant";
import BlogCard from "../components/BlogCard";
import { calculateNumberOfPages } from "../utils/calculateNumberOfPages";
import { getBlogs } from "../api/requests/blog";
import { toast } from "react-toastify";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function BlogPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [sortOrder, setSortOrder] = useState("desc");
    const [sortBy, setSortBy] = useState("createdAt");
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const { data, isPlaceholderData } = useGetBlogsQuery(page, sortOrder, sortBy);
    const { mutateAsync } = useBlogMutation();

    const { isAuthenticated, user } = useAuthStore((state) => state);


    useEffect(() => {
        if (!isPlaceholderData && page < calculateNumberOfPages(9, data?.totalCount || 0)) {
            queryClient.prefetchQuery({
                queryKey: ["projects", page + 1, sortOrder, sortBy],
                queryFn: () => getBlogs(page + 1, sortOrder, sortBy),
            });
        }
    }, [data, isPlaceholderData, page, queryClient]);

    const handleAddBlog = async (blogData: CreateBlogRequest) => {
        await mutateAsync(blogData, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG] });
                toast("Blog added");
            },
        });
        setOpen(false);
    };

    const handleOpenForm = () => {
        if (isAuthenticated) {
            setOpen(true);
        } else {
            navigate("/login");
        }
    };

    const toggleSortOrder = () => {
        console.log("test");
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG] });
    };

    const toggleSortBy = () => {
        setSortBy((currentSortBy) => (currentSortBy === "createdAt" ? "updatedAt" : "createdAt"));
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG] });
    };

    return (
        <Box sx={{ padding: "20px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Button onClick={toggleSortOrder}>{sortOrder === "asc" ? "desc" : "asc"}</Button>
                <Button onClick={toggleSortBy}>
                    Sort by {sortBy === "createdAt" ? "Updated Date" : "Created Date"}
                    {sortBy === "createdAt" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                </Button>
                <Button variant="contained" color="primary" onClick={handleOpenForm}>
                    Add Blog
                </Button>
            </Box>
            <BlogForm open={open} onClose={() => setOpen(false)} onSubmit={handleAddBlog} />
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Pagination
                    count={calculateNumberOfPages(9, data?.totalCount || 0)}
                    onChange={(_event, pageNum) => setPage(pageNum)}
                />
            </Box>
            <Grid marginTop={2} container spacing={2} justifyContent="center" alignItems="center">
                {data?.data?.map((blog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <BlogCard userId={user?.id || null} blog={blog} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default BlogPage;
