<template>
    <h1> Crear una nueva estación </h1>
    <button v-on:click.self.prevent="renderStationsTable"> Volver </button>
</template>

<script>

export default {
  name: "CreateStation",
  
  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", 'StationsTable');
    },
  },
};
</script>