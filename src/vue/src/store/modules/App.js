/**
 * # App store
 * > Manage our low level states
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import {
 assign,
 get,
 orderBy,
 filter,
} from 'lodash';
import Vue from 'vue';
import districtMapping from 'assets/data-mapping/district';
import Dates from 'utils/helpers/Dates';
import Axios from 'axios';
import settings from 'src/settings';
import Cookies from 'js-cookie';

const debug = true; // process.env.NODE_ENV === 'development';

export default {
  namespaced: true,
  state: {
    debug,
    ready: false, // true if all content loaded
    outdated: false, // force app to reload and fetch data if app is outdated
    postalCode: Cookies.get('postalCode'),
    district: null,
    mappedDistrict: null,
    sectorID: null,
    themesByDistrict: [],
    date: new Date(),
    geocoderResult: null,
    info: {},
    selectedTheme: null,
    keywords: [],
  },
  mutations: {
    SET_POSTAL_CODE(state, payload) {
      state.postalCode = payload;
      Cookies.set('postalCode', state.postalCode);
    },
    SET_READY(state, payload) {
      state.ready = payload;
    },
    SET_OUTDATED(state, payload) {
      state.outdated = payload;
    },
    SET_DISTRICT(state, payload) {
      state.district = payload;
      state.mappedDistrict = get(districtMapping, state.district);
    },
    SET_THEMES_BY_DISCTRICT(state, { district, themes }) {
      state.themesByDistrict = assign({}, state.themesByDistrict, { [district]: themes });
    },
    SET_GEOCODER_RESULT(state, payload) {
      state.geocoderResult = payload;
    },
    SET_SELECTED_THEME(state, payload) {
      state.selectedTheme = payload;
    },
    SET_INFO(state, payload) {
      state.info = payload;
    },
    SET_KEYWORDS(state, payload) {
      state.keywords = payload;
    },
  },
  actions: {
    GET_DISTRICT({ commit, state }) {
      // GOOGLE API GEOCODE
      Vue.$geocoder.send({
        zip_code: state.postalCode,
      }, (response) => {
        commit('SET_GEOCODER_RESULT', get(response, 'results.0'));
        const address = get(state.geocoderResult, 'address_components');
        const sublocality = filter(address, line => line.types.indexOf('sublocality_level_1') !== -1);
        commit('SET_DISTRICT', get(sublocality, '0.long_name'));
      });
    },
    GET_THEMES_BY_DISTRICT({ commit, state }) {
      // LOAD FROM API
      console.log('themes');
      Axios({
        method: 'get',
        url: `${settings.API_URL}/theme/list`,
        data: {
          district: state.mappedDistrict.slug,
          date: Dates.formatDate(state.date, 'Y-m-d'),
        },
      })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response);
          commit('SET_THEMES_BY_DISCTRICT', { district: state.district, themes: response.data });
        });
    },
    GET_INFO({ commit, state }, { categorySlug, themeSlug }) {
      Axios({
        method: 'get',
        url: `${settings.API_URL}/theme/${categorySlug}/${themeSlug}`,
        data: {
          postal_code: state.postalCode,
          date: Dates.formatDate(state.date, 'Y-m-d'),
        },
      })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response);
          commit('SET_INFO', response.data);
        });
      // console.log(state, categorySlug, themeSlug);
      // commit('SET_INFO',
      //   {
      //     ID: '141',
      //     MUNICIPALITE: 'Montreal',
      //     SECTEUR: '141',
      //     TYPE_DECHET: 'Matières recyclables',
      //     MESSAGE_FR: 'La collecte a lieu le JEUDI. Déposez votre bac sur le trottoir entre 19 h la veille et 7 h le matin de la collecte.',
      //     MESSAGE_EN: 'The collection takes place on THURSDAY. Deposit your box on the sidewalk between 7 p.m. the day before and 7 a.m.  the day of collection. ',
      //   });
    },
  },
  getters: {
    debug: state => state.debug,
    ready: state => state.ready,
    outdated: state => state.outdated,
    postalCode: state => state.postalCode,
    district: state => state.district,
    popularThemes: state => orderBy(get(state.themesByDistrict, state.district), ['percentage'], ['desc']),
    info: state => get(state.info, 'properties'),
    latLng: state => get(state.geocoderResult, 'geometry.location'),
  },
};
