let proxy = "";
if (process.env.NODE_ENV == "development") {
    proxy = process.env.BASE_PROXY;
} else {
    proxy = "";
}
const path = require('path')
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'GRADE PROJECT',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCahtYH3K526qvDhqJzUA4YyGd00Sc167Y&libraries=places'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/styles.scss',
    'bootstrap-icons/font/bootstrap-icons.scss',
    path.resolve(__dirname, 'node_modules/vue-multiselect/dist/vue-multiselect.min.css'),
  ],

  loading: {
    continuous: true,
    color: '#007c53',
    height: '5px'
  },
  loadingIndicator: {
    name: 'circle',
    color: '#007c53',
    background: 'white'
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/vue-multiselect.js',
    "~/plugins/vee-validate.js",
    "~/plugins/mixin.js",
    "~/plugins/vue-json-viewer.js",
    "~/plugins/datetime.js",
    "~/plugins/chart.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    '@nuxtjs/moment'
  ],


  bootstrapVue: {
    icons: false,
    components: [
        'BTable',
        'BTabs',
        'BTab',
        'BModal',
        'BPagination',
        'BDropdown',
        'BDropdownItem',
        'BDropdownItemButton',
        'BDropdownDivider',
        'BDropdownForm',
        'BDropdownText',
        'BDropdownGroup',
        'BDropdownHeader',
        'BSpinner',
        'BProgress',
        'BProgressBar',
        'BListGroup',
        'BAlert',
        'BListGroupItem',
        "BSpinner",
        "BCollapse",
        "BTooltip",
        "BAvatar",
        "BCard",
        "BBadge",
        "BCardHeader",
        "BCardText",
        "BCardBody",
        "BFormSelect"
    ],
    directives: ['VBModal', "VBToggle", "VBTooltip", "VBPopover"]
  },

  router: {
    // middleware: ['auth'],
    prefetchLinks: false,
    // base: '/rams/',
    routeNameSplitter: '/',
  },

  i18n: {
    //detectBrowserLanguage: false,
    strategy: 'prefix',
    defaultLocale: 'en',
    lazy: false,
    langDir: 'locales/',
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirected',
    //   redirectOn: 'root',  // recommended
    // },
    locales: [
        {
            id: 'en',
            name: 'English',
            nativeName: 'English',
            code: 'en',
            file: 'en-EN.js',

        },
        {
            id: 'ar',
            name: 'arabic',
            nativeName: 'arabic',
            code: 'ar',
            file: 'ar-Ar.js',
        }
    ],

  },


  // auth: {
  //     redirect: {
  //       login: '/',
  //       logout: '/',
  //       home: '/dashboard/home',
  //       callback: '/'
  //     },
  //     plugins: ['@/plugins/auth-lang-redirect.js'],
  //     rewriteRedirects: true,
  //     watchLoggedIn: true,
  //     strategies: {
  //       local: {
  //             // scheme: '~/schemes/customScheme',
  //             token: {
  //                 property: 'access_token'
  //             },
  //             user: {
  //                 property: false,
  //                 // autoFetch: true
  //             },
  //             endpoints: {
  //                 login: {
  //                     url:  '/auth/login',
  //                     method: 'post',
  //                     namespaced: true
  //                 },
  //                 user: {
  //                   url: '/auth/me',
  //                   method: 'get'
  //                 },
  //                 logout: {
  //                   url: '/auth/logout',
  //                   method: 'get'
  //                 },
  //             },
  //         },

  //     },
  // },

  env: {
    BASE_PROXY: proxy,
    CHECK_AUTH_URL: process.env.CHECK_AUTH_URL
  },

   // Axios module configuration: https://go.nuxtjs.dev/config-axios
   axios: {
    baseURL: 'http://localhost:8000',
    // proxy: checkProxy,
    // // proxyHeaders: checkProxy,
    // credentials: checkProxy,
  },

  // proxy: {
  //   '/proxyApi/': {
  //         target: process.env.API_URL,
  //         secure: true,
  //         pathRewrite: {
  //             "^/proxyApi/": ""
  //         }
  //     },
  // },

  vue: {
    config: {
      devtools: true
    }
  },

  publicRuntimeConfig: {
      tableAppLimit: process.env.LIMIT_TABLE,
      pagination: {
        page: 1,
        perPage: 10000
      }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
        source: '/static/icon.png',
        fileName: 'icon.png'
    },
    manifest: {
        name: 'RAMS',
        short_name: 'RAMS',
        lang: 'en',
        display: 'standalone',
        theme_color: '#4c52bb',
        start_url: "/"
    },
    workbox: {
        workboxURL: `https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js?${Date.now()}`,
    },
    meta: {
        theme_color: '#4c52bb',
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    maxChunkSize: 200000,
    babel: {
        compact: true,
    },
    parallel: true,
    // cache: true,
    // analyze: false,
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: true,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            name: 'node_vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            maxSize: 244000
          }
        }
      }
    },

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
            useShortDoctype: true
        }
    },
  },
}
