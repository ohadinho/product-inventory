import {injectable} from "inversify";
import {Error} from "mongoose";
import Product, {IProduct} from "../db/models/product.db.model";

@injectable()
export class ProductsService {
    public async getProducts(): Promise<IProduct[]> {
       return Product.find()
            .then((data: IProduct[]) => {
                return data;
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public async getProduct(id: number): Promise<IProduct[]> {
        return Product.find({id})
            .then((data: IProduct[]) => {
                return data;
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public async createProduct(product: IProduct): Promise<IProduct> {
        return Product.create(product)
            .then((data: IProduct) => {
                return data;
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public async updateProduct(id: number, product: IProduct): Promise<IProduct> {
        return Product.findOneAndUpdate({id}, product, {new: true})
            .then((data: IProduct) => {
                return data;
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public async deleteProduct(id: number): Promise<boolean> {
        return Product.findOneAndDelete({id})
            .then((data: any) => {
                return true;
            })
            .catch((error: Error) => {
                throw error;
            });
    }
}
