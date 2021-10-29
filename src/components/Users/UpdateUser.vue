<template>
<div>
  <h1>Actualizar Usuario</h1>
  <br />
  <div>
          <p>ID: </p>
          <p>Alias: </p>
          <p>Password: No dejar en blanco o se pierde el password con el el estado actual del backend</p>
          <p>Nombre: </p>
          <p>Correo Electrónico: </p>
          <p>Rol: </p>
          <p>Acciones: </p>
  </div>
  <br />
  <button>Actualizar</button>
  <button v-on:click.self.prevent="renderUsersTable">Volver</button>
</div>
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