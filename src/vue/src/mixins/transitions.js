/**
 * - preload
 *  + preload page (api) on before leave
 *  + but you still need to load it on beforeCreated in case of when it's 1st page (called before beforeEnter)
 *  + and so, check your store to not load it twice
 *
 * - scroll
 *  + before leave = disable
 *  + before enter = scrolltop
 *  + after enter = enable
 */
export default {
  computed: {
    mode() {
      return this.$store.getters['app/mode'];
    },
    ...mapGetters({
      navIsAnimating: 'navigation/isAnimating',
      navOpened: 'navigation/opened',
    }),
  },
  beforeCreate() {
    this.$router.beforeEach((to, redirect, next) => {
      this.$store.commit('app/SET_FROM_ROUTE', this.$route);
      if (this.$refs.page) { this.$prevLeave = this.$refs.page.leave; }
      next();
    });

    this.$router.afterEach((to) => {
      this.$store.commit('app/SET_TO_ROUTE', to);

      if (typeof ga === 'function') { ga('send', 'pageview', location.pathname); }

      if (this.lang != to.meta.lang) { this.$store.commit('app/LANG_CHANGED', to.meta.lang); }

      this.$root.setLangRouteNames();
    });
  },
  methods: {
    beforeEnter() {
      // @todo remove
      // this.$store.dispatch('app/PRELOAD_PAGE', this.$route)

      this.$store.commit('scrollmagic/CREATE');
      this.$store.dispatch('app/SCROLL_TOP');
      this.$store.dispatch('app/DISABLE_SCROLL');
    },
    enter(el, done) {
      let mouseCallBack = done;
      if (this.$refs.page.enter) {
        mouseCallBack = () => {};
        this.$refs.page.enter(done);
      }

      this.$refs.TheDefaultTransition.enter(done);
    },
    afterEnter() {
      if (this.mode == 'in-out' && this.mode != Settings.mode) {
        this.$store.commit('app/RESET_MODE');
      }

      // disable scroll (exept home because of header slideshow)
      if (indexOf(['home.fr', 'home.en'], this.$route.name) < 0) {
        this.$store.dispatch('app/ENABLE_SCROLL');
      }
    },

    beforeLeave(el) {
      this.$store.dispatch('app/PRELOAD_PAGE', this.$route);
      this.$store.dispatch('app/DISABLE_SCROLL');
      return this.$refs.page.beforeLeave
        ? this.$refs.page.beforeLeave.bind(this.$refs.page)(el)
        : null;
    },
    leave(el, done) {
      if (this.navOpened === true) {
        // Wait end of nav close animation
        const unwatch = this.$watch('navIsAnimating', (value) => {
          if (value === false) {
            unwatch();
            if (!this.$prevLeave) {
              return this.$refs.TheDefaultTransition.leave(done);
            }
            return this.$prevLeave(done);
          }
        });
        this.$refs.TheNavigation.close();
      } else {
        if (!this.$prevLeave) {
          return this.$refs.TheDefaultTransition.leave(done);
        }
        return this.$prevLeave(done);
      }
    },
    afterLeave() {
      this.$store.commit('scrollmagic/DESTROY');
      if (this.mode == 'out-in' || this.mode == '' && this.mode != Settings.mode) { this.$store.commit('app/RESET_MODE'); }
      // this.$store.dispatch('app/SCROLL_TOP')
    },
  },
};
