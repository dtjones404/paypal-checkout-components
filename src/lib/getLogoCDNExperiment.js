/* @flow */

import { createExperiment } from "@paypal/sdk-client/src";
import type { Experiment } from "@krakenjs/belter/src";

export function getLogoCDNExperiment(): Experiment {
  return createExperiment("enable_logo_cdn", 100);
}

export function getPrefetchCDNExperiment(): Experiment {
  return createExperiment("enable_prefetch_cdn", 50);
}
