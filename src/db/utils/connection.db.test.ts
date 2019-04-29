import "jest";
import {DbConnection} from "./connection.db";

describe("Connection db tests", async () => {

    it("Mongoose connect called", async () => {
        const mockSpy = jest.spyOn(DbConnection, "connect");
        mockSpy.mockImplementation((connStr: string) => {
            return Promise.resolve();
        });
        await DbConnection.initConnection();
        expect(mockSpy).toHaveBeenCalledWith(process.env.DB_CONN_STR);
    });
});
