<template>
  <div class="general-container" v-if="loaded">
    <h1>Actualizar estación</h1>
    <form
      name="form"
      id="form"
      method="post"
      enctype="multipart/form-data"
      v-on:submit.prevent="actualizar()"
    >
      <h3 class="title">Estación {{ station.e_nombre }}</h3>
      <br />
      <div class="form-group">
        <label for="nombre" class="txt_negrita">Nombre:</label>
        <br />
        <input
          v-model="station.e_nombre"
          type="text"
          id="name"
          name="name"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="estado">Estado:</label>
        <br />
        <input
          type="radio"
          name="estado"
          value="Abierta"
          v-model="station.e_estado"
        />
        <label class="rad" for="abierta">Abierta</label>
        <br />
        <input
          type="radio"
          name="estado"
          value="Cerrada"
          v-model="station.e_estado"
        />
        <label class="rad" for="cerrada">Cerrada</label>
      </div>
      <div class="form-group">
        <label for="capacidad" class="txt_negrita">Capacidad:</label>
        <br />
        <input
          type="number"
          min="1"
          id="capacidad"
          name="capacidad"
          class="form-control"
          v-model="station.e_capacidad"
        />
      </div>
      <br />
      <button class="boton" v-on:click.self.prevent="updateStation">
        Actualizar
      </button>
      <button class="boton" v-on:click.self.prevent="renderStationsTable">
        Volver
      </button>
    </form>
    <p class="caja">
      Haciendo seguimiento continuo a cada nodo para mejorar nuestro servicio y
      la experiencia de usuario.
    </p>
    <v-container fluid>
      <img src="@/assets/stations/actualizar.jpg" alt="" />
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateStation",
  data: function () {
    return {
      station: {},
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

      let id = localStorage.getItem("StationIdToUpdate");
      let url = "https://move-and-flow-be.herokuapp.com";

      axios
        .get(url + "/estaciones/" + id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.station = response.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    updateStation: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }
      let url = "https://move-and-flow-be.herokuapp.com";
      let estacionUpdate = {
        e_nombre: this.station.e_nombre,
        e_estado: this.station.e_estado === "Abierta",
        e_capacidad: this.station.e_capacidad,
      };

      console.log(estacionUpdate);

      axios
        .patch(url + "/estaciones/" + this.station.e_id + "/", estacionUpdate, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((result) => {
          alert("Actualización exitosa.");
          console.log(estacionUpdate);
          console.log(result.data);
          this.renderStationsTable();
        })
        .catch((error) => {
          console.log(estacionUpdate);
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

<style scoped>
/*------------Formulario------------*/
form {
  width: 370px;
  padding: 30px;
  font-size: 18px;
  float: right;
  margin-right: 10%;
  border: 2px double purple;
  margin-top: 3%;
}

.form-control {
  width: 300px;
}
.rad {
  font-size: 15px;
}
.boton {
  width: 80px;
  font-size: 12px;
  height: 22px;
}
/*------------Mensaje--------------*/
.caja {
  font-family: sans-serif;
  font-size: 20px;
  width: 500px;
  margin-left: 10%;
  margin-top: 30px;
  overflow: hidden;
}
/*--------------Imagen-------------*/
v-container {
  margin-left: 10%;
}
</style>
