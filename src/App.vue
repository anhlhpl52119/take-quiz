<template>
  <router-view #="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
<script setup lang="ts"></script>

<style scoped></style>
