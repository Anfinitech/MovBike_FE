<template>
  <div>
    <Header />
    <Sidebar />
    <main>

      <h1>
        delete bikes
      </h1>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: "deleteBikes",
  components: {
    Header,
    Sidebar
  }
}
</script>

<style scoped >
main {
  margin-top: 50px;
  margin-left: 335px;
  padding: 2rem 1.5rem;
  background: #e7e9f5;
  min-height: calc(100vh - 90px);
}
</style >