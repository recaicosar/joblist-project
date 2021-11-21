
<template>
  <div>
    <Navbar-and-filter />
    <Card-detail :detail="detail" />
  </div>
</template>
<script>
import NavbarAndFilter from '@/components/NavbarAndFilter'
import CardDetail from '@/components/CardDetail'

export default {
  components: {
    NavbarAndFilter,
    CardDetail
  },
  data () {
    return {
      detail: {},
      pageTitle: 'isinolsun.com'
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  },
  watch: {
    detail () {
      this.pageTitle = `${this.detail.companyName}, ${this.detail.positionName} arıyor || ${this.pageTitle}`
    }
  },
  created () {
    this.fetchDetail(this.$route.params)
  },
  methods: {
    async fetchDetail (params) {
      const response = await this.$axios.$get('/job/detail', { params })
      this.detail = response
    }
  }
}
</script>
