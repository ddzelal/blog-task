import * as yup from "yup";

export const createBlogSchema = yup.object({
    title: yup.string().required("Title is required"), 
    authorId: yup.string().required("Author ID is required"),
    content: yup.string().required("Content is required"),
});
