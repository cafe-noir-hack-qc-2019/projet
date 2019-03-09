/**
 * # Info Collecte store
 * > useful to treat info collecte data
 *
 * @author Camille Boissel <camille@kffein.com>
 */
import composer from 'store/composer';
import ApiPageBehaviour from 'store/behaviors/ApiPage';

const debug = true; // process.env.NODE_ENV === 'development'; // && false;
const store = {
  namespaced: true,
  state() {
    return {
      api: {
        url: 'sections/info-collectes',
        moc: debug,
        getMoc() {
          return import('assets/moc/info-collectes');
        },
      },
      sectorID: null,
    };
  },
  mutations: {
    SET_SECTOR_ID(state, payload) {
      state.sectorID = payload;
    },
  },
  actions: {
    GET_SECTOR_ID({ commit }, { postalCode }) {
      console.log('postalCode', postalCode);

      // GOOGLE API GEOCODE ?

      // LAT LNG => POLYGON (COLLECTE DATA)

      // POLYGON => SECTEUR ID

      // COMMIT
      commit('SET_DISCTRICT', 'Sect-1');
    },
  },
  getters: {
    sectorID: state => state.sectorID,
  },
};

/**
 * compose our store with ApiPageBehaviour so will fetch `state.data` from api
 * and handle a `state.status`
 */
export default composer(store, ApiPageBehaviour());
