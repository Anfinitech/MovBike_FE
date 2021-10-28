<template>
  <h1>Registrar una nueva bici</h1>
  <button>Registrar</button>
  <button v-on:click.self.prevent="renderStationsTable">Volver</button>
</template>

<script>
export default {
  name: "CreateBike",

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "BikesTable");
    },
  },
};
</script>