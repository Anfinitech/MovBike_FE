<template>
<div v-if="loaded">
  <h1>Eliminar una bicicleta</h1>
  <br />
  <div>
    <p>ID: {{ bicicleta.id }}</p>
    <p>Condición: {{ bicicleta.condicion }}</p>
    <p>Ubicación: {{ bicicleta.estacion_nombre }}</p>
  </div>
  <br />
  <button v-on:click="deleteBike">Eliminar</button>
  <button v-on:click.self.prevent="renderStationsTable">Volver</button>
</div>
</template>


<script>
import axios from "axios";

export default {
  name: "DeleteBike",

  data() {
    return {
      bicicleta: {},
      loaded: false,
    };
  },

  methods: {
    getData: async function () {
      console.log('HOla mundo pre verify')
      await this.verifyToken();
      console.log('HOla mundo pos verify')

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let id = localStorage.getItem("idBikeToDelete");
      let url = "https://move-and-flow-be.herokuapp.com";
      
      console.log('HOla mundo pre get')

      axios
        .get(url + "/bicicletas/" + id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.bicicleta = response.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    renderStationsTable: function () {
      this.$emit("loadcomponent", "BikesTable");
    },

    deleteBike: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let url = "https://move-and-flow-be.herokuapp.com";

      axios
        .delete(url + "/bicicletas/" + this.bicicleta.id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log(response);
          alert(response.data);
          this.$emit("loadcomponent", "BikesTable");
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
    this.getData();
  },
};
</script>