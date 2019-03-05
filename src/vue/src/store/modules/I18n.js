/**
 * # I18n store
 * > Manage our locales
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import Cookies from 'js-cookie';
import {
  mapValues, keyBy, indexOf, assign, merge, without,
} from 'lodash';
import settings from 'src/settings';
import i18n from 'plugins/i18n';
import defaultLocale from 'utils/defaultLocale';

import ApiHelper from 'utils/helpers/Api';
import router from 'router';
// import 'utils/MomentLocale';
// import moment from 'moment';

export default {
  namespaced: true,
  state() {
    return {
      locale: defaultLocale,
      initialized: false,
      messages: mapValues(keyBy(settings.locales), () => ({})),
      /**
       * @argument {Object} loaded - used to know if some local are loaded (distant and localy)
       */
      loaded: {
        localy: mapValues(keyBy(settings.locales), () => false),
        distant: mapValues(keyBy(settings.locales), () => false),
      },
    };
  },
  mutations: {
    SET_LOCALE(state, locale) {
      // console.log('[I18n] SET_LOCALE mutation', { locale });
      if (!state.initialized) {
        state.initialized = true;
      }
      state.locale = locale;
      i18n.locale = locale;
      Cookies.set(settings.cookies.locale, locale);
      ApiHelper.setLocale(locale);
      // moment.locale(locale.replace('-ca', ''));

      return locale;
    },
    SET_LOCALE_MESSAGES(state, { locale, messages }) {
      // console.log('[i18n SET_LOCALE_MESSAGES, mutation]', { locale, messages, i18n });

      state.messages[locale] = messages;
      i18n.setLocaleMessage(locale, messages);
    },
  },
  actions: {
    /**
     * Use this action to change locale
     * will check if legal locale, if have to load stuff etc
     * @param {Object} store
     * @param {String} locale
     *
     * @todo test if change, have to re-load globales ?
     */
    SET_LOCALE({
      dispatch, commit, getters, state,
    }, locale) {
      // console.log('[I18n] SET_LOCALE action', { locale });

      // return if not valid (settings)
      const localeIsValid = indexOf(settings.locales, locale) >= 0;
      if (!localeIsValid) {
        // @todo throw expression babel plugin
        // throw new Error(`invalid locale ${locale} must be one of ${settings.locales.join(',')}`);
        // console.error(`[I18n SET_LOCALE] wrong locale "${locale}" must be one of "${settings.locales.join(',')}"`);
        router.push({ name: `404.${state.locale}` });
        return;
      }
      // console.log('[i18n SET_LOCALE action]', {locale, state: getters.locale, settings: settings.locales, init: state.initialized});
      // return if actualy the same (exept 1st time...)
      if (locale === getters.locale) {
        if (!state.initialized) {
          commit('SET_LOCALE', locale);
        }
        return;
      }

      // load locale messages
      dispatch('LOAD_LOCALE_MESSAGES', locale);
      // and load globals
      this.dispatch('Global/LOAD', this.locale);
      commit('SET_LOCALE', locale);
    },

    LOAD_LOCALE_MESSAGES({ dispatch }, locale) {
      // load local messages
      new Promise((resolve) => {
        resolve(ApiHelper.getMoc(() => import(/* webpackChunkName: "i18n" */ `assets/i18n/${locale}`)));
      })
        .then(messages => dispatch('ADD_LOCALE_MESSAGES', { locale, messages }))
        .catch(() => { /* nothing to do... */ });
    },

    /**
     * Use this action to change locale
     * will check if legal locale, if have to load stuff etc
     * @param {Object} store
     * @param {Object} payload
     * @param {String} payload.locale - local of those messages
     * @param {Object} payload.messages - only for that locale
     * @param {String} payload.method = 'merge'|'assign'|'replace' - if true, merge with current message, else just replace
     */
    ADD_LOCALE_MESSAGES({ commit, state }, { locale, messages, method = 'merge' }) {
      // merge messages
      const finalMessages = (() => {
        const existant = state.messages[locale];
        switch (method) {
          case 'assign':
            return assign({}, existant, messages);
          case 'merge':
            return merge({}, existant, messages);
          default:
            return messages;
        }
      })();

      commit('SET_LOCALE_MESSAGES', { locale, messages: finalMessages });
      return messages;
    },
  },
  getters: {
    locales: () => settings.locales,
    locale: state => state.locale,
    otherLocales: state => without(settings.locales, state.locale),
    // only if 2 locales
    otherLocale: state => without(settings.locales, state.locale)[0],
    isLocaleLoaded: state => locale => ({
      localy: state.loaded.localy[locale],
      distant: state.loaded.distant[locale],
    }),
  },
};
