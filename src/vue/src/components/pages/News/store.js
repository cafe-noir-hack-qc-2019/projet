/**
 * # News store
 * > handle all datas about news (even for homepage's entries)
 *
 * In that store :
 * - data will represent the collection's page datas
 * - entries will represent the list of each entries's datas
 * - same store for the collection and single page
 *
 * @todo
 * - Clean way to store single page data that is recurrent for each articles
 * - BE CAREFULL WITHIN MOC SYSTEM since we always return same news datas...
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import {
  set, map, find, assign, each,
} from 'lodash';
import composer from 'store/composer';
import ApiPageBehaviour from 'store/behaviors/ApiPage';
import ApiHelper from 'utils/helpers/Api';

import mergeState from 'vue-object-merge';

const debug = process.env.NODE_ENV === 'development'; // && false;

const store = {
  namespaced: true,
  state() {
    return {
      apis: {
        collection: {
          url: 'pages/news',
          moc: debug,
          getMoc() {
            return import('assets/moc/news/collection');
          },
        },
        single: {
          url: 'news/:slug',
          moc: debug,
          getMoc() {
            return import('assets/moc/news/single');
          },
        },
      },
      /**
       * @argument {Object} data - collection's page data
       */
      data: {
        pagebuilder: [],
      },
      /**
       * @argument {Array} entries list all news
       * - can be simple (minimum datas for listings)
       * - or full (all datas for single detailed page - `status.loaded = true`)
       * - be carefull to keep collection's call order
       *   - you may load some singles though home then load all collection's one - so keep collection's order
       *
       */
      entries: [],
    };
  },
  mutations: {
    /**
     * Override ApiPage SET_DATA
     * So when call api/portfolio
     *
     * We want to merge all projects and caseStudies in the same propertie (entries)
     * So entries will be the array of projects and caseStudies (same shit)
     * and will use computed / getters to diferenciate them
     * ---
     * Always keep this call order, and update each entry of that call within stored entries
     * because we may have already loaded single project before going to that page
     *
     * So it will be easier to update one entry
     *
     * @param {Object} state
     * @param {Object} payload api response
     */
    SET_DATA(state, payload) {
      // here data is all payload without entries
      // so its all about list page data
      const { entries, ...data } = payload;

      // loop previously stored and update current value (so keep same order)
      // just update the current entry will update our works const list
      each(state.entries, (entryFromSingle) => {
        const entryFromCollection = find(entries, { slug: entryFromSingle.slug });
        assign(entryFromCollection, entryFromSingle);
      });

      // store entries + data
      mergeState(state, { entries, data });

      return data;
    },
    /**
     * Set a single entry data (same for projects/case-suties)
     * ---
     * if no entries (not loaded collection), simply add this entry
     * else, find the same entry and update it (so keep same order when back to list)
     *
     * @param {Object} state
     * @param {Object} data - single project's data
     */
    SET_SINGLE_DATA(state, data) {
      if (!find(state.entries, { slug: data.slug })) {
        state.entries.push(data);
      } else {
        const entries = map(state.entries, (entryFromCollection) => {
          if (entryFromCollection.slug === data.slug) {
            return data;
          }
          return entryFromCollection;
        });
        mergeState(state, { entries });
      }
      return state.entries;
    },
  },
  actions: {
    /**
     * load a single work (project or case-studie)
     * @param {VuexAction} store - action's store
     * @param {Object} payload
     * @param {String} payload.slug - slug of our project
     * @param {String} payload.type - project or case-studie
     */
    LOAD_SINGLE({ commit, state, getters }, slug) {
      const options = assign({}, state.apis.single);
      options.url = options.url.replace(':slug', slug);

      // skip if already loaded
      const entry = getters.getEntryBySlug(slug);
      if (entry) {
        const { status } = entry;

        // skip if already loaded
        if (status && (status.loading || status.loaded)) {
          const reason = status.loading ? 'currently loading' : 'already loaded';
          return Promise.reject(new Error(`[Works] LOAD_SINGLE '${options.url}' ${reason}`))
          .catch(({ message }) => {
            if (process.env.NODE_ENV === 'development') {
              console.info(message); // eslint-disable-line no-console
            }
          });
        }

        set(entry, 'status.loading', true);
      }

      return ApiHelper.request(options)

      // @TODO REMOVE THIS !!! hardcode slug due to moc system
      .then((response) => {
        if (options.moc) {
          console.warn('IMPORTANT !!! REMOVE THIS - news/store.js LOAD_SINGLE assign slug to response due to moc system');
          assign(response, { slug });
        }
        return response;
      })

      // update our loading state
      .then((response) => {
        assign(response, {
          status: {
            loading: false,
            loaded: true, // eg complete version
          },
        });

        return response;
      })
      // // update App's color theme
      // .then((response) => {
      //   const { colorTheme } = response;
      //   if (colorTheme) {
      //     this.commit('App/SET_THEME', colorTheme);
      //   }
      //   return response;
      // })
      // store our datas
      .then(commit.bind(this, 'SET_SINGLE_DATA'))
      .catch(() => {
        // do nothing...
      });
    },
  },
  getters: {

    /* ***************************
      COLLECTION PAGE DATA
    *************************** */

    /**
     * @returns {Object} collection page's datas
     */
    data: ({ data }) => data,
    pagebuilder: ({ data }) => data.pagebuilder,

    /* ***************************
      SINGLE ENTRIES
    *************************** */

    /**
     * @returns {Array[String]} array of entries
     */
    entries: ({ entries }) => entries,
    /**
     * @param {String} slug - slug of your entry
     *
     * @returns {Object} entry's datas
     *
     * Notes:
     * - because this is a function, there is no cache here
     * - For mocking purpose, we may return 1st entry because slug may not match
     *   - just in the case you load our demo from a single news directly
     */
    getEntryBySlug: (state, { entries }) => (slug) => { // eslint-disable-line
      return find(entries, { slug });
    },
  },
};

/**
 * compose our store with ApiPageBehaviour so will fetch `state.data` from api
 * and handle a `state.status`
 */
export default composer(store, ApiPageBehaviour());
