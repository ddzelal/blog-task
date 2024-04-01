import  { Fragment, useState } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuthStore from "../store/useAuthStore";
import { Blog } from "../interfaces/blogRequest";
import { useDeleteBlogMutation, useUpdateBlogMutation } from "../services/queries/blogService";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/appConstant";
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { toast } from 'react-toastify';
import BlogForm, { BlogFormData } from './BlogForm';

interface Props {
    blog: Blog;
    userId:string | null
}

export default function BlogCard({ blog }: Props) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false)

    const { mutateAsync } = useDeleteBlogMutation();
    const {mutateAsync:updateBlog} = useUpdateBlogMutation();

    const { user } = useAuthStore((state) => state);

    

    const handleDeleteBlogById = async () => {
        await mutateAsync(blog.id!, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG] });
                toast("Blog deleted")
                handleShowDialog();
            },
        });
    };

    const handleUpdateBlog= async (data:BlogFormData)=>{
        await updateBlog({blogId:blog.id!, body:data},{
            onSuccess:()=>{
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG] });
                toast("Blog updated")
                handleOpenForm()
            }
        })
    }
    
    const handleShowDialog = () =>{
        setOpen((prev) => !prev)
    }

    const handleOpenForm = ()=> {
        setIsOpenForm((prev) => !prev)
    }

   
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
                <Button variant='contained'>VIEW</Button>
                {user?.id === blog.authorId && 
                <Fragment>
                <Button onClick={handleOpenForm} color='inherit' variant='contained'>UPDATE</Button>
                <Button variant='contained' onClick={handleShowDialog} color="warning">
                    DELETE
                </Button>
                </Fragment>
                }
            </CardActions>
            <DeleteConfirmationDialog onClose={handleShowDialog} onConfirm={handleDeleteBlogById} open={open}/>
            <BlogForm onSubmit={handleUpdateBlog} onClose={()=> setIsOpenForm(false)} open={isOpenForm} initialValues={blog}/>
        </Card>
    );
}
