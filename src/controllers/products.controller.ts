import * as express from "express";
import {inject} from "inversify";
import {BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut} from "inversify-express-utils";
import TYPES from "../constants/types";
import {ProductsService} from "../services/products.service";
import {JsonResult} from "inversify-express-utils/dts/results";

@controller("/products")
export class ProductsController extends BaseHttpController {
    constructor(@inject(TYPES.ProductsService) private productsService: ProductsService) {
        super();
    }

    @httpGet("/")
    public async getProducts(req: express.Request, res: express.Response, next: express.NextFunction): Promise<JsonResult> {
        const content = await this.productsService.getProducts();
        const statusCode = 200;
        return this.json(content, statusCode);
    }

    @httpGet("/:id")
    public async getProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<JsonResult> {
        const content = await this.productsService.getProduct(req.params.id);
        const statusCode = 403;
        return this.json(content, statusCode);
    }

    @httpPost("/")
    public async createProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<JsonResult> {
        const content = await this.productsService.createProduct(req.body);
        const statusCode = 201;
        return this.json(content, statusCode);
    }

    @httpPut("/:id")
    public async updateProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<JsonResult> {
        const content = await this.productsService.updateProduct(req.params.id, req.body);
        const statusCode = 200;
        return this.json(content, statusCode);
    }

    @httpDelete("/:id")
    public async deleteProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<JsonResult> {
        const content = await this.productsService.deleteProduct(req.params.id);
        const statusCode = 200;
        return this.json(content, statusCode);
    }
}
