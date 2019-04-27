import mongoose from "mongoose";

export class DbConnection {
    private static CONNSTR: string;

    public static initConnection(connStr: string) {
        this.CONNSTR = connStr;
        this.connect(this.CONNSTR);
        mongoose.connection.on("disconnected", () => DbConnection.connect(this.CONNSTR));
    }

    public static connect(connStr: string) {
        mongoose.connect(
            connStr,
            {useNewUrlParser: true},
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
