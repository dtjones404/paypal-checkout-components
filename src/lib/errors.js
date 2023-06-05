/* @flow */

import { warn } from 'beaver-logger/client';

import { isIE, isIEIntranet, isIECompHeader } from './device';

function logWarn(err) : void {
    if (window.console) {
        if (window.console.warn) {
            return window.console.warn(err);
        }

        if (window.console.log) {
            return window.console.log(err);
        }
    }
}

export function checkForDeprecatedIntegration() {
    const scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

    for (const script of scripts) {
        if (script.attributes.type && 
            script.attributes.type.value === 'application/x-component') {
            warn('deprecated_integration_application_xcomponent');

            // eslint-disable-next-line no-console
            console.error(`
                This integration pattern using '<script type="application/x-component">' is no longer supported.
                Please visit https://developer.paypal.com/demo/checkout-v4/
                for an example of the new recommended integration pattern.
            `);
        }
    }
}

export function checkForCommonErrors() {

    if (JSON.stringify([]) !== '[]') {
        if (Array.prototype.toJSON) {
            logWarn(`Custom Array.prototype.toJSON is causing incorrect json serialization of arrays. This is likely to cause issues. Probable cause is Prototype.js`);
        } else {
            logWarn(`JSON.stringify is doing incorrect serialization of arrays. This is likely to cause issues.`);
        }

        warn(`json_stringify_array_broken`);
    }

    if (JSON.stringify({}) !== '{}') {
        logWarn(`JSON.stringify is doing incorrect serialization of objects. This is likely to cause issues.`);

        warn(`json_stringify_object_broken`);
    }

    if (isIEIntranet()) {
        warn(`ie_intranet_mode`);
    }

    if (isIE() && !isIECompHeader()) {
        warn(`ie_meta_compatibility_header_missing`, {
            message: `Drop tag: <meta http-equiv="X-UA-Compatible" content="IE=edge">` });
    }

    // eslint-disable-next-line no-unused-vars
    function foo(bar, baz, zomg) {
        // pass;
    }

    if (foo.bind({ a: 1 }).length !== 3) {
        warn(`function_bind_arrity_overwritten`);
    }

    if (window.opener && window.parent !== window) {
        warn(`window_has_opener_and_parent`);
    }
}
