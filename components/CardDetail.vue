<script>

export default {
  name: 'Cardlist',
  props: {
    detail: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      loading: true

    }
  },
  watch: {
    detail () {
      this.loading = false
    }
  }

}
</script>
<template>
  <b-container>
    <b-skeleton-wrapper :loading="loading">
      <b-card-group deck>
        <b-card
          no-body
          style="max-width: 45rem"
          :img-src="detail.largeImageUrl"
          img-alt="Image"
          class="banner"

          img-top
        >
          <b-card-body>
            <b-card-title>{{ detail.positionName }}</b-card-title>
            <b-card-text>
              {{ detail.tagText }}
            </b-card-text>
            <b-list-group flush>
              <b-list-group-item>{{ detail.tagDescription }}</b-list-group-item>
            </b-list-group>

            <b-button align-v="end" href="javascript:;" class="m-auto ml-3" variant="primary">
              Başvur
            </b-button>
          </b-card-body>
        </b-card>
        <b-card
          no-body
          style="max-width: 15rem;"
        >
          <b-card-body>
            <b-card-title>{{ detail.companyName }}</b-card-title>
            <b-card-text>
              {{ detail.shortAddress }}
            </b-card-text>
            <b-list-group flush>
              <b-list-group-item>
                <a target="blank" :href="`https://yandex.com.tr/harita/?ll=${detail.longitude},${detail.latitude}&text=${detail.shortAddress},%20T%C3%BCrkiye`">
                  Haritada Gör
                </a>
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-card>
      </b-card-group>
    </b-skeleton-wrapper>
  </b-container>
</template>
<style lang="scss" scoped>
.banner {
    img{
        object-fit: cover;
    height: 350px;
    }
}
</style>
