import { faker } from "@faker-js/faker";
import BlogModel, { Blog } from "../../src/models/Blog";

export class BlogFactory {
    static createBlog(attributes: Partial<Blog> = {}): Promise<Blog> {
        return new BlogModel().create(
            Object.assign(
                {
                    title: faker.lorem.sentence(),
                    authorId: faker.string.alpha({ length: 32 }),
                    content: faker.lorem.sentence(),
                },
                attributes,
            ),
        );
    }
}
