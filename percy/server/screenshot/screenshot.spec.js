/* @flow */

import { chromium } from "playwright";
import percySnapshot from "@percy/playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const buttonConfig = {};
  console.log('asdf');

  const { x, y, width, height } = await page.evaluate(async (options) => {
    // $FlowFixMe
    // eslint-disable-next-line compat/compat
    document.body.innerHTML = "";

    const script = window.document.createElement("script");
    script.src = "http://localhost:8111";
    window.document.head.appendChild(script);

    throw `${JSON.stringify(window.document.head)}`

    await new Promise((resolve) => setTimeout(resolve, 9000));

    const container = window.document.createElement("div");
    // eslint-disable-next-line compat/compat
    window.document.body.appendChild(container);

    if (options.fundingEligibility) {
      window.__TEST_FUNDING_ELIGIBILITY__ = options.fundingEligibility;
    }

    if (options.wallet) {
      window.__TEST_WALLET__ = options.wallet;
    }

    if (options.rememberedFunding) {
      window.__TEST_REMEMBERED_FUNDING__ = options.rememberedFunding;
    }

    if (options.container) {
      container.style.width = `${options.container.width}px`;
    } else {
      container.style.width = "200px";
    }

    if (options.userAgent) {
      const screenHeight = 667;

      window.navigator.mockUserAgent = options.userAgent;
      window.outerHeight = screenHeight;
      window.innerHeight = 553;
      window.screen = {
        screenHeight,
      };
    }

    const renderPromise = window.paypal
      .Buttons(options.button || {})
      .render(container);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const frame = container.querySelector("iframe");

    if (!frame) {
      await renderPromise.timeout(500);
    }

    const rect = frame.getBoundingClientRect();

    delete window.navigator.mockUserAgent;
    delete window.__TEST_FUNDING_ELIGIBILITY__;
    delete window.__TEST_REMEMBERED_FUNDING__;

    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }, buttonConfig);

  console.log('after eval')

  if (width === 0) {
    throw new Error(`Button width is 0`);
  }

  if (height === 0) {
    throw new Error(`Button height is 0`);
  }

  // const existingExists = await fs.exists(filepath);

  // const [screenshot, existing] = await Promise.all([
  //   takeScreenshot(page, { x, y, width, height }),
  //   existingExists ? readPNG(filepath) : null,
  // ]);

  // if (existing) {
  //   let delta;

  //   try {
  //     delta = await diffPNG(screenshot, existing);
  //   } catch (err) {
  //     await existing.write(diffpath);
  //     await screenshot.write(filepath);
  //     throw err;
  //   }

  // } else {
  //   await screenshot.write(filepath);
  // }

  await percySnapshot(page, "Example Site");
  await browser.close();
})();
