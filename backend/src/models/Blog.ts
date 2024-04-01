import DefaultModel from "./DefaultModel.js";
import config from "config";

export interface Blog {
    id?: string;
    title: string;
    authorId: string;
    content: string;
}

export interface FindWithFiltersResult {
    data: Blog[];
    totalCount: number;
}

class BlogModel extends DefaultModel<Blog> {
    constructor() {
        super(config.get("database.path.blog"));
    }

    async findWithFilters(
        filters: Partial<Blog>,
        pagination: { page: number; itemsPerPage: number },
    ): Promise<FindWithFiltersResult> {
        const allBlogs = await this.find();
        let filteredBlogs = allBlogs;

        if (filters.title) {
            filteredBlogs = filteredBlogs.filter((blog) =>
                blog.title.toLowerCase().includes(filters.title!.toLowerCase()),
            );
        }
        if (filters.authorId) {
            filteredBlogs = filteredBlogs.filter((blog) => blog.authorId === filters.authorId);
        }

        const totalCount = filteredBlogs.length;

        const { page, itemsPerPage } = pagination;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedBlogs = filteredBlogs.reverse().slice(startIndex, endIndex);

        return { data: paginatedBlogs, totalCount };
    }
}

export default BlogModel;
