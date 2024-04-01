import { yupResolver } from "@hookform/resolvers/yup";
import { createBlogSchema } from "../validation/blogValidation";
import { useForm } from "react-hook-form";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void; 
}


const BlogForm = ({ open, onClose, onSubmit }:Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(createBlogSchema)
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Blog</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Title"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Content"
                        {...register('content')}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                        multiline
                        rows={4}
                    />
                    <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                        Save Blog
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default BlogForm