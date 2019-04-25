import * as express from "express";
import {inject} from "inversify";
import {BaseHttpController, controller, httpGet, HttpResponseMessage, interfaces} from "inversify-express-utils";
import TYPES from "../constants/types";
import {IProduct} from "../db/models/product.db.model";
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
        const statusCode = 403;
        return this.json(content, statusCode);
    }
}
