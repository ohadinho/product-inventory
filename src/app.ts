import "reflect-metadata";
import * as bodyParser from "body-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import {ProcessConfigLoader} from "./config/env";
import "./controllers/home.controller";
import "./controllers/products.controller";
import {DbConnection} from "./db/utils/connection.db";
import {DbMock} from "./tests/utils/dbmock";
import {ContainerConfigLoader} from "./config/container";

// Load config
ProcessConfigLoader.Load("/dist/.env");

// load everything needed to the Container
const container = ContainerConfigLoader.Load();

const mongod = DbMock.initDbMock();
DbConnection.initConnection().then(() => {
    // start the server
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({
            extended: true,
        }));
        app.use(bodyParser.json());
    });

    const serverInstance = server.build();
    serverInstance.listen(process.env.PORT);
});

console.log(`Server started on port ${process.env.PORT} :)`);
