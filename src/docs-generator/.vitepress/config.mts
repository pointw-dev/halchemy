import { defineConfigWithTheme } from 'vitepress'
import type { ThemeConfig } from 'vitepress-carbon'
import tabsPlugin from '@red-asuka/vitepress-plugin-tabs'
import baseConfig from 'vitepress-carbon/config'
const pkg = require('../../version_stamp.json')

export default defineConfigWithTheme<ThemeConfig>({
  title: "halchemy",
  description: "HAL for Humans",

  extends: baseConfig,
  srcDir: 'src',

  themeConfig: {
    outline: 'deep',
    siteTitle: 'halchemy',
    stackOverflowTags: ['halchemy', 'HAL', 'http'],

    logo: '/img/hero.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quickstart', link: '/introduction/quickstart' },
      { text: pkg.version, link: null }
    ],

    sidebar: [
      {
        "text": "Introduction",
        "collapsible": true,
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
          },
          {
            "text": "Key Terms",
            "link": "/concepts/terms"
          }
        ]
      },


      {
        "text": "Configuration",
        "collapsible": true,
        "items": [
          {
            "text": "index",
            "link": "/configuration/index"
          }
        ]
      },
      {
        "text": "Request Headers",
        "collapsible": true,
        "items": [
          {
            "text": "index",
            "link": "/headers/index"
          },
          {
            "text": "Default Headers",
            "link": "/headers/default"
          },
          {
            "text": "Per Request Headers",
            "link": "/headers/per_request"
          }
        ]
      },
      {
        "text": "Query String Parameters",
        "collapsible": true,
        "items": [
          {
            "text": "index",
            "link": "/parameters/index"
          }
        ]
      },
      {
        "text": "Templated Links",
        "collapsible": true,
        "items": [
          {
            "text": "index",
            "link": "/templates/index"
          }
        ]
      },
      {
        "text": "Optimistic Concurrency",
        "collapsible": true,
        "items": [
          {
            "text": "index",
            "link": "/concurrency/index"
          }
        ]
      },
      {
        "text": "Handling Errors",
        "collapsible": true,
        "items": [
          {
            "text": "index",
            "link": "/errors/index"
          }
        ]
      },


      {
        "text": "Concepts",
        "collapsible": true,
        "items": [
          {
            "text": "index",
            "link": "/deprecated/index"
          },
        ]
      } ,


      {
        "text": "Deprecated API",
        "collapsible": true,
        "items": [
          {
            "text": "index",
            "link": "/deprecated/index"
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pointw-dev/halchemy' }
    ],



    search: {
      provider: 'local'
    },
    
    markdown: {
        config(md) {
            tabsPlugin(md)
        }
    }
  }
})

