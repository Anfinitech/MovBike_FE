<template>
<div class="general-container">
  <div v-if="loaded">
    <div class="p-container">
    <div class="general-title"><h1>Eliminar una estación</h1></div>
    <div class="prevention"><p>¿Esta seguro que desea eliminar la siguiente estación?</p></div>
    <div class="group">
      <p class="sub-title">>ID: {{ estacion.e_id }} </p>
      <p class="sub-title">>Nombre: {{ estacion.e_nombre }} </p>
      <p class="sub-title">>Estado: {{ estacion.e_estado }} </p>
      <p class="sub-title">>Capacidad: {{ estacion.e_capacidad }} </p>
      <p class="sub-title">>Ocupación:{{ estacion.e_ocupacion }} </p>
      <p class="sub-title">>Bicis D: {{ estacion.e_bicicletasD }} </p>
      <p class="sub-title">>Bicis ND: {{ estacion.e_bicicletasND }} </p>
      <p class="sub-title">>Bicis T: {{ estacion.e_bicicletasT }} </p>

    <br />
    <div class="botones">
    <button class="boton_delete" v-on:click="deleteStation"><fa icon="trash" class="icon"/>Eliminar</button>
    <button class="boton_back" v-on:click.self.prevent="renderStationsTable"><fa icon="undo" class="icon"/>Volver</button>
    </div>
    </div>
    </div>
  </div>
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

<style scoped>

.general-container {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-image: url("../../assets/stations/DeleteStations.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 1rem;
}


.general-title {
  display: flex;
  justify-content: space-around;
  position: initial;
  padding-bottom: 30px;
  margin-top: 20px;
}

.p-container {
  color: #5046af;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 1rem 1.5rem;
  width: 410px;
  background-color: rgba(233, 233, 233, 0.918);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  margin: 20px;
  box-shadow: 0 0 10px rgb(190, 190, 190);
}

.prevention{
  text-align: center;
  margin-bottom: 15px;
}

.prevention p{
  color: crimson;
  font-weight: 600;
}

.group .sub-title{
  color: #5046af;
  font-weight: 600;
}


.botones {
  display: flex;
  flex-direction: row;
  justify-content:center;
  margin-top: 15px;
}

.boton_delete {
  padding: 10px 10px;
  position: relative;
  margin: 3px 5px 5px;
  text-decoration: none;
  background-color: crimson;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
  display: inline;
}

.boton_back {
  padding: 10px 10px;
  position: relative;
  margin: 3px 0px 5px;
  text-decoration: none;
  background-color: #00c2a8;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
}

.boton_back:hover {
  background-color: var(--white);
  color: #00c2a8;
}

.boton_delete:hover {
  background-color: var(--white);
  color: crimson;
}

.icon{
  margin-right: 5px;
}
</style>