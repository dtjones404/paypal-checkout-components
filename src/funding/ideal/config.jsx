/* @flow */
/** @jsx node */

import { IdealLogo } from '@paypal/sdk-logos/src';
import { Fragment, node } from '@krakenjs/jsx-pragmatic/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_APM_FUNDING_CONFIG, type FundingSourceConfig, BasicLabel } from '../common';
import { Text, Space } from '../../ui/text';
import { getLogoCDNExperiment } from '../../lib/getLogoCDNExperiment';

export function getIdealConfig() : FundingSourceConfig {
    let logoCDNExperiment;

    if (__WEB__) {
        logoCDNExperiment = getLogoCDNExperiment()
        console.log('asdf', logoCDNExperiment.isEnabled());
    }

    return {
        ...DEFAULT_APM_FUNDING_CONFIG,

        shippingChange: false,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => IdealLogo({ logoColor, optional, logoCDNExperiment }),

        Label: ({ logo, ...opts }) => {
            if (__WEB__) {
                return logo;
            }

            const apmLogo = (
                <Fragment>
                    { logo }<Space /><Text animate optional>iDEAL</Text>
                </Fragment>
            );

            return (<BasicLabel
                { ...opts }
                logo={ apmLogo }
            />);
        }
    };
}
