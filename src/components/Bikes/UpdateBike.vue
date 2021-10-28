<template>
  <h1>Actualizar bicicleta</h1>
  <button>Actualizar</button>
  <button v-on:click.self.prevent="renderStationsTable">Volver</button>
</template>


<script>
export default {
  name: "UpdateBike",

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "BikesTable");
    },
  },
};
</script>