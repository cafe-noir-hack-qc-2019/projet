/**
 * # PageHome store
 * > for our /api/homepage stuff
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
// import composer from 'store/composer';
// import ApiPageBehaviour from 'store/behaviors/ApiPage';
import data from 'assets/moc/homepage/fr';

// const debug = true; // process.env.NODE_ENV === 'development'; // && false;
export default {
  namespaced: true,
  state() {
    return {
      data,
    };
  },
  getters: {
    title: state => state.data.title,
    intro: state => state.data.intro,
    postalText: state => state.data.postalText,
    titleSearch: state => state.data.titleSearch,
    infobulle: state => state.data.infobulle,
  },
};

/**
 * compose our store with ApiPageBehaviour so will fetch `state.data` from api
 * and handle a `state.status`
 */
// export default composer(store, ApiPageBehaviour());
