<template>
  <div>
    <Sidebar />
    <Header />
    <h1>Bikes</h1>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Header,
    Sidebar

  },
}
</script>

<style lang="scss" scoped>
</style>