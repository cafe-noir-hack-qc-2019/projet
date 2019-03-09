/**
 * # List store
 * > for our /api/homepage stuff
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import composer from 'store/composer';
import ApiPageBehaviour from 'store/behaviors/ApiPage';

const debug = process.env.NODE_ENV === 'development'; // && false;
const store = {
  namespaced: true,
  state() {
    return {
      api: {
        url: 'pages/homepage',
        moc: debug,
        getMoc(locale) {
          return import(`assets/moc/homepage/${locale}`);
        },
      },
      data: {
        title: '...',
        intro: '...<br>...<br>...<br>',
      },
    };
  },
  getters: {
    title: ({ data }) => data.title,
    themeChaud: ({ data }) => data.themeChaud,
    heltText: ({ data }) => data.heltText,
  },
};

/**
 * compose our store with ApiPageBehaviour so will fetch `state.data` from api
 * and handle a `state.status`
 */
export default composer(store, ApiPageBehaviour());
