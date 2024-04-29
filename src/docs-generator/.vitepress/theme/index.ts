import '@red-asuka/vitepress-plugin-tabs/dist/style.css'
import { VPCarbon } from 'vitepress-carbon'
import { Tab, Tabs } from 'vue3-tabs-component'
import MyLayout from '../components/MyLayout.vue'

import AskStackOverflow from '../components/AskStackOverflow.vue'
import FutureLanguages from '../components/FutureLanguages.vue';
import JsonExample from '../components/JsonExample.vue'
import './override.css'


export default {
    extends: VPCarbon,

    Layout: MyLayout,

    enhanceApp({app}) {
        app.component('Tab', Tab)
        app.component('Tabs', Tabs)
        app.component('AskStackOverflow', AskStackOverflow)
        app.component('FutureLanguages', FutureLanguages)
        app.component('JsonExample', JsonExample)
    }
} satisfies Theme
