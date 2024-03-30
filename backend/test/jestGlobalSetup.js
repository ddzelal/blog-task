import config from "config";
import { clearJSONFile } from "./utils/cleanDatabase.js";

export default async () => {
    await clearJSONFile(config.get("database.path.user"));
    await clearJSONFile(config.get("database.path.blog"));
};
