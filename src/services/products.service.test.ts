import "reflect-metadata";
import {ProductsService} from "./products.service";
import MongoMemoryServer from "mongodb-memory-server-core/lib/MongoMemoryServer";
import "jest";
import {DbConnection} from "../db/utils/connection.db";
import Product, {IProduct} from "../db/models/product.db.model";

describe("Products service", async () => {
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        process.env.DB_CONN_STR = `mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_DB_NAME}`;
        mongod = new MongoMemoryServer({
            instance: {
                dbName: process.env.DB_DB_NAME,
                ip: process.env.DB_IP,
                port: parseInt(process.env.DB_PORT, 10),
            },
        });

        const uri = await mongod.getUri();
        await DbConnection.connect(uri);
    });

    afterAll(async () => {
        await DbConnection.disconnect();
        await mongod.stop();
    });

    // Before each method we need to truncate all products from db
    beforeEach(async () => {
        Product.deleteMany({}).then();
    });

    it("Should validate that create method has been called with correct params", async () => {
        const productService = new ProductsService();
        const productToCreate = {
            description: "Baby bikes",
            name: "BikeBee",
            quantity: 2,
        };

        const mockSpy = jest.spyOn(Product, "create");
        const created = await productService.createProduct(productToCreate);
        expect(mockSpy).toBeCalledWith(productToCreate);
    });

    it("Should create a product and return it - uses MongoMemoryServer", async () => {
        const productService = new ProductsService();
        const productToCreate = {
            description: "Baby bikes",
            name: "BikeBee",
            quantity: 2,
        };

        const created = await productService.createProduct(productToCreate);
        expect(created.id).not.toEqual("");
        expect(created.id).not.toBeNull();
        expect(created).toMatchObject(productToCreate);
    });

    it("Should update a product and return it - uses MongoMemoryServer", async () => {
        const productService = new ProductsService();
        const product = {
            description: "Baby bikes",
            name: "BikeBee",
            quantity: 2,
        };

        const created = await productService.createProduct(product);
        const newName = product.name = "Grown baby";
        const updated = await productService.updateProduct(created.id, product);
        expect(updated.name).toEqual(newName);
    });

    it("Should delete a product and return true - uses MongoMemoryServer", async () => {
        const productService = new ProductsService();
        const product = {
            description: "Baby bikes",
            name: "BikeBee",
            quantity: 2,
        };

        const created = await productService.createProduct(product);
        const isDeleted = await productService.deleteProduct(created.id);
        expect(isDeleted).toBeTruthy();
    });

    it("Should get a product - uses MongoMemoryServer", async () => {
        const productService = new ProductsService();
        const product = {
            description: "Baby bikes",
            name: "BikeBee",
            quantity: 2,
        };

        const created = await productService.createProduct(product);
        const fetchedProducts = await productService.getProduct(created.id);
        expect(fetchedProducts).toHaveLength(1);
        expect(created.id).toBe(fetchedProducts[0].id);
    });

    it("Should get all products - uses MongoMemoryServer", async () => {
        const productService = new ProductsService();
        const product = {
            description: "Baby bikes",
            name: "BikeBee",
            quantity: 2,
        };

        const created = await productService.createProduct(product);

        const product2 = {
            description: "Baby giraffe",
            name: "JeffTheGiraffe",
            quantity: 2,
        };

        const created2 = await productService.createProduct(product2);
        const fetchedProducts = await productService.getProducts();
        expect(fetchedProducts).toHaveLength(2);
        const expectedIds = fetchedProducts.map((item: IProduct) => item.id);
        expect(expectedIds).toEqual(expect.arrayContaining([created.id, created2.id]));
    });

    it("Should validate that findOneAndUpdate method has been called with correct params", async () => {
        const productService = new ProductsService();
        const updatedProduct = {
            description: "Baby bites",
        };

        const mockSpy = jest.spyOn(Product, "findOneAndUpdate");
        const idToUpdate = "4bdd40c86762e0fb12000003";
        const updated = await productService.updateProduct(idToUpdate, updatedProduct);
        expect(mockSpy).toBeCalledWith({_id: idToUpdate}, updatedProduct, {new: true});
    });

    it("Should validate that findOneAndDelete method has been called with correct params", async () => {
        const productService = new ProductsService();
        const mockSpy = jest.spyOn(Product, "findOneAndDelete");
        const idToDelete = "4bdd40c86762e0fb12000003";
        const deleted = await productService.deleteProduct(idToDelete);
        expect(mockSpy).toBeCalledWith({_id: idToDelete});
    });

    it("Should validate that find method has been called with correct params", async () => {
        const productService = new ProductsService();
        const mockSpy = jest.spyOn(Product, "find");
        const idToFind = "4bdd40c86762e0fb12000003";
        const found = await productService.getProduct(idToFind);
        expect(mockSpy).toBeCalledWith({_id: idToFind});
    });
});
