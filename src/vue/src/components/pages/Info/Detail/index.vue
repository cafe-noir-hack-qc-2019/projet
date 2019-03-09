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
        return this.categorySlug === 'collectes';
      },
      categorySlug() {
        return this.$route.params.categorySlug;
      },
      themeSlug() {
        return this.$route.params.themeSlug;
      },
      titleInfo() {
        if (this.isCollect) {
          return `Collecte des ${this.info.TYPE_DECHET.toLowerCase()}`;
        }
      }
    },
    created() {
      this.$store.dispatch('App/GET_INFO', { categorySlug: this.categorySlug, themeSlug: this.themeSlug });
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
      <!-- <GmapMap
        :center="latLng"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 20vh"
      >
      </GmapMap> -->
      <span v-html="postalCode" />
    </header>
    <template v-if="isCollect">
      <div>
        <strong>Type de déchet</strong>
        <p v-html="info.TYPE_DECHET" />
      </div>
      <div>
        <strong>Infos</strong>
        <p v-html="info.MESSAGE_FR" />
      </div>
      <div v-if="info.EXCEPTION_FR">
        <strong>Exceptions</strong>
        <p v-html="info.EXCEPTION_FR" />
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
