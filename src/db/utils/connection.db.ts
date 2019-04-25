import mongoose from "mongoose";

export class DbConnection {

    public static initConnection(connStr: string) {
        this.connect(connStr);
        mongoose.connection.on("disconnected", DbConnection.connect);
    }

    private static connect(connStr: string) {
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
}
