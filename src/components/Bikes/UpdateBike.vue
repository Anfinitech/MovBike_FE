<template>
  <div class="general-container" v-if="loaded">
    <div class="form-container">
      <div class="title">
        <h1>Actualizar bicicleta</h1>
      </div>
      <form name="form" id="form" v-on:submit.prevent="updateBikes">
        <br />
        <div class="form-group">
          <p>ID: {{ id }}</p>
        </div>
        <div class="form-group">
          <p>Condición:</p>
          <input
            type="radio"
            name="condicion"
            id="buena"
            value="true"
            v-model="updatedBike.b_condicion"
          />
          <label class="rad" for="buena">En buen estado</label>
          <br />
          <input
            type="radio"
            name="condicion"
            id="averiada"
            value="false"
            v-model="updatedBike.b_condicion"
          />
          <label class="rad" for="averiada">Averiada</label>
        </div>
        <div class="form-group">
          <p>Ubicación:</p>

          <select v-model="updatedBike.b_en_estacion">
            <option disabled>Seleccione una estacion</option>
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
          <button class="boton_up" type="submit">
            <fa icon="edit" class="edit" />Actualizar
          </button>
          <button
            class="boton_back"
            type="button"
            v-on:click.self.prevent="renderStationsTable"
          >
            <fa
              icon="undo"
              class="back"
              v-on:click.self.prevent="renderStationsTable"
            />Volver
          </button>
        </div>
      </form>
    </div>

    <div class="imagen-container">
      <p class="caja">
        Haciendo seguimiento continuo a cada nodo para mejorar nuestro servicio
        y la experiencia de usuario.
      </p>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "updatedBike",
  data: function () {
    return {
      updatedBike: {
        b_condicion: true,
        b_en_estacion: 0,
      },
      stations: {},
      id: localStorage.getItem("idBikeToUpdate"),
      loaded: false,
    };
  },

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "BikesTable");
    },

    getData: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let id = localStorage.getItem("idBikeToUpdate");
      let url = "https://move-and-flow-be.herokuapp.com";

      axios
        .get(url + "/bicicletas/" + id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          this.bicicleta = response.data;
          this.updatedBike.b_condicion =
            this.bicicleta.condicion === "En buen estado";
          this.updatedBike.b_en_estacion = this.bicicleta.estación_id;
          this.idBike = this.bicicleta.id;
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("https://move-and-flow-be.herokuapp.com/estaciones/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          this.stations = response.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateBikes: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let url = "https://move-and-flow-be.herokuapp.com";

      axios
        .patch(
          url + "/bicicletas/" + this.bicicleta.id + "/",
          this.updatedBike,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
            },
          }
        )
        .then((result) => {
          alert(
            "La bicicleta con ID '" +
              result.data.id +
              "' ha sido modificada, se encuentra '" +
              result.data.condicion +
              "' y está ubicada en la estacion '" +
              result.data.estacion_nombre +
              "'."
          );
          this.bicicleta = result.data;
        })
        .catch((error) => {
          console.log(error);
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
  },

  created: async function () {
    await this.getData();
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
  background-image: url("../../assets/stations/UpdateBike2.jpg");
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
  background-color: rgba(255, 255, 255, 0.822);
  border-radius: 20px;
  backdrop-filter: blur(30px);
  margin: 20px;
  align-items: center;
  margin-left: 5%;
  box-shadow: 0 0 10px rgb(103, 0, 124);
}
.imagen-container {
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

.boton_up {
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

.boton_up:hover {
  background-color: var(--white);
  color: #0081cf;
}

.back {
  margin-right: 5px;
}

.edit {
  margin-right: 5px;
}
/*------------Mensaje--------------*/
.caja {
  font-family: sans-serif;
  font-weight: 600;
  font-size: 20px;
  font-style: italic;
  width: 400px;
  margin-left: 10%;
  margin-top: 60px;
  overflow: hidden;
  color: #f2fcff;
}

@media only screen and (max-width: 950px) {
  .caja {
    font-family: sans-serif;
    font-weight: 600;
    font-size: 20px;
    font-style: italic;
    width: 200px;
    margin-top: 60px;
    overflow: hidden;
    color: #f2fcff;
  }

  .botones {
    flex-direction: column;
  }
}

@media only screen and (max-width: 650px) {
  .imagen-container {
    display: none;
  }

  .form-container {
    width: 100%;
  }
  .botones {
    flex-direction: column;
  }
}
</style>