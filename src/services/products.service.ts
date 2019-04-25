import {injectable} from "inversify";
import {Error} from "mongoose";
import Product, {IProduct} from "../db/models/product.db.model";

@injectable()
export class ProductsService {
    public async getProducts(): Promise<any> {
       return Product.find()
            .then((data: IProduct[]) => {
                return data;
            })
            .catch((error: Error) => {
                throw error;
            });
    }
}
