const http = require("http");
const fs = require("fs");
const { webpackCompile } = require("./screenshot/lib/compile");
import { getWebpackConfig } from "@krakenjs/webpack-config-grumbler";
import globals from "../../globals";
import { getTestGlobals } from "./globals";

const hostname = "127.0.0.1";
const port = 8111;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/javascript");
  console.log('hit');

  const filePath = await webpackCompile(
    getWebpackConfig({
      entry: "./test/paypal.js",
      libraryTarget: "window",
      test: true,
      web: false,
      vars: { ...getTestGlobals(globals) },
    })
  );

  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
