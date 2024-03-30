import { faker } from "@faker-js/faker";
import UserModel, { User } from "../../src/models/User";

export class UserFactory {
    static createUser(attributes: Partial<User> = {}): Promise<User> {
        return new UserModel().create(
            Object.assign(
                {
                    email: faker.internet.email(),
                    fullName: faker.string.alpha({ length: 20 }),
                    password: faker.string.alpha({ length: 10 }),
                },
                attributes,
            ),
        );
    }
}
