import "reflect-metadata";
import * as bodyParser from "body-parser";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import {ProcessConfigLoader} from "./config/env";
import TYPES from "./constants/types";
import "./controllers/home.controller";
import "./controllers/products.controller";
import {DbConnection} from "./db/utils/connection.db";
import { HomeService } from "./services/home.service";
import {ProductsService} from "./services/products.service";
import MongoMemoryServer from "mongodb-memory-server-core/lib/MongoMemoryServer";
import {DbMock} from "./tests/utils/dbmock";

// Load config
ProcessConfigLoader.Load("/dist/.env");

// load everything needed to the Container
const container = new Container();
container.bind<HomeService>(TYPES.HomeService).to(HomeService);
container.bind<ProductsService>(TYPES.ProductsService).to(ProductsService);

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
