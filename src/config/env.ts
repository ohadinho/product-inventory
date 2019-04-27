import { config } from "dotenv";
import { join } from "path";

export class ProcessConfigLoader {
    public static Load(envRelativePath: string): void {
        const currentPath: string = process.cwd();
        const path: string = join(currentPath, envRelativePath);
        config({ path });
    }
}