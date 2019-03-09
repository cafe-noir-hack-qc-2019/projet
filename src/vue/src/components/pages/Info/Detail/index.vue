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
  export default {
    name: 'InfoDetail',
    components: {},
    props: {},
    data() {
      return {

      }
    },
    computed: {
      themeSlug() {
        return this.$route.params.themeSlug;
      },
    },
    methods: {},
  }
</script>

<template>
  <div class="InfoDetail">
    <router-link :to="{name: 'infoList.fr'}">Retour</router-link>
    Detail info {{ themeSlug }}
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
