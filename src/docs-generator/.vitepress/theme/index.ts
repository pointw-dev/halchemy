// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { Tab, Tabs } from 'vue3-tabs-component'
import { AskStackOverflow, CenteredImage, CommentsSection, Copyright, FutureLanguages, NotFound } from '@pointw/vitepress-component-bundle'
import JsonExample from '../components/JsonExample.vue'

import './tabs.css'
import './style.css'

export default {
  extends: DefaultTheme,
  
  Layout: () => {
    const { frontmatter, theme } = useData()
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-footer-before': () => h(AskStackOverflow, { frontmatter, theme }),
      'not-found': () => h(NotFound),
      'doc-after': () => h(Copyright, { message: '2023-2025 Michael Ottoson (pointw.com)'})
    })
  },
  
  enhanceApp({ app, router, siteData }) {
    app.component('Tab', Tab)
    app.component('Tabs', Tabs)

    app.component('CenteredImage', CenteredImage)
    app.component('CommentsSection', CommentsSection)
    app.component('FutureLanguages', FutureLanguages)

    app.component('JsonExample', JsonExample)
  }
} satisfies Theme
