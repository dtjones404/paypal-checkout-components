// eslint-disable-next-line import/no-nodejs-modules
import fs from "fs";

import percySnapshot from "@percy/playwright";
import test from "@playwright/test";

import { dotifyToString } from "../lib/util";
import { openPage } from "../lib/browser";
import { testContent } from "../content";

// eslint-disable-next-line no-process-env
const HEADLESS = process.env.HEADLESS !== "0";
// eslint-disable-next-line no-process-env
const DEVTOOLS = process.env.DEVTOOLS === "1";

test.setTimeout("1200000");

const buttonConfigs = JSON.parse(
  // eslint-disable-next-line no-sync
  fs.readFileSync("./test/percy/files/buttonConfig.json")
);

const takeScreenshot = async (buttonConfig, description) => {
  const { page } = await openPage("/", "/sdk/js", {
    headless: HEADLESS,
    devtools: DEVTOOLS,
  });

  buttonConfig.button = buttonConfig.button || {};
  buttonConfig.button.content = testContent;

  const { width, height } = await page.evaluate(async (options) => {
    const container = window.document.createElement("div");
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

    // eslint-disable-next-line no-undef
    const renderPromise = paypal
      .Buttons(options.button || {})
      .render(container);

    const frame = container.querySelector("iframe");
    frame.id = "paypal-buttons";

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

  if (width === 0) {
    throw new Error(`Button width is 0`);
  }

  if (height === 0) {
    throw new Error(`Button height is 0`);
  }

  await percySnapshot(page, `${description}`, { scope: "#paypal-buttons" });
};

test.describe.configure({ mode: "parallel" });
test.use({
  viewport: {
    width: 1000,
    height: 1000,
    deviceScaleFactor: 2,
  },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
});

for (let i = 0; i < buttonConfigs.length; i++) {
  const buttonConfig = buttonConfigs[i];
  const description = dotifyToString(buttonConfig) || "base";

  test(`Render button with ${description}`, async () => {
    await takeScreenshot(buttonConfig, description);
  });
}
