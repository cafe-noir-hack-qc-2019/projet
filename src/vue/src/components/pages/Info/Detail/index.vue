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
  import { get } from 'lodash';
  export default {
    name: 'InfoDetail',
    components: {},
    props: {},
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        info: 'App/info',
        postalCode: 'App/postalCode',
        latLng: 'App/latLng',
      }),
      isCollect() {
        return this.info.type === 'collectes';
      },
      categorySlug() {
        return this.$route.params.categorySlug;
      },
      themeSlug() {
        return this.$route.params.themeSlug;
      },
      optionSlug() {
        return this.$route.params.optionSlug;
      },
      titleInfo() {
        if (this.isCollect) {
          return `Collecte des ${get(this.info, 'data.TYPE_DECHET', '').toLowerCase()}`;
        }
      }
    },
    watch: {
      info: {
        immediate: true,
        handler() {
          console.log('info', this.info);
        }
      }
    },
    created() {
      this.$store.dispatch('App/GET_INFO', { 
        categorySlug: this.categorySlug,
        themeSlug: this.themeSlug,
        optionSlug: this.optionSlug,
      });
    },
    methods: {},
  }
</script>

<template>
  <div class="InfoDetail" v-if="info">
    <header>
      <h1
          class="title"
          v-html="titleInfo" />
      <span v-html="postalCode" />
    </header>
    <template v-if="isCollect">
      <div>
        <strong>Type de déchet</strong>
        <p v-html="info.data.TYPE_DECHET" />
      </div>
      <div>
        <strong>Infos</strong>
        <p v-html="info.data.MESSAGE_FR" />
      </div>
      <div v-if="info.data.EXCEPTION_FR">
        <strong>Exceptions</strong>
        <p v-html="info.data.EXCEPTION_FR" />
      </div>
    </template>

    <div>
      <h3>Cela pourrait vous intéresser</h3>
    </div>

    <router-link :to="{name: 'infoList.fr'}">Retour</router-link>
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
