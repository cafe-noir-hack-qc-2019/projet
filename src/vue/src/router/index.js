/**
 * # Router service
 * > manage our routes (pages)
 *
 * @todo :
 * - [ ] use routes.json (like old days)
 * - [ ] code split / async load
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
 get, map, without, flatten, assign, indexOf,
} from 'lodash';
import store from 'store';
import defaultLocale from 'utils/defaultLocale';
import settings from 'src/settings';
import routesMap from 'routes';

const Home = () => import(/* webpackChunkName: "pages-home" */ 'components/pages/Home');
const Contact = () => import(/* webpackChunkName: "pages-contact" */ 'components/pages/Contact');
const FourOFour = () => import(/* webpackChunkName: "pages-404" */ 'components/pages/FourOFour');
const News = {
  collection: () => import(/* webpackChunkName: "pages-works" */ 'components/pages/News/Collection'),
  single: () => import(/* webpackChunkName: "pages-works" */ 'components/pages/News/Single'),
};
const Tests = {
  demo: () => import(/* webpackChunkName: "pages-tests" */ 'components/pages/Tests/Demo'),
};

Vue.use(VueRouter);

/**
 * return component by route handle
 * @param {String} id - route handle
 * @returns {VueComponent}
 */
function getComponentById(id) {
  switch (id) {
    case 'home':
      return Home;
    case 'contact':
      return Contact;
    // News
    case 'news':
      return News.collection;
    case 'article':
      return News.single;

    case 'demo':
      return Tests.demo;

    case '404':
    default:
      return FourOFour;
  }
}

/**
 * @argument {Array} routes - put debug / default routes here
 * when calling /api/globals, we may add new routes
 */
const defaultRoutes = [
  {
    path: '/:locale',
    redirect: (to) => {
      const { params } = to;
      const { locale } = params;
      if (indexOf(settings.locales, locale) < 0) {
        return {
          name: `404.${ defaultLocale }`,
        };
      }

      return {
        name: `home.${ locale }`,
      };
    },
  },
  {
    path: '/',
    redirect: { name: `home.${ defaultLocale }` },
  },
  {
    path: '/:locale/*',
    redirect: (to) => {
      const { params } = to;
      let { locale } = params;
      if (indexOf(settings.locales, locale) < 0) {
        locale = defaultLocale;
      }
      return {
        name: `404.${ locale }`,
      };
    },
  },
  {
    path: '*',
    redirect: { name: `404.${ defaultLocale }` },
  },
];

/**
 * compute our routes array
 * by looping our routes.json within all our locales
 */
const routes = without(flatten(
  map(routesMap, ({ id, urls, meta }) => { // eslint-disable-line arrow-body-style
    // because a route has many locales, we create one per locale
    return map(urls, (url, locale) => {
      // retrieve our component within the id (handle)
      const component = getComponentById(id);
      if (!component) {
        return null;
      }
      // finaly, this is ONE route
      return {
        name: `${id}.${locale}`,
        path: `/${locale}/${url}`,
        // mix lots of useful metas
        meta: assign({}, meta, {
          locale,
          id, // handle
        }),
        component,
      };
    });
  }),
), null);

routes.push(...defaultRoutes);

/**
 * @argument {VueRouter} router - our vue router instance
 */
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes,
});

/**
 * watch change locale
 * if so, tell our I18n store so all change, load new globals etc
 */
router.beforeEach((to, from, next) => {
  // remove all temp scenes
  store.dispatch('ScrollMagic/DESTROY_TEMP_SCENES');

  // retrieve locale (route's param or meta)
  const locale = get(to, 'params.locale') || get(to, 'meta.locale', defaultLocale);
  if (locale && (
      locale !== store.getters['I18n/locale']
      || !from.name
    )
   ) {
    // switch lang = page reload (same name but not locale)
    if (settings.reloadOnSwitchLangue && from.name) {
      next();
      return location.reload(true); // eslint-disable-line no-restricted-globals
    }

    store.dispatch('I18n/SET_LOCALE', locale);
  }
  return next();
});

/**
 * on route error, redirect 404
 */
router.onError(() => {
  router.replace('*');
});


// form `import router from 'router'
export default router;
