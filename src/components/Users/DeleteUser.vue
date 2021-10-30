<template>
  <div>

    <h1>Eliminar usuario</h1>
    <br />
    <div>
      <p>ID: {{deleteUser.id}} </p>
      <p>Alias: {{deleteUser.username}}</p>
      <p>Nombre: {{deleteUser.name}} </p>
      <p>Correo Electrónico: {{deleteUser.email}} </p>
      <p>Rol: {{deleteUser.role}} </p>
    </div>
    <br />
    <button v-on:click="deleteUsers">Eliminar</button>
    <button v-on:click.self.prevent="renderUsersTable">Volver</button>
  </div>
</template>
<script>

import axios from "axios";

export default {
  name: "DeleteUser",

  data() {
    return {
      deleteUser: {}
    }
  },

  methods: {
    renderUsersTable: function () {
      this.$emit("loadcomponent", "UsersTable");
    },

    deleteUsers: function () {
      let url = "https://move-and-flow-be.herokuapp.com";
      let id = localStorage.getItem("idUserToDelete");
      axios
        .delete(url + "/users/" + id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log(response);
          alert(response.data);
          this.$emit("loadcomponent", "UsersTable");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    getData: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let id = localStorage.getItem("idUserToDelete");
      console.log(id);
      let url = "https://move-and-flow-be.herokuapp.com";

      axios
        .get(url + "/users/" + id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log("Inside Users");
          this.deleteUser = response.data;
          console.log(this.deleteUser)
          this.loaded = true;

        })
        .catch((error) => {
          console.log(error.response);
        });
    },


    verifyToken: async function () {
      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        this.accessDenied();
        return;
      }

      return axios
        .post(
          "https://move-and-flow-be.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("tokenRefresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("tokenAccess", result.data.access);
        })
        .catch((error) => {
          this.accessDenied();
        });
    },
    accessDenied: function () {
      localStorage.clear();
      alert("Acceso Denegado. Vuelve a iniciar sesión.");
      this.$router.push({ name: "Login" });
    },
  },

  created: async function () {
    await this.getData();
  },

};
</script>