import * as yup from "yup";

export const createBlogSchema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
});
