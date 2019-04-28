import "reflect-metadata";
import {ProductsService} from "./products.service";
import {config} from "dotenv";
import MongoMemoryServer from "mongodb-memory-server-core/lib/MongoMemoryServer";
import "jest";
import {DbConnection} from "../db/utils/connection.db";
import Product from "../db/models/product.db.model";

describe("Products service", async () => {
    beforeAll(async () => {
        process.env.DB_CONN_STR = `mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_DB_NAME}`;
        const mongod = new MongoMemoryServer({
            instance: {
                dbName: process.env.DB_DB_NAME,
                ip: process.env.DB_IP,
                port: parseInt(process.env.DB_PORT, 10),
            },
        });
        const uri = await mongod.getUri();
        DbConnection.connect(uri);
    });

    afterAll(async () => {
        await DbConnection.disconnect();
    });

    it("Should create a product", async () => {
        const productService = new ProductsService();
        const productToCreate = {
            description: "Baby bikes",
            name: "BikeBee",
            quantity: 2,
        };

        const mockSpy = jest.spyOn(Product, "create");
        mockSpy.mockImplementation((product) => {
            return new Promise((resolve, reject) => {
                product.id = "mockid";
                process.nextTick(() => { resolve(product); });
            });
        });
        const created = await productService.createProduct(productToCreate);
        expect(created.id).not.toEqual("");
        expect(created.id).not.toBeNull();
        expect(created).toMatchObject(productToCreate);
    });
});
