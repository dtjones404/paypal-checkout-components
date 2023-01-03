/* @flow */
// eslint-disable-next-line import/no-nodejs-modules
import fs from "fs";

import { buttonConfigs } from "../config";

export const createConfig = () => {
  // eslint-disable-next-line no-sync
  fs.writeFileSync(
    "./test/percy/files/buttonConfig.json",
    JSON.stringify(buttonConfigs)
  );
};
