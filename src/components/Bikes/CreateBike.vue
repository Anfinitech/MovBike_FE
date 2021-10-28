<template>
  <div class="general-container">
    <h1>Registrar bicicleta</h1>
    <form name="form" id="form" v-on:submit.prevent="crear()">
      <h3 class="title">Nueva Bicicleta</h3>
      <br />

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

      <br />
      <p>Ubicación:</p>
      <div class="form-group">
        <select class="form-control">
          <option value="">Seleccione una estacion</option>
          <option v-for="station in stations" :key="station.e_id" :value="station"/>
        </select>
      </div>
      <br />
      <button class="boton">Registrar</button>
      <button class="boton" v-on:click.self.prevent="renderStationsTable">Volver</button>
    </form>
    <p class="caja">
      Construyendo un nodo de bienestar para nuestra comunidad.
    </p>
    <v-container fluid>
      <img src="@/assets/stations/images.jpg" alt="" />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CreateBike",
  data: function() {
    return {
      bikeCreation: {
        b_id : "",
        creation_data: {
          current_station : 0,
        }
      },
      stations: [],
    };
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