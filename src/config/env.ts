import { config } from "dotenv";
import { join } from "path";

const currentPath: string = process.cwd();
const path: string = join(currentPath, "/dist/.env");
config({ path });
