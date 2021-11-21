
<template>
  <div>
    <Navbar-and-filter :total="joblist.total" />
    <Card-list :joblist="joblist" />
  </div>
</template>
<script>
import NavbarAndFilter from '@/components/NavbarAndFilter'
import CardList from '@/components/CardList'

export default {
  components: {
    NavbarAndFilter,
    CardList
  },
  data () {
    return {
      joblist: {}
    }
  },
  watchQuery (newQuery) {
    this.fetchData({ ...newQuery, ...{ page: 1 } })
  },
  created () {
    this.fetchData(this.$route.query)
  },
  methods: {
    async fetchData (params) {
      const response = await this.$axios.$get('/jobs/search', { params })
      this.joblist = response.result.jobList
    }
  }
}
</script>
