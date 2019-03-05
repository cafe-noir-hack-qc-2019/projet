/**
 * # Global store
 * > for our /api/global stuff
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import { get, each, set } from 'lodash';
import ApiHelper from 'utils/helpers/Api';

const debug = process.env.NODE_ENV === 'development'; // && false;

export default {
  namespaced: true,
  state() {
    return {
      api: {
        url: 'globals',
        moc: debug,
        getMoc(locale) {
          return import(`assets/moc/globals/${locale}`);
        },
      },
      data: {
        seo: null,
        navigation: null,
        contact: {},
        socials: {},
        marquee: {
          items: [
            {
              type: '',
              message: '',
              priority: '',
              startDate: '',
              endDate: '',
            },
          ],
        },
        jobs: {},
      },
    };
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
  },
  actions: {
    /**
     * load our global
     * and dispatch i18n datas (if any) to the correct store
     * @param {VuexAction} store - action's store
     * @param {String} locale - @todo use this for api... somehow
     */
    LOAD({ commit, state }, locale) {
      const request = ApiHelper.request(state.api)
      .then((response) => {
        commit('SET_DATA', response);
        return response;
      });

      // if i18n, add them to I18n store
      request.then(({ i18n }) => {
        if (!i18n) return;

        /*
          Format i18n to true object
          ```
           {
             "portfolio.client.firstname": "George",
             "portfolio.client.lastname": "Orwels"
           }
          ```
          will become
          ```
          {
            portfolio:{
              client: {
                firstname: 'George',
                lastname: 'Orwels',
              }
            }
          }
          ```
        */
        const messages = {};
        each(i18n, (value, key) => {
          set(messages, key, value);
        });

        this.dispatch('I18n/ADD_LOCALE_MESSAGES', {
          locale,
          messages,
        });
      });
      return request;
    },
  },
  getters: {
    data: ({ data }) => data,
    metadata: ({ data }) => data.seo,
    contact: ({ data }) => get(data, 'contact'),
    socials: ({ data }) => get(data, 'socials'),
    menu: ({ data }) => get(data, 'navigation'),
    jobs: ({ data }) => get(data, 'jobs'),
  },
};
