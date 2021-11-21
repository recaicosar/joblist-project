export default {
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
  css: [
    '@/assets/styles/app.scss'
  ],
  image: {
    domains: [
      'upload-isinolsun-com.mncdn.com'
    ],
    alias: {
      unsplash: 'https://upload-isinolsun-com.mncdn.com'
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
    '@nuxtjs/axios',
    '@nuxt/image'
  ],
  bootstrapVue: {
  //   components: ['BContainer', 'BRow', 'BCol', 'BFormInput', 'BButton', 'BTable', 'BModal', 'BNavbar', 'BCollapse', 'BNavForm', 'BNavbarBrand', 'BNavbarToggle'],
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: false
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
    extend (config, ctx) {}
  }
}
