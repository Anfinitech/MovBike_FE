<template>
  <div class="general-container">
    <h1>Actualizar bicicleta</h1>
    <form
      name="form"
      id="form"
      method="post"
      enctype="multipart/form-data"
      v-on:submit.prevent="actualizar()"
    >
      <h3 class="title">Bicicleta</h3>
      <br />
      <div class="form-group">
        <p>Condición:</p>
        <input
          type="radio"
          name="condicion"
          id="buena"
          value="true"
          v-model="condicion"
        />
        <label class="rad" for="buena">En buen estado</label>
        <br />
        <input
          type="radio"
          name="condicion"
          id="averiada"
          value="false"
          v-model="condicion"
        />
        <label class="rad" for="averiada">Averiada</label>
      </div>
      <div class="form-group">
        <p>Ubicación:</p>

        <select v-model="bikeCreation.creation_data.current_station">
          <option disabled selected>Seleccione una estacion</option>
          <option
            v-for="station in stations"
            :key="station.e_id"
            :value="station.e_id"
          >
            {{ station.e_nombre }}
          </option>
        </select>
      </div>
      <br />
      <button class="boton">Actualizar</button>
      <button class="boton" v-on:click.self.prevent="renderStationsTable">Volver</button>
      
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
import axios      from 'axios';
export default {
  name: "UpdateBike",
  data: function() {
    return {
      bikeCreation: {
        b_id : 0,
        creation_data: {
          condicion: 0,
          current_station : 0,
        }
      },
      stations: [],
    }
  },

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "BikesTable");
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