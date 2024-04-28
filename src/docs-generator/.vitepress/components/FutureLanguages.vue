<script setup lang="ts">
const futureLanguages = [
    "C#",
    "PHP",
    "Ruby",
    "Go"
]
</script>

<template>
  <Tab v-for="language in futureLanguages" :key="language" :name="language" :is-disabled="true" />
</template>

<style scoped>

</style>