import React from "react";
import { useGetBlogsQuery } from "../services/queries/blogService";

function BlogPage() {
    const { data } = useGetBlogsQuery();
    console.log(data);
    return <div>BlogPage</div>;
}

export default BlogPage;
