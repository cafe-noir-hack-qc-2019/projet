<docs>
# PageHome
> simply the homepage

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import store from './store';

export default {
  name: 'PageHome',
  components: {
  },
  data() {
    return {
      postalCode: null, // @todo geoloc
    }
  },
  computed: {
    ...mapGetters({
      title: 'PageHome/title',
      intro: 'PageHome/intro',
    }),
  },
  /**
   * Register page store and load datas if needed
   */
  beforeCreate() {
    if (!this.$store.state.PageHome) {
      this.$store.registerModule('PageHome', store);
    }
    this.$store.dispatch('PageHome/LOAD');
  },
  // beforeDestroy() {
  //   // !!! Do not unregister store
  //   // or datas will be deleted and you will need to re-call api
  //   this.$store.unregisterModule('PageHome');
  // },
  methods: {
    go() {
      this.$store.commit('App/SET_POSTAL_CODE', this.postalCode);
      this.$router.push({ name: 'info-list.fr' })
    }
  },
};
</script>

<template>
  <div class="PageHome _container">
    <header class="header">
      <h1
        class="title"
        v-html="title" />
      <div
        class="wysiwyg"
        v-html="intro" />
    </header>
    <input type="text" v-model="postalCode" placeholder="Code postal" />
    <button @click="go">GO</button>
  </div>
</template>

<style lang="stylus" scoped>
  /**
   * TABLE OF CONTENT
   * --------
   *  - LAYOUT
   *  - DEBUG
   *  - NO_SCOPE
   */

  //  ===LAYOUT===

  //  ===DEBUG===
  [data-debug-mode="true"] .PageHome
    //
</style>
