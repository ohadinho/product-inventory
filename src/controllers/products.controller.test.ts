import "reflect-metadata";
import {ProductsService} from "../services/products.service";
import "jest";
import {ProductsController} from "./products.controller";

describe("Products controller", async () => {
    let productsService: ProductsService;
    let productsController: ProductsController;

    beforeAll(async () => {
        productsService = new ProductsService();
        productsController = new ProductsController(productsService);
    });

    it("Should test getProducts return content on success", async () => {
        const products: any = [{name: "A", description: "descA", quantity: 2},
            {name: "B", description: "descB", quantity: 1}]
        const mockSpy = jest.spyOn(productsService, "getProducts");
        mockSpy.mockImplementation(() => {
            return Promise.resolve(products);
        });
        const response = await productsController.getProducts(null, null, null);
        expect(response.json).toEqual(products);
    });

    it("Should test getProducts return status code on success", async () => {
        const products: any = [{name: "A", description: "descA", quantity: 2},
            {name: "B", description: "descB", quantity: 1}]
        const mockSpy = jest.spyOn(productsService, "getProducts");
        mockSpy.mockImplementation(() => {
            return Promise.resolve(products);
        });
        const response = await productsController.getProducts(null, null, null);
        expect(response.statusCode).toEqual(200);
    });
});
