import DefaultModel from "./DefaultModel.js";
import config from "config";

interface Blog {
    id?: string;
    title: string;
    authorId: string;
    content: string;
}

class BlogModel extends DefaultModel<Blog> {
    constructor() {
        super(config.get("database.path.blog"));
    }
}

export default BlogModel;
