<template>
  <h1>Eliminar una bicicleta</h1>
  <br />
  <div>
    <p>ID: {{bicicleta.id}} </p>
    <p>Condición: {{bicicleta.condicion}}</p>
    <p>Ubicación: {{bicicleta.estacion_nombre}}</p>
  </div>
  <br />
  <button v-on:click="deleteBike">Eliminar</button>
  <button v-on:click.self.prevent="renderStationsTable">Volver</button>
</template>


<script>

import axios from "axios";

export default {
  name: "DeleteBike",

  data() {
    return {
      bicicleta: {}
    }
  },

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "BikesTable");
    },

    deleteBike: function () {
      let url = "https://move-and-flow-be.herokuapp.com";
      axios
        .delete(url + "/bicicletas/" + this.bicicleta.id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.$emit("loadcomponent", "BikesTable");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  
  mounted() {
    let id = localStorage.getItem("idBikeToDelete")
    let url = "https://open-move-and-flow-be.herokuapp.com";
    axios
      .get(url + "/bicicletas/" + id)
      .then((response) => {
        console.log(response.data);
        this.bicicleta = response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },

};
</script>