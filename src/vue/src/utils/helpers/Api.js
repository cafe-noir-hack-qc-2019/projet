/**
 * # API helpers
 * > Manage our api calls
 *
 * @todo :
 * - [ ] fix axios (was vue.$http)
 * - [ ] moc utils
 * - [ ] client cache (persistate vuex ? lastmodified check (see @nicolas))
 *
 * @author Camille Boissel <boissel.camille@gmail.com>
 * @author Nicolas Husson <nicolas@kffein.com>
 */

import Axios from 'axios';
import {
 assign, flatten, values, merge, groupBy, get,
} from 'lodash';
import settings from 'src/settings';
import router from 'router';

const debug = process.env.NODE_ENV === 'development'; // && false;

/**
 * # API service
 * > Manage our api calls
 *
 * @todo :
 * - [ ] moc utils
 * - [ ] client cache (persistate vuex ? lastmodified check (see @nicolas))
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */

let locale = null; // eslint-disable-line
const httpService = Axios.create({
  baseURL: settings.API_URL,
  ...settings.axios,
});
export default class ApiHelper {
  /**
   * update our locale (because we don't have access to store here)
   * Must be called on I18n/SET_LOCALE
   * @param {String} newLocale - 'fr-ca'|'en-ca'
   */
  static setLocale(newLocale) {
    locale = newLocale;
  }

  /**
   * do an API request
   * - can moc data (pass moc and getMoc options) - @todo doc
   * - return only response data (do not wrap in some data node like axios do etc)
   *
   * @todo
   *  - [ ] tests + docs
   *
   * @param {Object} opts - axios api options @see https://github.com/axios/axios#request-config
   * @param {Boolean} opts.moc - if true, will fetch opts.getMoc()
   * @param {Function} opts.getMoc - Function that return Promise to fetch moc datas (only if opts.moc=true)
   */
  static request(opts) {
    const options = assign({
      method: 'get',
      catch: true,
      moc: false,
      headers: {
        'Content-language': locale,
        // Language: locale,
      },
    }, opts);

    // may fetch moc datas
    const request = new Promise((resolve) => {
      if (options.moc && typeof options.getMoc === 'function') {
        return resolve(
          ApiHelper.getMoc(options.getMoc.bind(null, locale)),
        );
      }
      return resolve(
        httpService.request(options)
        // return only axio's data response
        // and check if error (because yep, 200 may be errors...)
        .then(({ data }) => {
          if (data.errorCode) {
            throw new Error(`${data.message} : ${options.url}`);
          }
          return data;
        }),
      );
    })
    // If error 404, redirect
    // but re-throw error - else flow will continue after this catch
    .catch((error) => { // eslint-disable-line no-unused-vars
      const { response } = error;
      const code = get(response, 'data.errorCode');
      if (code === '404') {
        let shouldRedirect = true;
        if (debug) {
          console.warn('REDIRECT 404', { ...error }); // eslint-disable-line no-console
          // eslint-disable-next-line no-alert
          shouldRedirect = window.confirm(`API error ${code} - ${get(response, 'data.message')}\n${get(response, 'request.responseURL')}\n\nallow redirect 404 ?`);
        }

        if (shouldRedirect) {
          router.replace({ name: `404.${locale}` });
        }
      }
      // throw error because if nop, will continue our promise chain but without response
      throw error;
    });

    return request;
  }

  /**
   * do a GET api call (through `request`)
   * @param {String} url - api url (without API_URL - home = http://host.com/api/home)
   * @param {Object} opts - axios api options
   */
  static get(url, opts) {
    const options = assign({
      method: 'get',
      url,
    }, opts);
    return ApiHelper.request(options);
  }

  /**
   * do a POST api call (through `request`)
   * @param {String} url - api url (without API_URL - home = http://host.com/api/home)
   * @param {Object} data - datas to send
   * @param {Object} opts - axios api options
   */
  static post(url, data, opts) {
    const options = assign({
      method: 'post',
      url,
      data,
    }, opts);
    return ApiHelper.request(options);
  }

  /**
   * return only content (`default`) of the imported module
   * @param {Promise} request - eg import()
   */
  static getMoc(request) {
    return request().then(Module => Module.default);
  }

  static mergeCollection(collection, items, key = 'id') {
    return flatten(
      values(
        merge(
          groupBy(collection, key),
          groupBy(items, key),
        ),
      ),
    );
  }

  // /**
  //  * FORGET THIS since we can't mutate state.status from here
  //  *
  //  * handle loading states of a vuex store
  //  * check state (param) to break if currently loading, and set status.loaded at the end
  //  * @param {Function:Promise} doRequest - function that return Promise
  //  * @param {Object} status - a vuex state.status with at least {loading, loaded}
  //  */
  // static handleLoadingStates(doRequest, status) {
  //   const ERRORS = {
  //     IN_PROCESS: 'loading already in process',
  //   };
  //   return new Promise((resolve, reject) => {
  //     console.log('handleLoadingStates', { ...status });

  //     if (status.loading || status.loaded) {
  //       return reject(new Error(ERRORS.IN_PROCESS));
  //     }
  //     status.loading = true;
  //     return resolve(doRequest());
  //   })
  //   .then(() => {
  //     status.loading = false;
  //     status.loaded = true;
  //   })
  //   // handle errors (only IN_PROCESS, else rethrow it)
  //   .catch((error) => {
  //     switch (error.message) {
  //       case ERRORS.IN_PROCESS:
  //         return;

  //       default:
  //         throw (error);
  //     }
  //   });
  // }
}
