<template>
  <h1>Eliminar una bicicleta</h1>
  <br />
  <div>
    <p>ID: </p>
    <p>Condición: </p>
    <p>Ubicación: </p>
  </div>
  <br />
  <button>Eliminar</button>
  <button v-on:click.self.prevent="renderStationsTable">Volver</button>
</template>


<script>
export default {
  name: "DeleteBike",

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "BikesTable");
    },
  },
};
</script>