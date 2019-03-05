/**
 * # i18n service
 * > manage our translatable content ;)
 *
 * @todo :
 * https://medium.com/hypefactors/add-i18n-and-manage-translations-of-a-vue-js-powered-website-73b4511ca69c
 * - [ ] plug with store ?
 * - [ ] use global config (locales etc)
 * - [ ] load distant globales, and merge locales
 * - [ ] code split
 * - [ ] [lazy-load](https://kazupon.github.io/vue-i18n/guide/lazy-loading.html)
 * - [ ] [hot-load](https://kazupon.github.io/vue-i18n/guide/hot-reload.html)
 * - [ ] test if add translation, old computed value using $t is updated or not
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { get } from 'lodash';

// import fr from './fr';
// import en from './en';

Vue.use(VueI18n);

const i18n = new VueI18n({
  // locale: 'en',
  // messages: { en, fr },
});

// @todo better way to do this
// @return like `$t` but as object
Vue.prototype.$t_raw = function test(path) {
  const { locale } = this.$i18n;
  return get(this.$i18n.messages[locale], path);
};

export default i18n;
