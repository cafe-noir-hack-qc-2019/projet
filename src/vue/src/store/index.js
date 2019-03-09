/**
 * # Our store
 * > Manage our app state
 *
 * chunked by modules
 * - features (interface, scrollmagic etc)
 * - pages etc
 *
 * @todo : TEST and finish this
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import Vue from 'vue';
import Vuex from 'vuex';

import Bot from 'components/pages/Bot/store';
import App from './modules/App';
import I18n from './modules/I18n';
import Loader from './modules/Loader';
import Interface from './modules/Interface';
import Menu from './modules/Menu';
import ScrollMagic from './modules/ScrollMagic';
import Global from './modules/Global';

Vue.use(Vuex);

const Store = new Vuex.Store({
  modules: {
    App,
    I18n,
    Loader,
    Interface,
    Menu,
    ScrollMagic,
    Global,
    Bot,
  },
});
export default Store;
