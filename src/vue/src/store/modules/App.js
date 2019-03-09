/**
 * # App store
 * > Manage our low level states
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import { assign, get } from 'lodash';

const debug = true; // process.env.NODE_ENV === 'development';

export default {
  namespaced: true,
  state: {
    debug,
    ready: false, // true if all content loaded
    outdated: false, // force app to reload and fetch data if app is outdated
    postalCode: null,
    district: null,
    sectorID: null,
    themesByDistrict: [],
    themesByTerms: [],
    searchTerms: [],
    date: null,
  },
  mutations: {
    SET_POSTAL_CODE(state, payload) {
      state.postalCode = payload;
    },
    SET_READY(state, payload) {
      state.ready = payload;
    },
    SET_OUTDATED(state, payload) {
      state.outdated = payload;
    },
    SET_DISTRICT(state, payload) {
      state.district = payload;
    },
    SET_THEMES_BY_DISCTRICT(state, { district, themes }) {
      state.themesByDistrict = assign(state.themesByDistrict, { [district]: themes });
    },
    SET_SEARCH_TERMS(state, payload) {
      state.searchTerms = payload;
    },
    SET_THEMES_BY_TERMS(state, { themes }) {
      state.themesByTerms = themes;
    },
  },
  actions: {
    GET_DISTRICT({ commit, state }) {
      // GOOGLE API GEOCODE
      console.log('postalCode', state.postalCode);

      // COMMIT
      commit('SET_DISTRICT', 'St-Laurent');
    },
    GET_THEMES_BY_DISTRICT({ commit, state }) {
      // LOAD FROM API
      // USE ALSO state.date
      console.log('district', state.district);
      console.log('date', state.date);
      const themes = [
        {
          id: 1,
          label: 'Aqueduc',
          percentage: 29,
        },
      ];

      commit('SET_THEMES_BY_DISCTRICT', { district: state.district, themes });
    },
    SEARCH_BY_TERMS({ commit }, { terms }) {
      commit('SET_SEARCH_TERMS', terms);

      // LOAD THEME FROM API
      const themes = [
        {
          label: 'Aqueduc',
          percentage: 29,
        },
      ];

      commit('SET_THEMES_BY_TERMS', { themes });
    },
  },
  getters: {
    debug: state => state.debug,
    ready: state => state.ready,
    outdated: state => state.outdated,
    postalCode: state => state.postalCode,
    district: state => state.district,
    themesByDistrict: state => ({ district }) => get(state.themesByDistrict, district),
    popularThemes: state => get(state.themesByDistrict, state.district), // order by percentage
    themesByTerms: state => state.themesByTerms,
  },
};
