<template>
  <h1>Eliminar una estación</h1>
  <br />
  <div>
    <p>ID:</p>
    <p>Nombre:</p>
    <p>Estado:</p>
    <p>Capacidad:</p>
    <p>Ocupación:</p>
    <p>Bicis D:</p>
    <p>Bicis ND:</p>
    <p>Bicis T:</p>
  </div>
  <br />
  <button>Eliminar</button>
  <button v-on:click.self.prevent="renderStationsTable">Volver</button>
</template>


<script>
export default {
  name: "DeleteStation",

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "StationsTable");
    },
  },
};
</script>