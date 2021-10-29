<template>
  <h1>Eliminar usuario</h1>
  <br />
  <div>
          <p>ID: </p>
          <p>Alias: </p>
          <p>Nombre: </p>
          <p>Correo Electrónico: </p>
          <p>Rol: </p>
          <p>Acciones: </p>
  </div>
  <br />
  <button>Eliminar</button>
  <button v-on:click.self.prevent="renderUsersTable">Volver</button>
</template>


<script>
export default {
  name: "DeleteUser",

  methods: {
    renderUsersTable: function () {
      this.$emit("loadcomponent", "UsersTable");
    },
  },
};
</script>