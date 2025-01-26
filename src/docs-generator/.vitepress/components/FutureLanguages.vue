<script setup lang="ts">
const futureLanguages = [
    "Java",
    "C#",
    "PHP",
    "Go",
    "R"
]
</script>

<template>
  <Tab v-for="language in futureLanguages" :key="language" :name="language" :is-disabled="true" />
</template>

<style scoped>

</style>