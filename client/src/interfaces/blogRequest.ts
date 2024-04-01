export interface Blog {
    id?: string;
    title: string;
    authorId: string;
    content: string;
}

export interface CreateBlogRequest {
    title: string;
    content: string;
}

export interface UpdateBlogRequest {
    title: string;
    content: string;
}
export interface BlogFindWithFiltersResultResponse {
    data: Blog[];
    totalCount: number;
}
