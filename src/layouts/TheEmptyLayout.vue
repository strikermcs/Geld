<template>
  <w-overlay
  bg-color="rgba(35, 71, 129, 0.4)"
  v-model="overlay"
  persistent
  >
    <router-view />
  </w-overlay>
</template>

<script>
export default {
  data:() => ({
    overlay: true
  }),
}
</script>

<style scoped>
.w-overlay {
  backdrop-filter: blur(10px);
}
</style>