import DefaultModel from "./DefaultModel.js";
import config from "config";
import { promises as fs } from "fs";
import _ from "lodash";

export interface User {
    id?: string;
    email: string;
    fullName: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class UserModel extends DefaultModel<User> {
    constructor() {
        super(config.get("database.path.user"));
    }

    async findAllWithoutPassword(): Promise<Omit<User, "password">[]> {
        const fileData = await fs.readFile(this.collectionPath, { encoding: "utf-8" });
        const users: User[] = JSON.parse(fileData);
        return users.map((user) => _.omit(user, ["password"]));
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const jsonData = await this.find();
        return jsonData.find((item: User) => item.email === email);
    }
}

export default UserModel;
