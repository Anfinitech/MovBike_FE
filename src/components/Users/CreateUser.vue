<template>
<body>
  <h1>Registrar un nuevo usuario</h1>
  <button>Registrar</button>
  <button v-on:click.self.prevent="renderUsersTable">Volver</button>
</body>
</template>

<script>
export default {
  name: "CreateUser",

  methods: {
    renderUsersTable: function () {
      this.$emit("loadcomponent", "UsersTable");
    },
  },
};
</script>