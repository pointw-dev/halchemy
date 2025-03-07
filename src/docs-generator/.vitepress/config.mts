import { defineConfig, withBase } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
const pkg = require('../../version_stamp.json')


const hostname = 'https://pointw-dev.github.io'
const basePath = 'halchemy'
const seoLogo = 'https://pointw-dev.github.io/halchemy/img/logo.png'
const title = 'halchemy'
const tagline = 'HAL for Humans'

const siteUrl = hostname + (basePath? `/${basePath}/` : '')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: title,
  description: tagline,

  themeConfig: {
    siteTitle: 'halchemy',
    stackOverflowTags: ['halchemy', 'HAL', 'http', 'rest', 'hypermedia'],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pointw-dev/halchemy' }
    ],
    logo: '/img/hero.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quickstart', link: '/introduction/quickstart' },
      { text: pkg.version, link: null }
    ],

    outline: 'deep',
    sidebar: getSidebar(),
    search: {
        provider: 'local',
        options: {
            detailedView: true
        }
    },
    footer: {
      message: 'Released under the <a target="_blank" class="link" href="https://raw.githubusercontent.com/pointw-dev/halchemy/refs/heads/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-2025 Michael Ottoson (pointw.com)'
    }
  },

  appearance: 'dark',
  base: `/${basePath}/`,
  head: [
    ['link', { rel: 'icon', href: `/${basePath}/favicon.ico` }],

    // test with https://www.opengraph.xyz/url/
    ['meta', {property: 'og:image', content: seoLogo}],
    ['meta', {property: "og:url", content: siteUrl}],
    ['meta', {property: "og:description", content: tagline}],
    ['meta', {property: 'og:type', content: 'website'}],

    ['meta', {name: 'twitter:card', value: 'summary'}],
//    ['meta', {name: "twitter:card", content: "summary_large_image"}],
    ['meta', {name: 'twitter:image', value: seoLogo}],
//    ['meta', {property: "twitter:domain", content: "pointw.com"}],
    ['meta', {property: "twitter:url", content: siteUrl}],
    ['meta', {name: "twitter:title", content: title}],
    ['meta', {name: "twitter:description", content: tagline}]

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
  },
  sitemap: {
    hostname: siteUrl
  },
  
  transformPageData(pageData) {
    const canonicalUrl = hostname + (basePath? `/${basePath}` : '') + `/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])
  }
})


function getSidebar() {
  return {
    "/": [
      {
        "text": "Introduction",
        "items": [
          {
            "text": "What is halchemy?",
            "link": "/introduction/what-is-halchemy"
          },
          {
            "text": "Getting started",
            "link": "/introduction/quickstart"
          },
          {
            "text": "Examples",
            "link": "/introduction/examples"
          }
        ]
      },

      {
        "text": "Configuration",
        "items": [
          {
            "text": "Configuration Properties",
            "link": "/configuration/properties"
          },
          {
            "text": "Changing the Configuration",
            "link": "/configuration/changing"
          }
        ]
      },
      {
        "text": "Request Headers",
        "items": [
          {
            "text": "Request Headers",
            "link": "/headers/request"
          },
          {
            "text": "Default Request Headers",
            "link": "/headers/default"
          },
          {
            "text": "Per Request Headers",
            "link": "/headers/per_request"
          }
        ]
      },
      {
        "text": "Query Strings",
        "items": [
          {
            "text": "Passing parameters",
            "link": "/parameters/passing"
          },
          {
            "text": "Parameters list style",
            "link": "/parameters/list-style"
          }
        ]
      },
      {
        "text": "Templated Links",
        "items": [
          {
            "text": "Using templated links",
            "link": "/templates/using"
          }
        ]
      },
      {
        "text": "Optimistic Concurrency",
        "items": [
          {
            "text": "Requesting changes",
            "link": "/concurrency/using"
          }
        ]
      },
      {
        "text": "Errors and Exceptions",
        "items": [
          {
            "text": "Handling Errors",
            "link": "/errors/handling"
          }
        ]
      },

      {
        "text": "Concepts",
        "items": [
          {
            "text": "Key terms",
            "link": "/concepts/terms"
          },
          {
            "text": "Hypermedia",
            "link": "/concepts/hypermedia"
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
      }
    ]
  }
}