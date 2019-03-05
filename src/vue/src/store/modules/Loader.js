/**
 * # (Pre)Loader
 * > to know when our app is ready + hook to add stuff to preload
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
// import ApiHelper from 'utils/helpers/Api';

// const DEBUG = true;

export default {
  namespaced: true,
  state: {
    loaded: false,
    promises: [],
  },
  mutations: {
    LOADER_LOADED(state) {
      state.loaded = true;
    },
    PROMISE_PUSH(state, promise) {
      if (state.promises) { state.promises.push(promise); }
    },
    PROMISE_DEACTIVATE(state) {
      state.promises = null;
    },
  },
  actions: {
    LOAD_GLOBALES() {
      // return ApiHelper.getApiPromise('Settings.globalesOptions')
      //   .catch((error) => {
      //     if (DEBUG) {
      //       return {};// import('commons/moc/index.json');
      //     }
      //     throw (error);
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   // .then(({ i18n, metadata }) => {
      //   //   commit('SET_I18N', { fr: i18n });
      //   //   // commit('SET_METADATA', metadata);
      //   // })
      //   .catch((error) => {
      //     console.error('[App/LOAD_API] error', error);
      //   });
    },
  },
  getters: {
    loaded: state => state.loaded,
    promises: state => state.promises,
  },
};
