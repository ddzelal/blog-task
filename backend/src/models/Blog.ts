import DefaultModel from "./DefaultModel.js";
import config from "config";

export interface Blog {
    id?: string;
    title: string;
    authorId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
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
        sort: { sortBy: string; sortOrder: string },
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

        allBlogs.sort((a, b) => {
            if (sort.sortBy === "createdAt" || sort.sortBy === "updatedAt") {
                if (sort.sortOrder === "asc") {
                    return new Date(a[sort.sortBy]).getTime() - new Date(b[sort.sortBy]).getTime();
                } else {
                    return new Date(b[sort.sortBy]).getTime() - new Date(a[sort.sortBy]).getTime();
                }
            }
            return 0;
        });

        const totalCount = filteredBlogs.length;

        const { page, itemsPerPage } = pagination;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

        return { data: paginatedBlogs, totalCount };
    }
}

export default BlogModel;
