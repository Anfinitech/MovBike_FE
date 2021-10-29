<template>
  <div v-if="loaded">
    <h1>Eliminar una estación</h1>
    <br />
    <div>
      <p>ID: {{ estacion.e_id }}</p>
      <p>Nombre: {{ estacion.e_nombre }}</p>
      <p>Estado: {{ estacion.e_estado }}</p>
      <p>Capacidad: {{ estacion.e_capacidad }}</p>
      <p>Ocupación:{{ estacion.e_ocupacion }}</p>
      <p>Bicis D: {{ estacion.e_bicicletasD }}</p>
      <p>Bicis ND: {{ estacion.e_bicicletasND }}</p>
      <p>Bicis T: {{ estacion.e_bicicletasT }}</p>
    </div>
    <br />
    <button v-on:click="deleteStation">Eliminar</button>
    <button v-on:click.self.prevent="renderStationsTable">Volver</button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "DeleteStation",

  data() {
    return {
      estacion: {},
      loaded: false,
    };
  },

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "StationsTable");
    },

    getData: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let id = localStorage.getItem("StationIdToDelete");
      let url = "https://move-and-flow-be.herokuapp.com";
      axios
        .get(url + "/estaciones/" + id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.estacion = response.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    deleteStation: async function() {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let url = "https://move-and-flow-be.herokuapp.com";
      axios
        .delete(url + "/estaciones/" + this.estacion.e_id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          alert(response.data);
          console.log(response);
          this.renderStationsTable();
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

  created: async function() {
    this.getData();
  },
};
</script>