<template>
  <div class="general-container">
    <h1> Actualizar estación </h1>
    <form name="form" id="form" method="post"  enctype="multipart/form-data" v-on:submit.prevent="actualizar()">
      <h3 class="title"> Estación {{ station.nombre }} </h3>
        <br />
          <div class="form-group">
        		<label for="nombre" class="txt_negrita">Nombre:</label>
            <br />
            <input v-model="station.nombre" type="text" id="name" name="name" class="form-control">
          </div>
          <div class="form-group">
        		<label for="estado">Estado:</label>
            <br />
        		<input type="radio" name="estado" id="abierta" value="true" v-model="estado" />
            <label class="rad" for="abierta">Abierta</label>
            <br />
            <input type="radio" name="estado" id="cerrada" value="false" v-model="estado" />
            <label class="rad" for="cerrada">Cerrada</label>
          </div>
        	<div class="form-group">
        		<label for="capacidad" class="txt_negrita">Capacidad:</label>
            <br />
        		<input type="int" id="capacidad" name="capacidad" class="form-control" v-model="station.capacidad" >
        	</div>
        <br />
      <button class="boton"> Actualizar </button>
      <button class="boton"> Eliminar </button>
      <button class="boton" v-on:click.self.prevent="renderStationsTable"> Volver </button>
    </form>
    <p class="caja">
      Haciendo seguimiento continuo a cada nodo para mejorar nuestro servicio y la experiencia de usuario.
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
      station: {
        e_id: "id",
        e_nombre: "nombre",
        e_estado: "estado",
        e_capacidad: "capacidad",
      },
      listStations: [],
    };
  },
  
  methods: {
    getAllStations: function () {
      axios
        .get("https://move-and-flow-be.herokuapp.com/estaciones/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token_access")}`,
          },
        })
        .then((response) => {
          this.listStations = response.data;
        })
    },
    renderStationsTable: function () {
      this.$emit("loadcomponent", 'StationsTable');
    },
    
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

