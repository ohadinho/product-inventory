import MongoMemoryServer from "mongodb-memory-server-core/lib/MongoMemoryServer";
import {DbConnection} from "../../db/utils/connection.db";

export class DbMock {
    public static mongod: MongoMemoryServer;

    public static async initDbMock() {
        DbMock.mongod = new MongoMemoryServer({
            instance: {
                dbName: process.env.DB_DB_NAME,
                ip: process.env.DB_IP,
                port: parseInt(process.env.DB_PORT, 10),
            },
        });

        // ensures MongoMemoryServer is up
        await DbMock.mongod.getUri();
        await DbConnection.initConnection();
        return DbMock.mongod;
    }

    public static async stopDbMock() {
        await DbConnection.disconnect();
        await DbMock.mongod.stop();
    }
}
