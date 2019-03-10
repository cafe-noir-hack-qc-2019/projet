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
import Axios from 'axios';
import settings from 'src/settings';
import Cookies from 'js-cookie';
import defaultGeocoderResult from 'assets/data/geocoderResult';

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
    cardsByDistrict: [],
    date: new Date(),
    geocoderResult: null,
    info: null,
    selectedTheme: null,
    keywords: [],
    licencesInfos: null,
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
    SET_CARDS_BY_DISCTRICT(state, { district, cards }) {
      state.cardsByDistrict = assign({}, state.cardsByDistrict, { [district]: cards });
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
    SET_LICENCES_INFOS(state, payload) {
      state.licencesInfos = payload;
    },
  },
  actions: {
    GET_DISTRICT({ commit, state }) {
      // GOOGLE API GEOCODE
      Vue.$geocoder.send({
        zip_code: state.postalCode,
      }, (response) => {
        const results = get(response, 'results.0', defaultGeocoderResult);
        commit('SET_GEOCODER_RESULT', results);
        const address = get(state.geocoderResult, 'address_components');
        const sublocality = filter(address, line => line.types.indexOf('sublocality_level_1') !== -1);
        commit('SET_DISTRICT', get(sublocality, '0.long_name', 'Rosemont-La Petite-Patrie'));
      });
    },
    GET_CARDS_BY_DISTRICT({ commit, state }) {
      // LOAD FROM API
      let { slug } = state.mappedDistrict;
      if (['anjou', 'outremont', 'petite-prairie'].indexOf(slug) === -1) {
        slug = 'anjou';
      }
      Axios({
        method: 'get',
        url: `${settings.API_URL}/card/${slug}`,
      })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          commit('SET_CARDS_BY_DISCTRICT', { district: state.district, cards: response.data });
        });
    },
    GET_INFO({ commit, state }, { categorySlug, themeSlug, optionSlug }) {
      if (categorySlug === 'collectes') {
         Axios({
          method: 'get',
          url: `${settings.API_URL}/theme/${categorySlug}/${themeSlug}`,
        })
          .catch((error) => {
            console.log(error);
          })
          .then((response) => {
            commit('SET_INFO', {
              type: 'collectes',
              data: response.data,
            });
          });
      }
      if (categorySlug === 'permis' && themeSlug === 'animaux') {
        Axios({
          method: 'get',
          url: `${settings.API_URL}/theme/licence/animaux`,
        })
          .catch((error) => {
            console.log(error);
          })
          .then((response) => {
            const animal = get({
              chat: 'cat',
              cat: 'cat',
              chien: 'dog',
              dog: 'dog',
            }, optionSlug);
            commit('SET_LICENCES_INFOS', response.data.district);
            const disctrictLicencesInfos = get(filter(state.licencesInfos, info => info.slug === 'outremont'), '0.types');
            const optionInfos = filter(disctrictLicencesInfos, info => info.animalType === animal);
            commit('SET_INFO', {
              type: 'licences',
              data: get(optionInfos, '0'),
            });
          });
      }
    },
  },
  getters: {
    debug: state => state.debug,
    ready: state => state.ready,
    outdated: state => state.outdated,
    postalCode: state => state.postalCode,
    district: state => state.district,
    popularCards: state => orderBy(get(state.cardsByDistrict, state.district), ['percentage'], ['desc']),
    info: state => state.info,
    latLng: state => get(state.geocoderResult, 'geometry.location'),
  },
};
