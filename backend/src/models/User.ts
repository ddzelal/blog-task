import DefaultModel from "./DefaultModel.js";
import config from "config";
import fs from "fs";
import { omit } from "lodash";

interface User {
    id?: string;
    email: string;
    fullName: string;
    password: string;
}

class UserModel extends DefaultModel<User> {
    constructor() {
        super(config.get("database.path.user"));
    }

    findAllWithoutPassword(): Omit<User, "password">[] {
        const fileData = fs.readFileSync(this.collectionPath, { encoding: "utf-8" });
        const users: User[] = JSON.parse(fileData);
        return users.map((user) => omit(user, ["password"]));
    }

    findByEmail(email: string): User | undefined {
        const jsonData = this.find();
        return jsonData.find((item) => item.email === email);
    }
}

export default UserModel;
