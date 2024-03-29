import fs from "fs";
import { Log } from "../services/Log";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __baseDir = process.env.PWD || __dirname;

interface IModel {
    id?: string;
}

class DefaultModel<T extends IModel> {
    collectionPath: string;

    constructor(collectionName: string) {
        this.collectionPath = path.join(__baseDir, collectionName);
        this.initCollection();
    }

    private initCollection(): void {
        if (!fs.existsSync(this.collectionPath)) {
            fs.writeFileSync(this.collectionPath, JSON.stringify([]));
            Log.info("Created new collection", { collectionPath: this.collectionPath });
        } else {
            Log.info("File already exists", { collectionPath: this.collectionPath });
        }
    }

    create(data: Partial<T>): T {
        const jsonData = this.find();
        const newData = { ...data, id: data.id || nanoid() } as T;
        jsonData.push(newData);
        fs.writeFileSync(this.collectionPath, JSON.stringify(jsonData, null, 2));
        return newData;
    }

    find(): T[] {
        const fileData = fs.readFileSync(this.collectionPath, { encoding: "utf-8" });
        return JSON.parse(fileData);
    }

    findById(id: string): T | undefined {
        const jsonData = this.find();
        return jsonData.find((item) => item.id === id);
    }

    updateOne(id: string, newData: Partial<T>): T | null {
        const jsonData = this.find();
        const itemIndex = jsonData.findIndex((item) => item.id === id);
        if (itemIndex >= 0) {
            jsonData[itemIndex] = { ...jsonData[itemIndex], ...newData };
            fs.writeFileSync(this.collectionPath, JSON.stringify(jsonData, null, 2));
            return jsonData[itemIndex];
        }
        return null;
    }

    deleteOne(id: string): string {
        const jsonData = this.find();
        const filteredData = jsonData.filter((item) => item.id !== id);
        fs.writeFileSync(this.collectionPath, JSON.stringify(filteredData, null, 2));
        return id;
    }
}

export default DefaultModel;
