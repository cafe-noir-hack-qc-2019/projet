/**
 * # ApiPage store behaviour
 * > for our demo page, moc some page with a big list of pagebuilder
 *
 *  - must call 'LOAD' action
 * - will fetch api
 * - mocable
 * - set datas in state.data + getters
 * - set `state.status = {loading, loaded}` + getters
 *
 * @exemple
 *
 * ```
 *  import composer from 'store/composer';
 *  import ApiPageBehaviour from 'store/behaviors/ApiPage';
 *  const store = {
 *    namespaced: true,
 *    state() {
 *      return {
 *        data:{},
 *        api:{
 *          url: 'global',
 *          moc: true,
 *          getMoc() {
 *            return import('./global.json');
 *          },
 *        }
 *      }
 *    }
 *    ...
 *  }
 *  export default composer(store, ApiPageBehaviour())
 * ```
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import { assign, merge } from 'lodash';
import ApiHelper from 'utils/helpers/Api';

export default function () {
  return {
    state() {
      return {
        // api config
        api: {
          url: '',
          moc: null,
          getMoc(/* locale */) {
            // return import('./moc');
          },
        },
        // loading status
        status: {
          loading: false,
          loaded: false,
        },
        // page datas (without meta ans theme)
        data: {},
        // metadata (seo formated)
        metadata: {},
        // page's color theme
        theme: {},
      };
    },
    mutations: {
      /**
       * store api response inside our datas
       * ATTENTION, please do not forget to replicate all that function if you override it
       * @param {*} state
       * @param {*} data
       * @return {Object} data
       */
      SET_DATA(state, data) {
        state.data = data;
        return data;
      },

      /**
       * Set loading status - so can avoid multiples call same api
       * @param {*} state
       * @param {*} status
       * @return {Object} state.status
       */
      SET_LOADING_STATUS(state, status = {}) {
        state.status = merge(state.status, status);
        return state.status;
      },

      /**
       * Set page's theme
       * !!! KFFEIN specific
       *
       * @param {*} state
       * @param {Object} theme - api's colorTheme data
       * @return {Object} state.status
       */
      SET_THEME(state, theme) {
        state.theme = theme;
        return theme;
      },

      /**
       * Format seo datas for our metadata mixin
       * NOTE : api will return a shit load of data for images, but we only need src
       * @param {*} state
       * @param {Object} seo - api response seo node
       * @return {Object} metadata (formated)
       */
      SET_METADATA(state, seo) {
        if (!seo) return null;

        const {
          title, description, keywords, social,
        } = seo;

        const metadata = {
          title,
          description,
          keywords,
          // direct facebook, twitter - not social node
          ...social,
        };


        state.metadata = metadata;
        return metadata;
      },
    },
    actions: {
      /**
       * load our stuff
       * @param {VuexAction} store - action's store
       */
      LOAD({ commit, state }, opts = {}) {
        // merge some options within defaults
        const options = assign({
          debug: true,
          getMoc() {},
          url: null,
        }, state.api, opts);
        // option.api override option.url
        if (opts.api) {
          options.url = opts.api;
        }

        // return if already loading/loaded
        const { status } = state;
        if (status.loading || status.loaded) {
          const reason = status.loading ? 'currently loading' : 'already loaded';
          return Promise.reject(new Error(`[SKIP API LOAD] '${options.url}' ${reason}`))
          .catch(({ message }) => {
            if (process.env.NODE_ENV === 'development') {
              console.info(message); // eslint-disable-line no-console
            }
          });
        }

        commit('SET_LOADING_STATUS', {
          loading: true,
        });

        return ApiHelper.request(options)
        // update our loading state
        .then((response) => {
          commit('SET_LOADING_STATUS', {
            loading: false,
            loaded: true,
          });
          return response;
        })
        // store page seo / theme
        // and return only the rest (data)
        .then(({ colorTheme, seo, ...data }) => {
          if (colorTheme) {
            commit('SET_THEME', colorTheme);
          }
          if (seo) {
            commit('SET_METADATA', seo);
          }
          return data;
        })
        // store our datas
        .then(commit.bind(this, 'SET_DATA'))
        .catch(() => {
          // do nothing...
        });

        // return ApiHelper.handleLoadingStates(request, commit.bind('SET_LOADING_STATUS'));
      },
    },
    getters: {
      loaded: ({ status }) => status.loaded,
      metadata: ({ metadata }) => metadata,
      theme: ({ theme }) => theme,
      data: ({ data }) => data,
    },
  };
}
