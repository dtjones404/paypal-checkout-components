/* @flow */
/** @jsx node */

import { node, dom, type ChildType } from '@krakenjs/jsx-pragmatic/src';
import { FUNDING, CARD, FPTI_KEY } from '@paypal/sdk-constants/src';
import { popup, supportsPopups, writeElementToWindow } from '@krakenjs/belter/src';
import { assertSameDomain, type CrossDomainWindowType } from '@krakenjs/cross-domain-utils/src';
import { SpinnerPage } from '@paypal/common-components/src';
import { getLogger } from '@paypal/sdk-client/src';
import type { ZoidProps } from '@krakenjs/zoid/src';

import { DEFAULT_POPUP_SIZE } from '../checkout';
import { EXPERIENCE } from '../../constants';
import { Buttons } from '../../ui';
import { type ButtonProps } from '../../ui/buttons/props';
import { getPrefetchCDNExperiment } from '../../lib/getLogoCDNExperiment';

type PrerenderedButtonsProps = {|
    nonce : ?string,
    props : ZoidProps<ButtonProps>,
    onRenderCheckout : ({|
        win? : CrossDomainWindowType,
        fundingSource : $Values<typeof FUNDING>,
        card : ?$Values<typeof CARD>
    |}) => void
|};

function prefetchImage(src: string): void {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "image";
  link.href = src;
  document.head?.append(link);
}

export function PrerenderedButtons({ nonce, onRenderCheckout, props } : PrerenderedButtonsProps) : ChildType {
    let win;

    if (getPrefetchCDNExperiment().isEnabled()) {
      prefetchImage('https://www.paypalobjects.com/js-sdk-logos/2.1.1/ideal-default.svg'
      )
    }
    
    const handleClick = (
        // eslint-disable-next-line no-undef
        event : SyntheticInputEvent<HTMLInputElement>,
        { fundingSource, card } : {|
            fundingSource : $Values<typeof FUNDING>,
            card : ?$Values<typeof CARD>
        |}
    ) => {
        getLogger().info('button_prerender_click').track({
            [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID,
            [ FPTI_KEY.CONTEXT_TYPE ]:       'button_session_id',
            [ FPTI_KEY.CONTEXT_ID ]:         props.buttonSessionID,
            [ FPTI_KEY.TRANSITION ]:         'process_button_prerender_click',
            [ FPTI_KEY.CHOSEN_FUNDING]:      fundingSource
        }).flush();

        if (fundingSource === FUNDING.VENMO || fundingSource === FUNDING.APPLEPAY || (fundingSource === FUNDING.CARD && props.experience === EXPERIENCE.INLINE)) {
            // wait for button to load
        } else if (supportsPopups() && !props.merchantRequestedPopupsDisabled) {
            // remember the popup window to prevent showing a new popup window on every click in the prerender state
            if (!win || win.closed) {
                win = assertSameDomain(popup('', {
                    width:  DEFAULT_POPUP_SIZE.WIDTH,
                    height: DEFAULT_POPUP_SIZE.HEIGHT
                }));
            }

            const doc = window.document;

            const spinner = (
                <SpinnerPage nonce={ nonce } />
            ).render(dom({ doc }));

            writeElementToWindow(win, spinner);

            onRenderCheckout({ win, fundingSource, card });

        } else {
            onRenderCheckout({ fundingSource, card });
        }
    };

    return (
        <html>
            <body>
                {/* $FlowFixMe */}
                <Buttons { ...props } onClick={ handleClick } />
            </body>
        </html>
    );
}
