import {ProcessConfigLoader} from "./src/config/env";

module.exports = () => {
    ProcessConfigLoader.Load("/.env");
}
