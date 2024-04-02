import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, CircularProgress } from "@mui/material";
import { useGetBlogByIdQuery } from "../services/queries/blogService";

const BlogInfo = () => {
    
    const { blogId } = useParams<{ blogId: string | undefined }>();
    const { data: blog, isLoading, error } = useGetBlogByIdQuery(blogId ?? '');

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !blog) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6" color="error">
                    Error loading blog details or blog not found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={"https://picsum.photos/seed/picsum/600/400"}
                    alt="Blog Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {blog.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Created on: {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {blog.content}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BlogInfo;
