<template>
  <div class="general-container">
    <h1>Registrar bicicleta</h1>
    <form name="form" id="form" v-on:submit.prevent="createBike()">
      <h3 class="title">Nueva Bicicleta</h3>
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
      <br />
    <div class="form-group">
      <p>Ubicación:</p>
      
        <select v-model="bikeCreation.creation_data.current_station">
          <option disabled selected>Seleccione una estacion</option>
          <option v-for="station in stations" :key="station.e_id" :value="station.e_id">{{ station.e_nombre }}</option>        
        </select>
    </div>
        
      <br />
      <button class="boton" v-on:click.self.prevent="renderBikesTable">Volver</button>
      <button class="boton" type="submit">Registrar</button>
    </form>
    <p class="caja">
      Una nueva bici a tu servicio.
    </p>
    <v-container fluid>
      <img src="@/assets/stations/images.jpg" alt="" />
    </v-container>
  </div>
</template>

<script>
import axios      from 'axios';

export default {
  name: "CreateBike",
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
    getAllStations: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      axios
        .get("https://move-and-flow-be.herokuapp.com/estaciones/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          this.stations = response.data;
          this.loaded = true;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status == "401") {
            this.accessDenied();
          }
        });
    },
    createBike: async function () {
      let url = "https://move-and-flow-be.herokuapp.com";
      axios
        .post(url + "/bicicletas/", this.nuevaBicicleta, {
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
    },
    renderBikesTable: function () {
      this.$emit("loadcomponent", "BikesTable");
    },
    created: async function() {
      this.getAllStations();
    },
    verifyToken: async function () {
      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        this.accessDenied();
        return;
      }
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
