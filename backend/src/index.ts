import config from "config";
import { Application } from "./Application";
import { Log } from "./services/Log";
import BlogModel from "./models/Blog";
import UserModel from "./models/User";

async function run() {
    const port = config.has("app.port") ? config.get("app.port") : 3000;
    await initalizeDatabase();

    Application.listen(port, () => {
        Log.info("Server started", { port });
    });
}

async function initalizeDatabase() {
    await new BlogModel().initCollection();
    await new UserModel().initCollection();
}

run();
