/* eslint no-restricted-globals: 0 */
/* eslint no-console: 0 */
/* eslint no-process-exit: 0 */
/* eslint unicorn/no-process-exit: 0 */
/* eslint import/no-nodejs-modules: 0 */

import { chromium } from "playwright";

export async function openPage(
  pageURL,
  scriptURL,
  { headless = true, devtools = false }
) {
  const browser = await chromium.launch({
    headless,
    devtools,
    args: ["--no-sandbox"],
  });

  const open = async () => {
    const page = await browser.newPage({ ignoreHTTPSErrors: true });

    page.on("error", (err) => {
      console.error("Browser error:", err.stack);
      process.exit(1);
    });

    await page.goto(pageURL);

    await page.addScriptTag({ url: scriptURL });

    return page;
  };

  return {
    browser,
    page: await open(),
    open,
  };
}

// export async function takeScreenshot(page, { x, y, width, height }) {
//   const path = `${os.tmpdir()}/${Math.random().toString()}.png`;

//   await page.screenshot({
//     path,
//     clip: { x, y, width, height },
//   });

//   const png = await readPNG(path);

//   return png;
// }
