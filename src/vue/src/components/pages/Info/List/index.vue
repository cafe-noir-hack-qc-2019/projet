<script>
  /**
  * > **
  *
  * 
  *
  * @author Camille Boissel <boissel.camille@gmail.com>
  *
  * ---
  */
  import { mapGetters } from 'vuex';
  export default {
    name: 'InfoList',
    components: {},
    props: {},
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        postalCode: 'App/postalCode',
        district: 'App/district',
        popularThemes: 'App/popularThemes',
      }),
    },
    watch: {
      district: {
        handler() {
          this.$store.dispatch('App/GET_THEMES_BY_DISTRICT');
        }
      }
    },
    beforeCreate() {
    },
    created() {
      // if (!this.postalCode) {
      //   this.$router.push({ name: 'home.fr' })
      // }
      this.$store.dispatch('App/GET_DISTRICT');
    },
    methods: {},
  }
</script>

<template>
  <div class="InfoList">
    Themes
    <ul>
      <li v-for="theme in popularThemes" :key="theme.id">
        <router-link :to="{ name: 'infoDetail.fr', params: {themeSlug: theme.slug} }">
          <span v-html="theme.label" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
  /**
  * 
  * TABLE OF CONTENT
  * --------
  *	=LAYOUT
  *	=DEBUG
  */

  /* ===LAYOUT=== */

  /* ===DEBUG=== */

</style>
