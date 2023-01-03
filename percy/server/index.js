/* @flow */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { webpackCompile } = require("./screenshot/lib/compile");
import { getWebpackConfig } from "@krakenjs/webpack-config-grumbler";
import globals from "../../globals";
import { getTestGlobals } from "./globals";
import { buttonConfigs } from "./screenshot/config";

const hostname = "127.0.0.1";
const port = 8111;

(async () => {
  fs.writeFileSync(
    "./percy/server/screenshot/files/buttonConfig.json",
    JSON.stringify(buttonConfigs)
  );

  const scriptPath = await webpackCompile(
    getWebpackConfig({
      entry: "./test/paypal.js",
      libraryTarget: "window",
      test: true,
      web: false,
      vars: { ...getTestGlobals(globals) },
    })
  );

  const server = http.createServer((req, res) => {
    if (req.url === "/sdk/js") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/javascript");
      const readStream = fs.createReadStream(scriptPath);
      readStream.pipe(res);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      const readStream = fs.createReadStream(
        path.resolve(__dirname, "./index.html")
      );
      readStream.pipe(res);
    }
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})();
