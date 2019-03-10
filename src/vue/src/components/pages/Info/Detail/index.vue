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
        get,
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
      isLicence() {
        return this.info.type === 'licences';
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
        if (this.isLicence) {
          return `Optenir son permis<br/> ${this.licenceType}`;
        }
      },
      licenceType() {
        let type = '';
        switch (get(this.info, 'data.status')) {
          case 'owner':
            type = 'Propriétaire'
            break;
        
          default:
            break;
        }

        switch (get(this.info, 'data.animalType')) {
          case 'cat':
            type += 'd\'un chat';
            break;
          case 'dog':
            type += 'd\'un chien';
            break;
        
          default:
            break;
        }
        return type;
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
    <template v-if="isLicence">
      <div>
        <strong>Type de permis</strong>
        <p v-html="licenceType" />
      </div>
      <div>
        <strong>Infos</strong>
        <p v-html="get(info, 'data.how-to-get-license')" />
      </div>
      <div>
        <strong>Prix</strong>
        <p v-if="get(info, 'data.prices.extra')" v-html="get(info, 'data.prices.extra')" />
        <table>
          <tr>
            <th>Stérilisé</th>
            <th>Non Stérilisé</th>
            <th>Promotion</th>
          </tr>
          <tr>
            <td v-html="get(info, 'data.prices.sterilized')" />
            <td v-html="get(info, 'data.prices.not-sterilized')" />
            <td v-html="get(info, 'data.prices.promotion')" />
          </tr>
        </table>
      </div>
      <div>
        <strong>Contact</strong>
        <p>
          <span v-html="get(info, 'data.contact-address.address')" /><br />
          <span v-html="get(info, 'data.contact-address.city')" /><br />
          <span v-html="get(info, 'data.contact-address.postal_code')" />
          <span v-html="get(info, 'data.contact-address.region')" />
        </p>
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
