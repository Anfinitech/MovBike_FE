<template>
  <div class="general-container">
    <h1>Registrar Estacion</h1>
    <form
      name="form"
      id="form"
      v-on:submit.prevent="createStation()"
    >
      <h3 class="title">Nueva Estacion</h3>
      <p>
        Nombre:
        <input
          type="text"
          name="e_nombre"
          placeholder="Nombre"
          class="form-control"
          v-model="nuevaEstacion.e_nombre"
        />
      </p>
      <p>
        Capacidad:
        <input
          type="number"
          name="e_capacidad"
          placeholder="Capacidad"
          class="form-control"
          v-model="nuevaEstacion.e_capacidad"
        />
      </p>
      <p>Estado:</p>
      <input
        type="radio"
        name="estado"
        id="abierta"
        value="true"
        v-model="nuevaEstacion.e_estado"
      />
      <label
        class="rad"
        for="abierta"
      >Abierta</label>
      <br />
      <input
        type="radio"
        name="estado"
        id="cerrada"
        value="false"
        v-model="nuevaEstacion.e_estado"
      />
      <label
        class="rad"
        for="cerrada"
      >Cerrada</label>

      <br />
      <button class="boton">Registrar</button>
      <button
        class="boton"
        v-on:click="renderStationsTable"
      >Volver</button>
    </form>
    <p class="caja">
      Construyendo un nodo de bienestar para nuestra comunidad.
    </p>
    <v-container fluid>
      <img
        src="@/assets/stations/images.jpg"
        alt=""
      />
    </v-container>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "CreateStation",
  data() {
    return {
      nuevaEstacion: {
        e_nombre: "",
        e_estado: false,
        e_capacidad: 90,
      },
    };
  },

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "StationsTable");
    },
    createStation: function () {
      let url = "https://move-and-flow-be.herokuapp.com";
      axios
        .post(url + "/estaciones/", this.nuevaEstacion, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          alert(response.data);
          console.log(response.data);
          /* this.loaded = true; */
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status == "401") {
            /* this.accessDenied(); */
          }
        });
    }
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


