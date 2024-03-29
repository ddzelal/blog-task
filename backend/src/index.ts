import config from "config";
import { Application } from "./Application";
import { Log } from "./services/Log";

function run() {
    const port = config.has("app.port") ? config.get("app.port") : 3000;

    Application.listen(port, () => {
        Log.info("Server started", { port });
    });
}

run();
