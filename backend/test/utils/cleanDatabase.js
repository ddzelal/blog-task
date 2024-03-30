import fs from "fs/promises";
import path from "path";

const getBaseDir = () => {
    if (process.env.PWD) return process.env.PWD;
    return process.cwd();
};

const __baseDir = getBaseDir();

export const clearJSONFile = async (filePath) => {
    try {
        const fullFilePath = path.join(__baseDir, filePath);

        await fs.writeFile(fullFilePath, JSON.stringify([]));
        console.log(`Cleared file: ${filePath}`);
    } catch (error) {
        console.error(`Error deleting file at path ${filePath}: ${error}`);
    }
};
