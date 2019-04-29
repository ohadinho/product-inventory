import MongoMemoryServer from "mongodb-memory-server-core/lib/MongoMemoryServer";

export class DbMock {

    public static initDbMock(): MongoMemoryServer {
        const mongod = new MongoMemoryServer({
            instance: {
                dbName: process.env.DB_DB_NAME,
                ip: process.env.DB_IP,
                port: parseInt(process.env.DB_PORT, 10),
            },
        });

        return mongod;
    }
}
