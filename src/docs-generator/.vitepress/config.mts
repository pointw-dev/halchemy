import { defineConfig, withBase } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
const pkg = require('../../version_stamp.json')


const basePath = 'halchemy'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'halchemy',
  description: 'HAL for Humans',

  themeConfig: {
    siteTitle: 'halchemy',
    stackOverflowTags: ['halchemy', 'HAL', 'http', 'rest', 'hypermedia'],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pointw-dev/halchemy' }
    ],
    logo: '/img/hero.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quickstart', link: '/guide/introduction/quickstart' },
      { text: pkg.version, link: null }
    ],

    outline: 'deep',
    sidebar: getSidebar(),
    search: {
        provider: 'local',
        options: {
            detailedView: true
        }
    }
  },

  appearance: 'dark',
  base: `/${basePath}/`,
  head: [
    ['link', { rel: 'icon', href: `/${basePath}/favicon.ico` }],
    
    // test with https://www.opengraph.xyz/url/
// head:
// - - meta
//   - property: 'og:image'
//     content: 'https://pointw-dev.github.io/halchemy/img/hero.svg'
    
/*
<!-- HTML Meta Tags -->
<title>Getting Started | halchemy</title>
<meta name="description" content="HAL for Humans">

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://pointw-dev.github.io/halchemy/guide/introduction/quickstart.html">
<meta property="og:type" content="website">
<meta property="og:title" content="Getting Started | halchemy">
<meta property="og:description" content="HAL for Humans">
<meta property="og:image" content="">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="pointw-dev.github.io">
<meta property="twitter:url" content="https://pointw-dev.github.io/halchemy/guide/introduction/quickstart.html">
<meta name="twitter:title" content="Getting Started | halchemy">
<meta name="twitter:description" content="HAL for Humans">
<meta name="twitter:image" content="">

<!-- Meta Tags Generated via https://www.opengraph.xyz -->
*/    
    
    ['meta', {property: 'og:image', content: 'https://pointw-dev.github.io/halchemy/img/hero.svg'}],
    ['meta', {property: 'og:type', content: 'website'}]
    
  ],
  srcDir: 'src',
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPFeature\.vue$/,
          replacement: fileURLToPath(new URL('./components/VPFeature.vue', import.meta.url))
        }
      ]
    }
  }
})


function getSidebar() {
  return {
    "/guide/": [
      {
        "text": "Introduction",
        "items": [
          {
            "text": "What is halchemy?",
            "link": "/guide/introduction/what-is-halchemy"
          },
          {
            "text": "Getting started",
            "link": "/guide/introduction/quickstart"
          },
          {
            "text": "Examples",
            "link": "/guide/introduction/examples"
          }
        ]
      },

      {
        "text": "Configuration",
        "items": [
          {
            "text": "Configuration Properties",
            "link": "/guide/configuration/properties"
          },
          {
            "text": "Changing the Configuration",
            "link": "/guide/configuration/changing"
          }
        ]
      },
      {
        "text": "Request Headers",
        "items": [
          {
            "text": "Request Headers",
            "link": "/guide/headers/request"
          },
          {
            "text": "Default Request Headers",
            "link": "/guide/headers/default"
          },
          {
            "text": "Per Request Headers",
            "link": "/guide/headers/per_request"
          }
        ]
      },
      {
        "text": "Query Strings",
        "items": [
          {
            "text": "Passing parameters",
            "link": "/guide/parameters/passing"
          },
          {
            "text": "Parameters list style",
            "link": "/guide/parameters/list-style"
          }
        ]
      },
      {
        "text": "Templated Links",
        "items": [
          {
            "text": "Using templated links",
            "link": "/guide/templates/using"
          }
        ]
      },
      {
        "text": "Optimistic Concurrency",
        "items": [
          {
            "text": "Requesting changes",
            "link": "/guide/concurrency/using"
          }
        ]
      },
      {
        "text": "Errors and Exceptions",
        "items": [
          {
            "text": "Handling Errors",
            "link": "/guide/errors/handling"
          }
        ]
      },

      {
        "text": "Concepts",
        "items": [
          {
            "text": "Key terms",
            "link": "/guide/concepts/terms"
          },
          {
            "text": "Hypermedia",
            "link": "/guide/concepts/hypermedia"
          }
        ]
      },
      { text: 'Deprecated API', base: '/deprecated/', link: '/' }
    ],

    "/deprecated/": [
      {
        "text": "Deprecated API",
        "items": [
          {
            "text": "v0.9.3",
            "link": "/deprecated/"
          },
          {
            "text": "Methods",
            "items": [
              {
                "text": "GET",
                "link": "/deprecated/methods/get"
              },
              {
                "text": "GET from rel",
                "link": "/deprecated/methods/get_from_rel"
              },
              {
                "text": "POST to rel",
                "link": "/deprecated/methods/post_to_rel"
              },
              {
                "text": "DELETE resource",
                "link": "/deprecated/methods/delete_resource"
              },
              {
                "text": "PATCH resource",
                "link": "/deprecated/methods/patch_resource"
              },
              {
                "text": "PUT to rel",
                "link": "/deprecated/methods/put_to_rel"
              },
              {
                "text": "GET from rel with lookup",
                "link": "/deprecated/methods/get_from_rel_with_lookup"
              },
              {
                "text": "POST to URL",
                "link": "/deprecated/methods/post_to_url"
              },
              {
                "text": "DELETE URL",
                "link": "/deprecated/methods/delete_url"
              },
              {
                "text": "URL from rel",
                "link": "/deprecated/methods/url_from_rel"
              }
            ]
          },
          {
            "text": "Handling Errors",
            "link": "/deprecated/errors"
          },
          {
            "text": "Request Headers",
            "link": "/deprecated/headers"
          },
          {
            "text": "Query String Parameters",
            "link": "/deprecated/parameters"
          },
          {
            "text": "Templated Links",
            "link": "/deprecated/templates"
          },
          {
            "text": "Optimistic Concurrency",
            "link": "/deprecated/concurrency"
          }
        ]
      },
      ,
      { text: 'Fluent API', base: '/guide/', link: 'introduction/quickstart' }
    ]
  }
}