/**
 * # List store
 * > for our /api/homepage stuff
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import data from 'assets/moc/infos-list/fr';

export default {
  namespaced: true,
  state() {
    return {
      data,
    };
  },
  getters: {
    title: state => state.data.title,
    themeChaud: state => state.data.themeChaud,
    heltText: state => state.data.heltText,
  },
};
