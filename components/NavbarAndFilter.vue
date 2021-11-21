<template>
  <div class="filter">
    <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
      <b-container>
        <b-navbar-brand>
          <nuxt-link to="/joblist">
            <nuxt-img src="/logo-white.png" height="25" />
          </nuxt-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-form>
              <b-form-input
                v-model="filterForm.keywords"
                size="sm"
                class="mr-sm-2"
                placeholder="ilanda ara"
              />
              <b-form-input
                v-model="filterForm.location"
                size="sm"
                class="mr-sm-2"
                placeholder="lokasyon giriniz"
              />
              <b-button
                size="sm"
                class="my-2 my-sm-0 font-weight-bold"
                style="border:2px solid #fff"
                type="submit"
                variant="primary"
                @click.prevent="getFilter"
              >
                İş Bul
              </b-button>
            </b-nav-form>
            <b-card-text
              class="mr-sm-2 countItem"
            >
              <h6 v-if="totalCount" v-text="`${totalCount} ilan bulundu`" />
            </b-card-text>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
import { pickBy } from 'lodash'
export default {
  name: 'NavbarAndFilter',
  props: {
    total: {
      type: Number,
      required: false,
      default: () => (0)
    }
  },
  data () {
    return {
      filterForm: {
        keywords: this.$route.query.keywords || '',
        location: this.$route.query.location || ''
      },
      totalCount: 0
    }
  },
  watch: {
    total () {
      this.totalCount = this.total
    }
  },
  methods: {
    getFilter () {
      this.$router.push({ path: '/joblist', query: { ...pickBy(this.filterForm) } })
    }
  }
}
</script>
<style lang="scss" scoped>
div.filter {
  margin-bottom: 75px;
}
input {
  border:0
}
.countItem {
      color: #fff;
    margin-left: 10px;
    padding-top: 10px;
}
</style>
