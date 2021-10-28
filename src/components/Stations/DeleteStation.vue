<template>
  <h1>Eliminar una estación</h1>
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