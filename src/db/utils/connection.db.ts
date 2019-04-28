import mongoose from "mongoose";

export class DbConnection {
    private static CONNSTR: string;

    public static async initConnection(connStr: string) {
        DbConnection.CONNSTR = connStr;
        await DbConnection.connect(this.CONNSTR);
        mongoose.connection.on("disconnected", () => DbConnection.connect(DbConnection.CONNSTR));
    }

    public static async connect(connStr: string) {
       return mongoose.connect(
            connStr,
            {useNewUrlParser: true, useFindAndModify: false},
        )
            .then(() => {
                console.log(`Successfully connected to ${connStr}`);
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                return process.exit(1);
            });
    }

    public static async disconnect() {
       await mongoose.connection.close();
    }
}
