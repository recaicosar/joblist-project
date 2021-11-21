<script>

export default {
  name: 'Cardlist',
  props: {
    joblist: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      datalist: [],
      total: 1,
      page: 1,
      infiniteId: +new Date()
    }
  },
  watch: {
    joblist () {
      this.datalist = this.joblist.items
      this.total = this.joblist.total
      this.page = 1
      this.infiniteId = +new Date()
    }
  },

  methods: {
    infiniteScroll ($state) {
      setTimeout(() => {
        this.page++
        this.$axios
          .$get('/jobs/search', {
            params: { ...this.$route.query, page: this.page }
          })
          .then((response) => {
            if (response.result.jobList.items.length > 0) {
              response.result.jobList.items.forEach(item =>
                this.datalist.push(item)
              )
              this.total = response.result.jobList.total
              $state.loaded()
            } else {
              $state.complete()
            }
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      }, 500)
    }
  }
}
</script>
<template>
  <b-container>
    <div v-if="datalist.length">
      <div
        v-for="item in datalist"
        :key="item.jobId"
        class="mt-4 job-item pb-3"
      >
        <b-row align-v="center">
          <b-col md="auto">
            <a href="javascript:;" class="avatar avatar-xl rounded-circle">
              <img alt="Image placeholder" :src="item.imageUrl">
            </a>
          </b-col>
          <b-col class="ml--2">
            <h4 class="mb-0">
              <nuxt-link :to="`/jobdetail/${item.jobId}`">
                {{ item.positionName }}
              </nuxt-link>
            </h4>
            <p
              class="text-sm text-muted mb-0"
              v-text="item.tagText.slice(0, 100)"
            />
            <span class="text-success"> ● </span>
            <small v-text="item.tagDescription" />
          </b-col>
          <b-col md="auto">
            <b-row style="justify-content: flex-end">
              <p
                class="text-sm font-italic mb-3 mt-3"
                v-text="item.shortAddress"
              />
            </b-row>
            <b-row style="justify-content: flex-end">
              <b-button :to="`/jobdetail/${item.jobId}`" variant="primary">
                View Detail
              </b-button>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
    <infinite-loading
      v-if="datalist.length"
      spinner="spiral"
      :identifier="infiniteId"
      @infinite="infiniteScroll"
    >
      <div slot="no-more" />
      <div slot="no-results" />
    </infinite-loading>

    <div v-if="total === 0">
      <client-only><h4>Hiç kayıt bulunamadı</h4></client-only>
    </div>
  </b-container>
</template>
<style lang="scss" scoped>
.job-item {
  width: 100%;
  margin-bottom: 30px;
  border: 0;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
  background-color: #fff;
  background-clip: border-box;
  padding: 30px;

  h4 {
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    a {
      font-size: 1.25rem;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .avatar {
    font-size: 1rem;
    display: inline-flex;
    color: #fff;
    border-radius: 0.375rem;
    background-color: #adb5bd;
    align-items: center;
    justify-content: center;

    img {
      border-radius: 50% !important;
    height: 74px;
    width: 74px;
    }
  }
  .avatar-xl {
    width: 74px;
    height: 74px;
  }
}
</style>
