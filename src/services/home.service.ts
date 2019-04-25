import {injectable} from "inversify";

@injectable()
export class HomeService {
    public get(): void {
        console.log("get");
    }
}
