import  { useState } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useAuthStore from "../store/useAuthStore";
import { Blog } from "../interfaces/blogRequest";
import { useDeleteBlogMutation } from "../services/queries/blogService";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/appConstant";
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { toast } from 'react-toastify';

interface Props {
    blog: Blog;
    userId:string | null
}

export default function BlogCard({ blog }: Props) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const { mutateAsync } = useDeleteBlogMutation();

    const { user } = useAuthStore((state) => state);

    
    const handleShowDialog = () =>{
        setOpen((prev) => !prev)
    }

    const handleDeleteBlogById = async () => {
        await mutateAsync(blog.id!, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG] });
                toast("Post deleted")
            },
        });
        handleShowDialog();
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }} image="https://picsum.photos/seed/picsum/200/300" title="Blog Image" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {blog.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
                {user?.id === blog.authorId && <Button onClick={handleShowDialog} color="warning">
                    DELETE
                </Button>}
            </CardActions>
            <DeleteConfirmationDialog onClose={handleShowDialog} onConfirm={handleDeleteBlogById} open={open}/>
        </Card>
    );
}
