<template>
  <h1>Eliminar una bicicleta</h1>

  <button v-on:click.self.prevent="renderStationsTable">Volver</button>
</template>


<script>
export default {
  name: "DeleteBike",

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "StationsTable");
    },
  },
};
</script>