<template>
  <div
    class="general-container"
    v-if="loaded"
  >
    <div class="form-container">
      <div class="title">
        <h1>Registrar bicicleta</h1>
      </div>
      <form
        name="form"
        id="form"
        v-on:submit.prevent="createBikes"
      >
        <h3 class="title">Nueva Bicicleta</h3>
        <div class="form-group">
          <p>Condición:</p>
          <input
            type="radio"
            name="condicion"
            id="buena"
            value="true"
            v-model="newBike.b_condicion"
          />
          <label
            class="rad"
            for="buena"
          >En buen estado</label>
          <br />
          <input
            type="radio"
            name="condicion"
            id="averiada"
            value="false"
            v-model="newBike.b_condicion"
          />
          <label
            class="rad"
            for="averiada"
          >Averiada</label>
          <br />
        </div>

        <div class="form-group">
          <p>Ubicación:</p>
          <select v-model="newBike.b_en_estacion">
            <option
              disabled
              selected
            >Seleccione una estacion</option>
            <option
              v-for="station in stations"
              :key="station.e_id"
              v-bind:value="station.e_id"
            >
              {{ station.e_nombre }}
            </option>
          </select>
        </div>
        <br />
        <div class="botones">
          <button
            class="boton_register"
            type="submit"
          >
            <fa
              icon="clipboard"
              class="icon"
            />Registrar
          </button>
          <button
            class="boton_back"
            v-on:click.self.prevent="renderBikesTable"
          >
            <fa
              icon="undo"
              class="icon"
              v-on:click.self.prevent="renderBikesTable"
            />Volver
          </button>
        </div>
      </form>
    </div>

    <div class="info-container">
      <p class="caja">Una nueva bici a su servicio.</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "CreateBike",

  data: function () {
    return {
      newBike: {
        b_condicion: false,
        b_en_estacion: 0,
      },
      stations: {},
      loaded: false,
    };
  },

  methods: {
    getData: async function () {
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
          this.listStations = response.data;
          this.stations = response.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    checkForm: function (e) {
      let msg = "";
      if (this.newBike.b_condicion && this.newBike.b_en_estacion) {
        return true;
      }

      this.errors = [];

      if (!this.newBike.b_condicion) {
       msg += "Debes crear una bicicleta en Buen Estado.\n";
      }
      if (!this.newBike.b_en_estacion) {
        msg += 'Debes elegir una estación.';
      }
      alert(msg)
      e.preventDefault();
    },

    createBikes: async function () {
      await this.verifyToken();
      await this.checkForm();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let url = "https://move-and-flow-be.herokuapp.com";
      axios
        .post(url + "/bicicletas/", this.newBike, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            this.accessDenied();
          } else {
            console.log(error);
          }
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
      alert("Acceso Denegado. Vuelva a iniciar sesión.");
      this.$router.push({ name: "Login" });
    },

    renderBikesTable: function () {
      this.$emit("loadcomponent", "BikesTable");
    },
  },

  created: async function () {
    this.getData();
  },
};
</script>

<style scoped>
.general-container {
  height: 35em;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-image: url("../../assets/bikes/RegisterBike.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.title {
  display: flex;
  justify-content: space-around;
  position: initial;
  padding-bottom: 30px;
  margin-top: 20px;
}
.form-container {
  color: #5046af;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0rem 1.5rem;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.24);
  border-radius: 20px;
  backdrop-filter: blur(30px);
  margin: 20px;
  align-items: center;
  margin-left: 5%;
  box-shadow: 0 0 10px rgb(100, 100, 100);
}
.info-container {
  width: 55%;
  box-sizing: border-box;
  align-items: center;
  background-color: transparent;
}
/*------------Formulario------------*/
form {
  padding-left: 30px;
  font-size: 18px;
  margin-right: 10%;
  border: none;
  text-align: left;
  font-weight: 600;
}
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  margin-left: 10px;
  color: #0081cf;
}

.form-group input {
  margin-left: 20px;
  margin-bottom: 10px;
}

.form-group select {
  border: #5046af solid 2px;
  border-radius: 10px;
}

.form-control {
  width: 300px;
}
.rad {
  font-size: 15px;
}

.botones {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.boton_register {
  padding: 10px 10px;
  position: relative;
  margin: 3px 0px 5px;
  text-decoration: none;
  background-color: #0081cf;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
  display: inline;
}

.boton_back {
  padding: 10px 24px;
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

.boton_register:hover {
  background-color: var(--white);
  color: #0081cf;
}

.icon {
  margin-right: 5px;
}
/*------------Mensaje--------------*/
.caja {
  font-family: sans-serif;
  font-weight: 600;
  font-size: 40px;
  font-style: italic;
  width: 400px;
  margin-left: 10%;
  margin-top: 80px;
  overflow: hidden;
  color: #f2fcff;
}
/*--------------Media-------------*/
@media only screen and (max-width: 1050px) {
  .caja {
    font-family: sans-serif;
    font-weight: 600;
    font-size: 40px;
    font-style: italic;
    width: 200px;
    margin-top: 100px;
    overflow: hidden;
    color: #f2fcff;
  }

  .form-container {
    width: 450px;
  }

  .general-title {
    padding-bottom: 5px;
  }

  .botones {
    flex-direction: column;
    margin-top: 0;
  }

  .form-group {
    margin-bottom: 0;
  }

  .title {
    padding-bottom: 5px;
  }
}

@media only screen and (max-width: 650px) {
  .info-container {
    display: none;
  }

  .form-container {
    width: 100%;
  }
  .botones {
    flex-direction: column;
  }

  .title {
    padding-bottom: 5px;
  }
}
</style>
