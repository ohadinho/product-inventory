import * as express from "express";
import {inject} from "inversify";
import {controller, httpGet, interfaces} from "inversify-express-utils";
import TYPES from "../constants/types";
import {IProduct} from "../db/models/product.db.model";
import {ProductsService} from "../services/products.service";

@controller("/products")
export class ProductsController implements interfaces.Controller {
    constructor(@inject(TYPES.ProductsService) private productsService: ProductsService) {
    }

    @httpGet("/")
    public getProducts(req: express.Request, res: express.Response, next: express.NextFunction): any {
        const productsPromise = this.productsService.getProducts();
        productsPromise.then((products: IProduct[]) => {
            res.status(200);
            return products;
        })
            .catch((err: Error) => {
                res.status(400).json({error: err.message});
            });
    }
}
