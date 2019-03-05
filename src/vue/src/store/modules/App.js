/**
 * # App store
 * > Manage our low level states
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
const debug = process.env.NODE_ENV === 'development'; // && false;

export default {
  namespaced: true,
  state: {
    debug,
    ready: false, // true if all content loaded
    outdated: false, // force app to reload and fetch data if app is outdated
  },
  mutations: {
    SET_READY(state, payload) {
      state.ready = payload;
    },
    SET_OUTDATED(state, payload) {
      state.outdated = payload;
    },
  },
  actions: {},
  getters: {
    debug: state => state.debug,
    ready: state => state.ready,
    outdated: state => state.outdated,
  },
};
