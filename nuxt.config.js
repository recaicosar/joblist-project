/* eslint-disable */
module.exports = {
  target: 'server',
  head: {
    title: 'İş ilanları',
    htmlAttrs: {
      lang: 'tr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  image: {
    domains: [
      'upload-isinolsun-com.mncdn.com'
    ],
    alias: {
      unsplash: 'upload'
    }
  },
  plugins: ['@/plugins/mock.js', { src: '@/plugins/infiniteloading', ssr: false }

  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/image'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxt/image'
  ],
  bootstrapVue: {
    bootstrapCSS: true,
    bootstrapVueCSS: true
  },
  styleResources: {
    scss: '@/assets/styles/app.scss'
  },
  axios: {},
  build: {
    babel: { compact: true },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        removeComments: true,
        preserveLineBreaks: true,
        collapseWhitespace: true
      }
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: 'test',
        maxSize: 256000
      }
    },
    extend (config, ctx) {}
  }
}
