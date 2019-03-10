/**
 * # App Settings
 * > app global constants
 *
 * @author Camille Boissel <camille@kffein.com>
 */

import { merge } from 'lodash';

const settings = {
  /** @argument {Array} locales - list of all supported locales, in order - may be `fr-ca`, `en-us` or just `en` */
  locales: ['en', 'fr'],

  /** @argument {Boolean} reloadOnSwitchLangue - if false, be sur to update all your datas */
  reloadOnSwitchLangue: true,

  BASE_URL: ((env) => {
    // @todo may add some othen env vars to differentiate output platform when production
    switch (env) {
      // local
      case 'development':
        return 'https://info311.servehttp.com/';
      // build for prod
      case 'production':
      default:
        return 'https://info311.servehttp.com/';
    }
  })(process.env.NODE_ENV),

  /** @argument {String} API_PREFIX - to construct API_URL */
  API_PREFIX: 'api',

  /** @argument {String} API_URL - if null, create it below : `${BASE_URL}/${API_PREFIX}` */
  API_URL: 'https://1938c3d0-0862-4403-8cbb-1f3385417141.mock.pstmn.io/api',

  /** @argument {Array} cookies - list of cookies names, please keep locale */
  cookies: {
    locale: 'cafe-noir_locale', // not sure about this?
  },

  /** @argument {Object} axios - axios config on create */
  axios: {
    withCredentials: process.env.NODE_ENV === 'development',
  },
};

/**
 * merge Setting with those injected in dom `window.__ENV`
 */
if (typeof (window) !== 'undefined') {
  // disable loader for prerender.io
  if (/PhantomJS/.test(window.navigator.userAgent)) { settings.loader = false; }

  // OVERWRITE BY PHP ENV
  if (typeof (window) !== 'undefined' && window.__ENV !== undefined) { // eslint-disable-line no-underscore-dangle
    merge(settings, window.__ENV); // eslint-disable-line no-underscore-dangle
  }
}

/**
 * Auto contruct API_URL
 */
if (!settings.API_URL && settings.API_PREFIX && settings.BASE_URL) {
  settings.API_URL = `${settings.BASE_URL}/${settings.API_PREFIX}/`;
}

export default settings;
