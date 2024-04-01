export interface Blog {
    id?: string;
    title: string;
    authorId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBlogRequest {
    title: string;
    content: string;
}

export interface UpdateBlogData {
    title: string;
    content: string;
}

export interface UpdateBlogRequest {
    body: UpdateBlogData;
    blogId: string;
}
export interface BlogFindWithFiltersResultResponse {
    data: Blog[];
    totalCount: number;
}
