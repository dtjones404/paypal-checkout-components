import fs from "fs";
import { buttonConfigs } from "../config";

export const createConfig = () => {
  fs.writeFileSync(
    "./percy/files/buttonConfig.json",
    JSON.stringify(buttonConfigs)
  );
};
