/**
 * # Social helpers
 * > Some utilities about social (sharing etc)
 *
 * @requires lodash
 * @author nicolas husson <nicolas@kffein.com>
 */

import { get, assign, without, map } from 'lodash';

export default class SocialHelper {
  /**
   * init facebook sdk
   * @returns {void}
   * @param {String} appid - facebook APP_ID
   */
  static initFacebookSDK(appid = '') {
    console.log('init fb', appid);
    window.fbAsyncInit = function () { // eslint-disable-line func-names
      window.FB.init({
        appId: appid,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.11',
      });
    };

    (function (d, s, id) { // eslint-disable-line func-names
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }


  /**
   * Share on facebook - will share this page and use og metas (open a popin - new window)
   * @returns {Function} success/error callback EXECUTED ! - usefull if promise
   * @param {Function} opts.succes - success callback
   * @param {Function} opts.error - errors callback
   *
   * @todo add params to ovverride title, description...
   */
  static shareFacebook(opts = {}) {
    const options = assign({
      success(response) {
        console.log('shareFacebook success', response);
      },
      error(error) {
        console.log('shareFacebook error', error);
      },
    }, opts);

    if (!window.FB) {
      throw new Error('window.FB is undefined - https://developers.facebook.com/docs/sharing/reference/share-dialog');
    }
    window.FB.ui({
      method: 'share',
      href: 'https://developers.facebook.com/docs/',
    }, (response) => {
      const errorMessage = get(response, 'error_message');
      if (errorMessage || !response) {
        return options.error(errorMessage);
      }
      return options.success(response);
    });
  }


  /**
   * Share on twitter (open a popin - new window)
   * @returns {void}
   * @param {String} options.text - text to share
   * @param {String} options.hashtags - (optional)
   */
  static shareTwitter(opts = {}) {
    const options = assign({
      text: null,
      hashtags: null,
      url: encodeURIComponent(window.location.origin + window.location.pathname),
    }, opts);

    const params = without(
      map(options, (value, key) => {
        if (!value) {
          return null;
        }
        return `${key}=${value}`;
      }),
      null, undefined, '',
    );

    const POPUP_WIDTH = 560;
    const POPUP_HEIGHT = 440;
    const TOP = (window.innerHeight - POPUP_HEIGHT) / 2;
    const LEFT = (window.innerWidth - POPUP_WIDTH) / 2;

    const url = `https://twitter.com/intent/tweet?${params.join('&')}`;
    window.open(url, '_blank', `toolbar=no,top=${TOP},left=${LEFT},width=${POPUP_WIDTH},height=${POPUP_HEIGHT}`);
  }


  /**
   * Share on email - just open your email and prefill body
   * @returns {void}
   * @param {String} options.to - mail to
   * @param {String} options.subject - text to put in subject
   * @param {String} options.message - text to put in body message
   */
  static shareEmail(opts = {}) {
    const options = assign({
      to: '',
      subject: null,
      message: null,
    }, opts);

    const params = without(
      map(options, (value, key) => {
        if (!value || key === 'to') {
          return null;
        }
        return `${key}=${value}`;
      }),
      null, undefined, '',
    );

    const POPUP_WIDTH = 560;
    const POPUP_HEIGHT = 440;
    const TOP = (window.innerHeight - POPUP_HEIGHT) / 2;
    const LEFT = (window.innerWidth - POPUP_WIDTH) / 2;

    const url = `mailto:${options.to}?${params.join('&')}`;
    window.open(url, '_blank', `toolbar=no,top=${TOP},left=${LEFT},width=${POPUP_WIDTH},height=${POPUP_HEIGHT}`);
  }
}
