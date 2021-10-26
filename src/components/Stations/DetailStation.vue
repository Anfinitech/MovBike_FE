<template>
    <h1> Detalle de la estación </h1>
    <button> Actualizar </button>
    <button> Eliminar </button>
    <button v-on:click.self.prevent="renderStationsTable"> Volver </button>
</template>

<script>


export default {
  name: "DetailStation",
  
  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", 'StationsTable');
    },
  },
};
</script>