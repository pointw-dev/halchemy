// https://vitepress.dev/guide/extending-default-theme#layout-slots

<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <ask-stack-overflow />
    </template>
  </Layout>
</template>
