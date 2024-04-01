import { promises as fs } from "fs";
import { Log } from "../services/Log";
import path from "path";
import { nanoid } from "nanoid";

const getBaseDir = (): string => {
    if (process.env.PWD) return process.env.PWD;
    return process.cwd();
};

const __baseDir = getBaseDir();

interface IModel {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class DefaultModel<T extends IModel> {
    collectionPath: string;

    constructor(collectionName: string) {
        this.collectionPath = path.join(__baseDir, collectionName);
    }

    public async initCollection(): Promise<void> {
        try {
            const exists = await fs
                .stat(this.collectionPath)
                .then(() => true)
                .catch(() => false);
            if (!exists) {
                await fs.writeFile(this.collectionPath, JSON.stringify([]));
                Log.info("Created new collection", { collectionPath: this.collectionPath });
            }
        } catch (error) {
            Log.error("Error in initCollection", { error });
        }
    }

    async create(data: Partial<T>): Promise<T> {
        const jsonData = await this.find();
        const newData = { ...data, id: data.id || nanoid(), createdAt: new Date(), updatedAt: new Date() } as T;
        jsonData.push(newData);
        await fs.writeFile(this.collectionPath, JSON.stringify(jsonData, null, 2));
        return newData;
    }

    async find(): Promise<T[]> {
        const fileData = await fs.readFile(this.collectionPath, { encoding: "utf-8" });
        return JSON.parse(fileData);
    }

    async findById(id: string): Promise<T | undefined> {
        const jsonData = await this.find();
        return jsonData.find((item) => item.id === id);
    }

    async updateOne(id: string, newData: Partial<T>): Promise<T | null> {
        const jsonData = await this.find();
        const itemIndex = jsonData.findIndex((item) => item.id === id);
        if (itemIndex >= 0) {
            jsonData[itemIndex] = { ...jsonData[itemIndex], ...newData, updatedAt: new Date() };
            await fs.writeFile(this.collectionPath, JSON.stringify(jsonData, null, 2));
            return jsonData[itemIndex];
        }
        return null;
    }

    async deleteOne(id: string): Promise<string> {
        const jsonData = await this.find();
        const filteredData = jsonData.filter((item) => item.id !== id);
        await fs.writeFile(this.collectionPath, JSON.stringify(filteredData, null, 2));
        return id;
    }
}

export default DefaultModel;
