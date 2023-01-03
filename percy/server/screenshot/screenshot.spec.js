/* @flow */

import { chromium } from "playwright";
import percySnapshot from "@percy/playwright";
import test, { expect } from "@playwright/test";
import fs from 'fs';

test.setTimeout('1200000');

const buttonConfigs = JSON.parse(fs.readFileSync(
  './percy/server/screenshot/files/buttonConfig.json'
));

const takeScreenshot = async (config, i) => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ignoreHTTPSErrors: true });
  // page.on('console', (e) => console.log(e));
  await page.goto('http://localhost.paypal.com:8111')
  

  const { x, y, width, height } = await page.evaluate(async (options) => {
    // $FlowFixMe
    // eslint-disable-next-line compat/compat
    // document.body.innerHTML = "";

    const script = window.document.createElement('script');
    script.src = "http://localhost:8111/sdk/js"
    window.document.head.appendChild(script);

    await new Promise((resolve) => setTimeout(resolve, 14000));
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

    const renderPromise = paypal
      .Buttons(options.button || {})
      .render(container);

    

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
  }, config);

  console.log('after eval')

  if (width === 0) {
    throw new Error(`Button width is 0`);
  }

  if (height === 0) {
    throw new Error(`Button height is 0`);
  }

  await percySnapshot(page, `Example Site ${i}`);
  await browser.close();
}

test.describe.configure({ mode: 'parallel' });

for (let i = 0; i < buttonConfigs.length; i++) {


  test(`${i}`, async () => {
  // for (let i = 0; i < buttonConfigs.length; i++) {
  //   const buttonConfig = buttonConfigs[i];
  //   console.log(buttonConfig, i)
  //   test(`${i}`, () => {
      await takeScreenshot(buttonConfigs[i], i)
    // });
  // }
  })
}


  

