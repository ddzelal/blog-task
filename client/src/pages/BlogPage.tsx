import { useNavigate } from "react-router";
import { useBlogMutation, useGetBlogsQuery } from "../services/queries/blogService";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { CreateBlogRequest } from "../interfaces/blogRequest";
import { Box, Button, Grid, Pagination } from "@mui/material";
import SearchBar from "../components/SearchBar";
import BlogForm from "../components/BlogForm";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/appConstant";
import BlogCard from "../components/BlogCard";

function BlogPage() {
    const queryClient = useQueryClient()

    const navigate = useNavigate();
    const { data } = useGetBlogsQuery();
    const [open, setOpen] = useState(false);
    const { mutateAsync } = useBlogMutation();
    const { isAuthenticated } = useAuthStore((state) => state);
    console.log(data,"data");
    const handleAddBlog = async (blogData: CreateBlogRequest) => {
        await mutateAsync(blogData,{onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:[QUERY_KEY.BLOG]})
        }});
        setOpen(false);
    };

    const handleOpenForm = () => {
        if (isAuthenticated) {
            setOpen(true);
        } else {
            navigate('/login');
        }
    };

    const itemsPerPage = 9; 
    const totalCount = data?.totalCount || 0;
    const numberOfPages = Math.ceil(totalCount / itemsPerPage);

    const handlePageChange = (page:number) =>{
console.log(page);
    }

    console.log('Total pages:', numberOfPages);

    return (
        <Box sx={{ padding: '20px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <SearchBar onSearch={(e) => console.log(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleOpenForm}>
                    Add Blog
                </Button>
            </Box>
            <BlogForm open={open} onClose={() => setOpen(false)} onSubmit={handleAddBlog} />
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Pagination count={numberOfPages} onChange={(event, page) => handlePageChange(page)} />
            </Box>
            <Grid container spacing={2}>
        {data?.data?.map((blog, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <BlogCard title={blog.title} content={blog.content} />
            </Grid>
        ))}
    </Grid>
   
        </Box>
    );
}

export default BlogPage;
