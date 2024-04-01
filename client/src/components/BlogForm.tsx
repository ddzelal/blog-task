import { yupResolver } from "@hookform/resolvers/yup";
import { createBlogSchema } from "../validation/blogValidation";
import { useForm } from "react-hook-form";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect } from "react";

interface BlogFormData {
    title: string;
    content: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: BlogFormData) => void;
    initialValues?: BlogFormData;
}

const BlogForm = ({ open, onClose, onSubmit, initialValues }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<BlogFormData>({
        resolver: yupResolver(createBlogSchema),
        defaultValues: initialValues
    });

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialValues ? 'Update Blog' : 'Add New Blog'}</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Title"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Content"
                        {...register("content")}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                        multiline
                        rows={4}
                    />
                    <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                        {initialValues ? 'Update Blog' : 'Save Blog'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default BlogForm;
