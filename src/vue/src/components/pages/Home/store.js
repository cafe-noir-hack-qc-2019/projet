/**
 * # PageHome store
 * > for our /api/homepage stuff
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import data from 'assets/moc/homepage/fr';

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
