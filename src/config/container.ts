import {HomeService} from "../services/home.service";
import {Container} from "inversify";
import {ProductsService} from "../services/products.service";
import TYPES from "../constants/types";

export class ContainerConfigLoader {
    public static Load(): Container {
        const container = new Container();
        container.bind<HomeService>(TYPES.HomeService).to(HomeService);
        container.bind<ProductsService>(TYPES.ProductsService).to(ProductsService);
        return container;
    }
}
